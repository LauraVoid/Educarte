const Meeting = require("../model/Meeting");
const seq = require("sequelize");
//const GoogleMeet = require("google-meet-api").meet;
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");

const op = seq.Op;

exports.create = async function (req, res) {
  /*   const client_id =
    "139389020461-ftrgtgqmhesju6urnj9dslcjo675p5m3.apps.googleusercontent.com";
  const client_secret = "xJ4-rwv-jFwl0YlGiBBHUMbY";
  const redirect_uri = "http://localhost:3000";

  const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
  const TOKEN_PATH = "token.json"; */

  /*   const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  }); */

  /*   oAuth2Client.getToken((err, token) => {
    if (err) {
      console.log(err);
    } else {
      oAuth2Client.setCredentials(token);
    }
  }); */

  /*  const calendar = google.calendar({
    version: "v3",
    oAuth2Client,
  }); */
  /* 
  var date1 = req.body.date + "T" + req.body.date.split(":")[0] + ":00" + ":30";
  var date2 = req.body.date + "T" + req.body.time.split(":")[0] + ":45" + ":30";

  var x = new Date(
    req.body.date + "T" + req.body.date.split(":")[0] + ":00" + ":30"
  );
  var y = new Date(
    req.body.date + "T" + req.body.date.split(":")[0] + ":45" + ":30"
  ); */
  /* 
  var end1 =
    req.body.date +
    "T" +
    x.getUTCHours() +
    ":" +
    x.getUTCMinutes() +
    ":00" +
    ".000Z";
  var end2 =
    req.body.date +
    "T" +
    y.getUTCHours() +
    ":" +
    y.getUTCMinutes() +
    ":00" +
    ".000Z"; */

  /*  let result = await calendar.events.list({
    calendarId: "primary",
    timeMin: end1,
    timeMax: end2,
    maxResults: 1,
    singleEvents: true,
    orderBy: "startTime",
  }); */

  /* let events = result.data.items; */

  /*  if (events.length) {
    console.log("you are busy for this time slot !");
    return null;
  } */

  if (req.body.isVirtual === "V") {
    if (req.body.tokenGoogle !== "") {
      const client = new OAuth2Client(
        "139389020461-ftrgtgqmhesju6urnj9dslcjo675p5m3.apps.googleusercontent.com"
      );

      const ticket = await client.verifyIdToken({
        idToken: req.body.tokenGoogle,
        audience:
          "139389020461-ftrgtgqmhesju6urnj9dslcjo675p5m3.apps.googleusercontent.com",
      });
    }
  }

  try {
    if (req.body.isVirtual === "V") {
      if (req.body.tokenGoogle === "") {
        return res
          .status(406) //NOT ACCEPTABLE SINCE THE BODY IS WRONG
          .send({ error: "Joining to Google" });
      } else {
        const meet = await Meeting.create({
          name: req.body.name,
          date: req.body.date,
          time: req.body.time,
          description: req.body.description,
          isVirtual: req.body.isVirtual,
          link: "https://meet.google.com/sto-qotk-vsa",
          teacherId: req.body.teacherId,
          courseId: req.body.courseId,
        });
        return res.status(200).send({ meet });
      }
    } else {
      const meet2 = await Meeting.create({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description,
        isVirtual: req.body.isVirtual,
        teacherId: req.body.teacherId,
        courseId: req.body.courseId,
      });
      return res.status(200).send({ meet2 });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(406) //NOT ACCEPTABLE SINCE THE BODY IS WRONG
      .send({ error: "Error" });
  }
};

//Returning all meetins belongs to a teacher which is passed by parameter.
exports.findMeetingsByTeacher = async function (req, res) {
  if (req.params.id !== undefined) {
    await Meeting.findAll({
      where: {
        teacherId: req.params.id,
      },
    }).then((resp) => {
      return res.status(200).send(resp);
    });
  } else {
    res.status(406).send({ message: "Error" });
  }
};

//Returning the total meetings that have been created by a specific teacher
exports.count = async function (req, res) {
  await Meeting.findAll({
    where: {
      teacherId: req.params.id,
    },
  }).then((result) => {
    const total = result.length;
    return res.status(200).json({
      total,
    });
  });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.index = async function (req, res) {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.limit);

  const { limit, offset } = getPagination(page, size);

  await Meeting.findAll({
    limit,
    offset,
    where: {
      teacherId: req.params.id,
    },
  }).then((result) => {
    return res.status(200).send(result);
  });
};

exports.delete = async function (req, res) {
  await Meeting.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send("Meeting was success deleted");
    })
    .catch((error) => {
      if (req.params.id === undefined) {
        res.status(406).send("The id needs to be specified");
      } else {
        res.status(406).send("Error");
      }
    });
};

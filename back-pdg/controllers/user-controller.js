exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.studentBoard = (req, res) => {
    res.status(200).send("Student Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Teacher Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Teacher assistant Content.");
  };
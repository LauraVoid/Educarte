import { FIND_USER } from "./constants";

export function findUser(id) {
  return {
    type: FIND_USER,
    payload: "Aquí va ir toda la lógica de encontrar un user, GET de axios.",
  };
}

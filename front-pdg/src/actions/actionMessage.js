import { HIDEMESSAGE, MESSAGE } from "./constants";

export function showMessage(message) {
  return {
    type: MESSAGE,
    text: message,
  };
}

export function hideMessage() {
  return {
    type: HIDEMESSAGE,
    text: "",
  };
}

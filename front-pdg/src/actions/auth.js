export function getAllActions(institution) {
    return axios.get(`fencetranctr/adm/institutions/${institution}/actions/`);
  }
  
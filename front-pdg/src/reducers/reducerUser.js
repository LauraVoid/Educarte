//This reducers mantains all the User logic.

const INITIAL_STATE = {
  userId: 0,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FIND_USER": {
      return [];
    }
    default:
      return state;
  }
}

export default reducer;

import { FETCH_ALL, CREATE, DELETE } from "../../Constants/Constants.js";

const orgs = (state = { orgsData: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { orgsData: action?.data };

    case CREATE:
      return {
        ...state,
        orgsData: action?.data,
      };

    case DELETE:
      return {
        ...state, orgsData:  state.orgsData.filter(id => id != action?.data)
      };
      
    default:
      return state;
  }
};

export default orgs;

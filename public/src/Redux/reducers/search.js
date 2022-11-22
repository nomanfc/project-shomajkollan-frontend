import { FETCH_ALL_SEARCH} from "../../Constants/Constants.js";

const searchData = (state = [] , action) => {

  switch (action.type) {
    case FETCH_ALL_SEARCH:
      return  action?.payload

    default:
      return state;
  }
};

export default searchData;

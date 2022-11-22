import { COUNT } from "../../Constants/Constants.js";

const searchData = (state = [] , action) => {
  switch (action.type) {
    case COUNT:
      return  action?.payload;

    default:
      return state;
  }
};

export default searchData;

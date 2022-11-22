import { FETCH_ALL_SEARCH } from "../../Constants/Constants.js";
import { searchByName } from "../../Auth/httprequests.js";

export const getSearchData = (searchKeyword) => (dispatch) => {
  try {
    searchByName(searchKeyword.search).then((response) => {
      dispatch({ type: FETCH_ALL_SEARCH, payload: response.data.data });
    });
  } catch (err) {
    console.error(err);
  }
};

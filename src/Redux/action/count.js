import { COUNT } from "../../Constants/Constants.js";

export const startCount = () => (dispatch) => {
  try {
      dispatch({ type: COUNT, payload: Math.random() * 10 });
  } catch (err) {
    console.error(err);
  }
};

import { FETCH_ALL, CREATE, DELETE} from "../../Constants/Constants.js";
import * as api from "../../Auth/httprequests.js";
import {Navigate} from "react-router-dom"


export const getOrgs = ()=> async (dispatch) => {
  try{

    const { data } = await api.getAllOrgs();
    dispatch({ type: FETCH_ALL, data });

  }catch (err){
    console.error(err);
  }
};

export const addOrgs = (orgsData, navigate)=> async (dispatch) => {
    try{
  
      const { data } = await api.addOrgs(orgsData);
      dispatch({ type: CREATE, data });

      setTimeout(function () {

        if (data.success === 1) {
          localStorage.setItem("open", 1);
           navigate('/allorg')
        }
        // if (authentication?.success !== 1) {
        //   localStorage.setItem("loadingAlert", true);
        // }
      }, 2000);
  
    }catch (err){
      console.error(err);
    }
  };

  export const deleteOrg = (_id,navigate)=> async (dispatch) => {
    try{
  
      const { data } = await api.deleteOrgs(_id);
      dispatch({ type: DELETE, data });

      setTimeout(function () {
        if (data.success === 1) {
           navigate('/allorg')
        }
      }, 2000);
  
    }catch (err){
      console.error(err);
    }
  };
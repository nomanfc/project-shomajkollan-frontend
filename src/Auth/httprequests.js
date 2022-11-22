import axios from "axios";
import { BASE_URL, UP_URL } from "../Constants/Constants.js";

const API = axios.create({ baseURL: BASE_URL });

// export const upload = axios.create({
//   baseURL: UP_URL,
//   headers: {
//     "Content-type": "application/json"
//   }
// });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//login
export const signIn = (formData) =>
  API.post("/login/", formData).then((res) => {
    return res;
  });

//users
export const createUser = (formData) => API.post("/user/create", formData); // create new user
export const checkUserEmail = () => API.post("/user/email"); // check is email allready use or not
export const getAllUsers = () => API.get("/users/"); //get all users
export const userType = () => API.get("/users/:type"); // get user by type client/psychologist
export const getUserById = () => API.get("/user/:id"); // gett user by id
export const updateUser = () => API.put("/user/update"); //update user data
export const changeUserPassword = () => API.patch("/user/changePassword"); // chabge user password
export const addUserAccessToken = () => API.patch("/user/accessToken"); // add user access token
export const deleteUsers = (_id) => API.delete("/user/delete/" + _id); // delete a auser

//organization Api
export const addOrgs = (orgsData) =>
  API.post("/org/create", orgsData).then((res) => {
    return res;
  });
export const checkRegNo = (regno) =>
  API.post("/org/regno", { regNo: regno }).then((res) => {
    return res;
  });
export const orgsByRegNo = (_id) =>
  API.get(`/org/${_id}`).then((res) => {
    return res;
  }); // get Org by type reg no
export const deleteOrgs = (_id) =>
  API.delete("/org/delete/" + _id).then((res) => {
    return res;
  }); // delete a Org

export const getOrgPublic = () => API.get("/org/public");
export const orgsByEmail = () => API.post("/org/email"); // check is email allready use or not
export const getAllOrgs = () => API.get("/org/"); // get all Org by
export const orgsUpdate = (formData) => API.put("/org/update", formData); //update Org data
export const updateFileName = (fileName) =>
  API.patch("/org/filename", fileName);

export const upload = (id, formData, type) =>
  API.post(`file/upload/${id}`, formData, {
    headers: {
      "Content-Type": { type },
    },
  });
export const fileDownload = (fileName) => API.get(`/file/download/${fileName}`);
export const fileDownloadLink = (fileName) => API.get(`/file/link/${fileName}`);
export const goToFileDownloadLink = (fileUrl) => API.get(fileUrl);

export const verifiedBy = (regNo, verified)=> API.patch('/org/verifiedby', {regNo: regNo, verifiedBy: verified})
export const isVerified = (regNo, isVerified)=> API.patch('/org/isverified', {regNo: regNo, isVerified: isVerified})

//search api
export const searchByName = (searchKeyword) =>
  API.get(`/org/byname/${searchKeyword}`);

//Founder Api
export const createFounder = (countFounder) =>
  API.post("/founder/create", countFounder);
export const getAllFounder = () => API.get("/founders");
export const getFounderByRegNo = (regNo) => API.get(`/founder/${regNo}`);
export const getFounderByid = (_id) => API.get(`/founder/${_id}`);
export const updateFounderData = (countFounder) =>
  API.put("/founder/update", countFounder);
export const deleteFounder = (_id) => API.delete(`/founder/delete/${_id}`);

//Bank Api
export const createBank = (countBank) => API.post("/bank/create", countBank);
export const getBankByRegNo = (regNo) => API.get(`/bank/${regNo}`);
export const getAllBank = () => API.get("/banks");
export const getBankByid = (_id) => API.get(`/bank/${_id}`);
export const updateBankData = (countBank) => API.put("/bank/update", countBank);
export const deleteBank = (_id) => API.delete(`/bank/delete/${_id}`);

//Officer Api
export const createOfficer = (countOfficer) =>
  API.post("/officer/create", countOfficer);
export const getAllOfficer = () => API.get("/officers");
export const getOfficerByRegNo = (regNo) => API.get(`/officer/${regNo}`);
export const getOfficerByid = (_id) => API.get(`/officer/${_id}`);
export const updateOfficerData = (countOfficer) =>
  API.put("/officer/update", countOfficer);
export const deleteOfficer = (_id) => API.delete(`/officer/delete/${_id}`);

//Serach Filter

export const getOrgBySubDist = (orgSubdist) =>
  API.post("/org/filter/subdest", { orgSubdist: orgSubdist });

export const getOrgByRON = (orgRelatedOfficeName) =>
  API.post("/org/filter/ron", { orgRelatedOfficeName: orgRelatedOfficeName });

export const getOrgByRegDate = (date1, date2) =>
  API.post("/org/filter/regdate", { date1, date2 });

export const getAllOrgBySubDistANDTwoRegDate = (orgSubdist, date1, date2) =>
  API.post("/org/filter/sdandregdate", { orgSubdist, date1, date2 });

export const getAllOrgByOrgRelatedOfficeNameANDTwoRegDate = (
  orgRelatedOfficeName,
  date1,
  date2
) =>
  API.post("/org/filter/ronandregdate", { orgRelatedOfficeName, date1, date2 });

export const getAllOrgBySubDistANDOrgRelatedOfficeName = (
 orgSubdist,
  orgRelatedOfficeName
) => API.post("/org/filter/sdandron", [{orgSubdist: orgSubdist, orgRelatedOfficeName: orgRelatedOfficeName}]);

import React,{useState, useEffect} from "react";
import Typography from '@mui/material/Typography';
import * as styled from "./App.styled";
import { RiLogoutBoxRLine } from "react-icons/ri";
// import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
// import {signout} from '../../actions/auth'
import SearchBarAdminPanel from "./SearchBarAdminPanel.js";

var authentication = JSON.parse(localStorage.getItem("profile"));

export default function NavText() {
//   const dispatch = useDispatch();
  const history = useNavigate();
//   const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  
  const handleLogOut = ()=> {
    localStorage.clear();
    window.location.reload();
  }

  var name = authentication.data.name;

//   useEffect(()=>{
//     setUser(JSON.parse(localStorage.getItem('profile')))
//   },[])

//   const userName = user.data.name.charAt(0).toUpperCase() + user.data.name.slice(1);

// console.log(window.location.pathname)


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        fontFamily: 'Kalpurush'
      }}
    >
      <Typography variant="h6" noWrap>
      {/* এডমিন প্যানেল */}
      </Typography>
      {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                border: "1px solid black",
                width: "15%",
              }}
            >
              <img />
              <div>
                <h5>Login</h5>
              </div>
            </div>
          </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "fit-content",
        }}
      >
        <styled.Search><SearchBarAdminPanel/></styled.Search>
        <styled.userName>{name}</styled.userName>
        <styled.logOut onClick={handleLogOut}><RiLogoutBoxRLine/></styled.logOut>
      </div>
    </div>
  );
}

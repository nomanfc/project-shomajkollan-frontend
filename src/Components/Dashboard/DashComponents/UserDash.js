import React,{ useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import {getAllUsers} from '../../../Auth/httprequests.js'
import * as s from "../DashBoard.styled";


let banglaNumber = {
  0: "০",
  1: "১",
  2: "২",
  3: "৩",
  4: "৪",
  5: "৫",
  6: "৬",
  7: "৭",
  8: "৮",
  9: "৯",
};
const engToBdNum = (str) => {
  for (var x in banglaNumber) {
    str = str.replace(new RegExp(x, "g"), banglaNumber[x]);
  }
  return str;
};



const UserDash = () => {
    const [tableData, setTableData] = useState([]);
    const history = useNavigate()



    useEffect(() => {
      getAllUsers()
        .then((response) => {
          setTableData(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    //client has access
    // let ActiveUser = 0;
    // for (let i = 0; i < access?.length; i++) {
    //   if (access[i].type === 'client') {
    //     ActiveUser = ActiveUser + 1;
    //   }
    // }
  
    const handleClick = ()=>{
      history('allusers');
    }
  
    const num = tableData?.length;
  
    return (
        <s.dashCards onClick={handleClick} style={{ cursor: "pointer" }}>
        <s.dashCardPic style={{  }}>
          <PeopleSharpIcon style={{ height: "70px", width: "70px", color: "green" }} />
        </s.dashCardPic>
        <s.dashCardLine
          style={{
            justifyContent: "center",
            color: "#6f4283",
            textShadow: "1px 1px 1px gray",
            fontSize: '20px'
          }}
        >
          <p>নিবন্ধনকৃত ব্যবহারকারীর সংখ্যা</p>
        </s.dashCardLine>
        <s.dashCardLine style={{ paddingLeft: "15px" }}>
        <h1><b style={{ color: "olive"}}>{engToBdNum(num.toString())}</b></h1>
        </s.dashCardLine>
        <s.dashCardLine
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 15px",
          }}
        >
        </s.dashCardLine>
      </s.dashCards>
    )
}

export default UserDash

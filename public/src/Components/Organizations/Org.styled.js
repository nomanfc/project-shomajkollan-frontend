import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Container = styled.div`
  width: 100%;
  margin: 75px auto 75px auto;
  font-family: "Kalpurush";
`;

export const RegisterArea = styled.div`
  border-radius: 15px;
  height: fit-content;
  padding-bottom: 10px;
  max-width: 1000px;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: Space-around;
  margin: auto auto auto auto;
  box-shadow: 0px 0px 2px gray;
  @media (max-width: 768px) {
    min-width: 95%;
    max-width: 95%;
    height: fit-content;
    flex-direction: column;
  }
`;

export const RegisterSubArea = styled.div`
  border-radius: 15px;
  width: 100%;
  justify-content: space-around;
  margin: 15px auto 45px auto;
  @media (max-width: 768px) {
    width: 95%;
    min-height: fit-content;
    flex-direction: column;
    margin: 5px auto auto auto;
  }
`;
export const ButtonArea = styled.div`
  padding: 10px;
  width: 50%;
  diplay: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    height: fit-content;
    width: 100%;
    margin: 15px auto auto auto;
    flex-direction: column;
  }
`;

//details Page
export const DetailsArea = styled.div`
  border-radius: 15px;
  padding-bottom: 20px;
  max-width: 800px;
  min-width: 900px;
  flex-wrap: wrap;
  display: flex;
  justify-content: Space-around;
  margin: auto auto auto auto;

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    height: fit-content;
    flex-direction: column;
  }
`;

export const OrgDetailsHeader = styled.div`
  width: 95%;
  margin: 30px auto auto auto;
  border-radius: 15px 15px 0 0;
  padding: 10px;
`;

export const OrgDetails = styled.div`
  border-radius: 15px;
  min-height: 450px;
  width: 95%;
  margin: 15px auto auto auto;
  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    flex-direction: column;
    margin: 5px auto auto auto;
  }
`;

export const PersonalDetails = styled.div`
  border-radius: 15px;
  min-height: 450px;
  width: 95%;
  margin: 15px auto auto auto;
  @media (max-width: 768px) {
    width: 95%;
    min-height: fit-content;
    flex-direction: column;
    margin: 5px auto auto auto;
  }
`;

export const SubArea = styled.div`
  border-radius: 15px;
  display: flex;
  width: 70%;
  flex-wrap: wrap;

  margin: 15px auto auto auto;
  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    margin: 5px auto auto auto;
  }
`;

export const SubDivHeader = styled.div`
  width: 20%;
  padding: 5px;
  color: #000000;
  font-size: 20px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;
export const SubDivBody = styled.div`
  color: #404040;
  width: 40%;
  font-size: 14px;
  letter-spacing: 0.5px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const MenuContainer = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  margin: 10px auto auto auto;
  align-items: center;
  justify-content: space-around;
`;
export const MenuItems = styled.div`
  width: 30%;
  box-shadow: 0px 0px 1px white;
  text-align: center;
  cursor: pointer;
  transition-duration: 1s;
  padding: 5px;
  background: #6f4283;
  color: white;
`;

export const MenuBody = styled.div`
  width: 95%;
  margin: 10px auto;
  border-radius: 0 0 15px 15px;
  min-height: 400px;
`;

///Components Details

export const OrgsFulldetails = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
export const FounderFulldetails = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
export const BankFulldetails = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
export const OfficerFulldetails = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const FileFulldetails = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const SubDivBodyHeader = styled.div`
  color: #101010;
  width: 45%;
  padding: 5px;
  color: black;
  font-style: bold;
  font-size: 15px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const SubDivBodyText = styled.div`
  color: #404040;
  width: 40%;
  font-size: 14px;
  paddingbottom: "20px", @media (max-width: 768px) {
    width: 50%;
  }
`;

export const OrgDetailsHeaderMenu = styled.div`
  width: 95%;
  margin: 30px auto auto auto;
  padding: 10px;
`;

const pulse = keyframes`
from {
  background: #FFFFFF;
}

to {
  background: #ffe02e;
}
`;

export const button = styled.div`
  border-radius: 5px;
  animation: ${pulse} 3s ease-in-out;
  animation-iteration-count: infinite;
`;

//search details

export const DetailsAreaSearchContainer = styled.div`
  
  max-width: 90%;
  min-width: 900px;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: Space-around;
  margin: auto auto auto auto;

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    height: fit-content;
    flex-direction: column;
  }
`;

export const DetailsSearchBar = styled.div`
  
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
export const DetailsSearchOptions = styled.div`
width: '100%';
display: flex;
padding: 5px;
justify-content: center;
`


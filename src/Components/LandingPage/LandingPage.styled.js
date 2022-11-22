import styled from "@emotion/styled";

export const Container = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  flex-wrap: wrap;
  background: #644895;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
`;

export const TitleContainer = styled.div`
  height: 60px;
  width: 100%;
  background: #6f4283;
  display: flex;
`;

export const ContentHolder = styled.div`
  width: 60%;
  margin-left: 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
    justify-content: space-around;
  }
`;

export const TitleText = styled.div`
  font-size: 25px;
  color: white;
  width: fit-content;
  height: fit-content;
  text-shadow: 2px 0px 2px black;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const Searchbar = styled.div`
  color: white;
  width: fit-content;
  height: fit-content;
  @media (max-width: 1080px) {
    display: none;
  }
`;
export const Login = styled.div`
  color: #644895;
  margin-left: 90%;
  width: fit-content;
  height: fit-content;
  font-size: 17px;
  text-shadow: 1px 0px 1px gray;
  display: ${(props) => (props.isLoggedin ? "none" : "block")};
`;

export const ContentBodyContainer = styled.div`
  border: 1px solid gray;
  height: 210px;
  background: #B19BCA;
  width: 23%;
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
  @media (max-width: 1080px) {
    width: 90%;
  }
`;

export const TotalOrganization = styled.div`
  color: white;
  font-size: 20px;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
`;

export const TotalOrganizationText = styled.div`
  width: fit-content;
  padding: 10px;
  border-radius: 5px;
  text-shadow: 1px 1px 1px gray;
  color: #6f4283;
  margin: auto;
  box-shadow: 0 2px 2px black;
  background: #ebf8e7;
`;

export const Content = styled.div`
  background: white;
  opacity: 0.8;
  margin: 10px auto 10px auto;
  width: 30%;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 2px 3px 3px 0px black;
  text-shadow: 1px 0px 1px gray;
  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
  }
`;
export const ConTitle = styled.h2`
  text-align: center;
  margin: auto;
  font-size: 20px;
  width: 80%;
  color: purple;
`;

export const ContentBody = styled.div`
  width: 100%;
  text-align: center;
  font-size: 15px;
  margin: auto;
  padding: 5px;
  color: black;
`;
export const ContentBodyAddress = styled.div``;
export const ContentBodyPhone = styled.div``;
export const ContentBodyEmail = styled.div``;
export const ContentBodyWebsite = styled.div``;

export const subcontainer = styled.div`
  min-width: 90%;
  max-width: 90%;
  min-height: 85vh;
  max-height: 85vh;
  margin: auto;
`;

export const div_one = styled.div`
  width: 100%;
  margin: auto auto 20px auto;
  min-height: 150px;
  display: flex;
  justify-content: space-between;
`;

export const div_one_sec_one = styled.div`
border: "1px solid black",
width: "200px",
text-align: "center",
`;

export const div_one_sec_two = styled.div`
border: "1px solid black",
width: "500px",
text-align: "center",
`;

export const div_one_sec_three = styled.div`
border: "1px solid black",
width: "200px",
text-align: "center",
`;

export const div_two = styled.div`
  width: 100%;
  margin: auto auto 20px auto;
  height: 65px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

export const div_two_sec_one = styled.div`
  width: 90%;
  height: 30px;
  margin: auto;
`;

export const div_two_sec_two = styled.div`
  width: fit-content;
  height: 30px;
  margin: 10px auto auto auto;
`;

export const div_three = styled.div`
  width: 100%;
  height: 290px;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 50px; 
  justify-content: space-around;
`;

export const footer = styled.div`
  position: fixed;
  padding: 13px;
  border: 3px solid #95B73C;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  color: #6f4283;
`;

import styled from "@emotion/styled";

export const Container = styled.div`
  height: fit-content;
  min-height: 100vh;
  width: 100%;
  background: #644895;
`;

export const topCon = styled.div`

  width: 90%;
  height: 150px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const topConSec1 = styled.div`
  width: 200px;
  padding-top: 15%;
  border-radius:50%;

`;
export const topConSec2 = styled.div`
  width: 390px;
  padding-top: 15%;

`;
export const topConSec3 = styled.div`
  width: 200px; 
  padding-top: 15%;
  border-radius:50%;

`;

export const LoginContainer = styled.div`
  width: 390px;
  border-radius: 15px;
  margin: 7%  auto auto auto;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: #ab98c5;

  box-shadow: 0 0 2px;

  @media (max-width: 768px) {
    width: 90%;
    border-radius: 15px;
  }
`;

export const LoginArea = styled.div`
  backgorund: white;
  height: 100%;
  width: 90%;
  margin: auto;
`;

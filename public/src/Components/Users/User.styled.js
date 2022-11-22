import styled from '@emotion/styled';


export const Container = styled.div`
    width: 95%;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
    display: flex;
    align-items: center;
    alignitems: center;
    min-height: fit-content;
    @media (min-width:768px){
        width: 100%;
    }
`

export const RegisterArea = styled.div`
    margin: 180px auto auto auto;
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 15px;
    height: 520px;
    box-shadow: 0px 0px 5px gray;
    @media (max-width:768px){
        width: 95%;
    }
`


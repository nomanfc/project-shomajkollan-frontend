import React from 'react';
import styled from '@emotion/styled';

export const container = styled.div`
    max-width: 800px;
    display: flex;
    color: black;
    margin:auto;
    justify-content: space-around;
    align-items: center;
    min-height: 80vh;
    @media (max-width:768px){
        flex-direction: column;
        min-width: 95%;
    }
`

export const dashCardCon = styled.div`
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    @media (max-width: 768px) {

    }
`

export const dashCardCon2 = styled.div`
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    margin-bottom: 30px;
    align-items: center;
    @media (max-width: 768px) {

    }
`
export const dashCards = styled.div`
    width: 290px;
    max-height: 250px;
    display: flex;
    border-radius: 15px;
    flex-direction: column;
    background: #FFFFFFFF;
    box-shadow:  1px 1px 3px black;
    margin-bottom: 30px;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`
export const dashCardPic = styled.div`
    width: 100%;
    border-radius: 10px 10px 0px 0px ;
    height: 80px;
    padding-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const dashCardLine = styled.div`
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`


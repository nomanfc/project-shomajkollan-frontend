import styled from '@emotion/styled';

export const Search = styled.div`
    margin-left: 20px;
    margin-right: 40px;
    font-size: 20px;
    color: white;
    cursor: pointer;
`

export const userName = styled.div`
    @media(max-width: 768px) {
        display: none;
    }
`

export const logOut = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    font-size: 20px;
    color: white;
    cursor: pointer;
`

export const ListItem = styled.div`
${(props) =>
    props.isItemSelected &&
    `
        border-left:4px solid blue;
        color: blue;
    `}
`
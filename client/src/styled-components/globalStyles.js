import styled, { css } from 'styled-components';

export const flexRowCenter = css`
display:flex;
justify-content: center;
align-items:center;
`

export const flexColCenter = css`
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
`

export const flexRowStart = css`
display:flex;
justify-content: flex-start;
align-items:center;
`
export const flexColStart = css`
display:flex;
justify-content: flex-start;
align-items:center;
`
export const flexRowSpace = css`
display:flex;
justify-content: space-between;
align-items:center;
`

export const flexColSpace = css`
display:flex;
flex-direction:column;
justify-content: space-between;
align-items:center;
`

export const Input = styled.input`
background:pink;
border:none;
border-radius:5px;
padding:10px;
margin:5px;
`
export const Button = styled.button`
width:100%;
height:10%;
border:1px solid black;
background:yellow;
outline:none;
cursor:pointer;
font-family: -apple-system, BlinkMacSystemFont,'Poiret One', cursive, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-weight:600;
&:hover{
    opacity:0.7;
    
};
&:active{
    border: 2px inset black;
}
`
export const ButtonAlt = styled.button`

width:100px;
height:40px;
background: violet;
border: 1px solid black;
margin:5px;
cursor: pointer;
font-family: -apple-system, BlinkMacSystemFont,'Poiret One', cursive, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-weight:600;
&:hover{
    opacity:0.7;
    
};
&:active{
    border: 2px inset black;
}

`

export const Div = styled.div`

`
export const InvalidHeader = styled.h3`
color:red;
`

export const ValidHeader = styled.h3`
color:green;
`
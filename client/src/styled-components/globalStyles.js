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
border: 1px solid grey;
border-radius:5px;
padding:10px;
margin:5px;
font-family: -apple-system, BlinkMacSystemFont,'Poiret One', cursive, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-weight:600;
`
export const Button = styled.button`
width:100%;
height:10%;
border:none;
background:lavender;
outline:none;
cursor:pointer;
font-family: -apple-system, BlinkMacSystemFont,'Poiret One', cursive, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-weight:600;
    box-shadow:1px 1px 10px 2px grey;
&:hover{
    box-shadow:2px 2px 10px 4px grey;
    
};
&:active{
   background:rgb(208, 208, 247);
}
`
export const ButtonAlt = styled.button`

width:100px;
height:40px;
background: lavender;
outline:none;
margin:5px;
cursor: pointer;
font-family: -apple-system, BlinkMacSystemFont,'Poiret One', cursive, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-weight:600;
&:hover{
    opacity:0.7;
    
};


`

export const Div = styled.div`

`
export const InvalidHeader = styled.h3`
color:red;
`

export const ValidHeader = styled.h3`
color:green;
`
export const Header1 = styled.h1`
margin-bottom: 0em;
 margin-top: 0em;
color:grey;
`
export const Header2 = styled.h2`
margin-bottom: 0em;
 margin-top: 0em;
color:grey;
`
export const Header3 = styled.h3`
margin-bottom: 0em;
 margin-top: 0em;
color:grey;
`
export const Header5 = styled.h5`
margin-bottom: 0em;
 margin-top: 0em;
color:grey;
`

export const TextArea = styled.textarea`

`
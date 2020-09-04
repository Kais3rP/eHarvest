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
border: none;
padding:10px;
margin:5px;
font-family: -apple-system, BlinkMacSystemFont,'Poiret One', cursive, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-weight:600;
    border-radius: 5px;
background: #ffffff;
box-shadow: inset 5px 5px 10px #d9d9d9, 
            inset -5px -5px 10px #ffffff;
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
    box-shadow: 
    12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
&:hover{
    
    
};
&:active{
    background: #ffffff;
box-shadow: inset 5px 0px 13px #6b6b6b, 
            inset -5px 0px 13px #ffffff;
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
z-index:1;
`
export const Header5 = styled.h5`
margin-bottom: 0em;
 margin-top: 0em;
color:grey;
`

export const TextArea = styled.textarea`
overflow:hidden;
  resize:none;
  border: none;
padding:10px;
margin:5px;
font-family: -apple-system, BlinkMacSystemFont,'Poiret One', cursive, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-weight:600;
    border-radius: 5px;
background: #ffffff;
box-shadow: inset 5px 5px 10px #d9d9d9, 
            inset -5px -5px 10px #ffffff;
`

export const Select = styled.select`
color:inherit;
border:none;
padding:10px;
font-family: -apple-system, BlinkMacSystemFont,'Poiret One', cursive, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-weight:600;
border-radius: 5px;
margin:5px;
background: #ffffff;
box-shadow: inset 5px 5px 10px #d9d9d9, 
            inset -5px -5px 10px #ffffff;
`
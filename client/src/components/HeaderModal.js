import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';




export default function ( { position, onMouseOut }) {

    return (
        <ModalWrapper onMouseOut={onMouseOut} style={{top:position}}>
            LINK1<br />
           LINK1<br />
           LINK1<br />
           LINK1<br />
           LINK1<br />
           LINK1<br />
        </ModalWrapper>

    )
}

const ModalWrapper = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-wrap:wrap;
margin-top:100px;
position:fixed;
width:80%;
padding:20px;
background:white;
transition:top 0.2s ease-in;


`
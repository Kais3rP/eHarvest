import React from 'react';
import { flexRowCenter, flexColSpace, flexColCenter, flexRowSpace, flexRowStart } from '../styled-components/globalStyles';
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
${flexRowCenter};
flex-wrap:wrap;
margin-top:100px;
position:fixed;
width:80%;
padding:20px;
background:white;
transition:top 0.2s ease-in;


`
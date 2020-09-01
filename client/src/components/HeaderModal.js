import React from 'react';
import { flexRowCenter, flexColSpace, flexColCenter, flexRowSpace, flexRowStart, Header3 } from '../styled-components/globalStyles';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { closeHeaderModal } from '../slices/shopSlice';
import {  useDispatch } from 'react-redux';




export default function ( { position }) {
const dispatch = useDispatch();
    return (
        <ModalWrapper onMouseLeave={() => { dispatch(closeHeaderModal()) }} style={{top:position}}>
          <Header3><Link to='/howitworks'>How it works</Link></Header3>
          <Header3><Link to='/feedbacks'>Our Feedbacks</Link></Header3>
          <Header3><Link to='/sell'>Sell your harvest</Link></Header3>
          <Header3><Link to='/faq'>FAQ</Link></Header3>

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
transition:top 0.4s ease-in;
box-shadow:1px 1px 10px 2px grey;


`
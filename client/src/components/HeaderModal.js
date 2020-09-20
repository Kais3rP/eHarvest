import React from 'react';
import { flexRowCenter, flexColSpace, flexColCenter, flexRowSpace, flexRowStart, Header3 } from '../styled-components/globalStyles';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { closeHeaderModal } from '../slices/uiSlice';
import {  useDispatch } from 'react-redux';




export default function ( { position }) {
const dispatch = useDispatch();
    return (
        <Modal onMouseLeave={() => { dispatch(closeHeaderModal()) }} style={{top:position}}>
        <ModalWrapper>
          <Header3><Link to='/howitworks'>How it works</Link></Header3>
          <Header3><Link to='/feedbacks'>Our Feedbacks</Link></Header3>
          <Header3><Link to='/sell'>Sell your harvest</Link></Header3>
          <Header3><Link to='/faq'>FAQ</Link></Header3>
          </ModalWrapper>
        </Modal>

    )
}

const Modal = styled.div`
${flexRowCenter};
margin-top:100px;
position:fixed;
width:80%;
padding:20px;
background:white;
transition:top 0.4s ease-in;
box-shadow:1px 1px 10px 2px grey;
z-index:3;
border-bottom-left-radius:50%;
border-bottom-right-radius:50%;

`
const ModalWrapper = styled.div`
${flexRowSpace};
width:50%;


`
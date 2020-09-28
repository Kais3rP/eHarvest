import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, ValidHeader, InvalidHeader, TextArea, flexColCenter, flexRowCenter, flexRowSpace, Header3, Header5, ButtonAlt } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPersonalProducts, fetchPersonalData, fetchUserDataUpdate } from '../slices/userSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";
import PicThumbnail from './PicThumbnail.js';
import Loader from 'react-loader-spinner';
import handleAutoResize from '../helpers/autoResizeTextArea';


export default function () {
    const personalData = useSelector(state=>state.user.personalData);
    const [isEditInfoMode, setIsEditInfoMode] = useState(false);
    const [nameInput, setNameInput] = useState(personalData.name);
    const [surnameInput, setSurnameInput] = useState(personalData.surname);
    const [emailInput, setEmailInput] = useState(personalData.email);
    const dispatch = useDispatch();
    return (
     <>
      <Header3>User Info:</Header3>
      <Header5>Name:  {`${personalData.name} ${personalData.surname}`}</Header5>
      <Header5>E-mail:  {personalData.email}</Header5>
     
      {isEditInfoMode ? (
          <>
        <Input   onChange={(ev) => {setNameInput(ev.target.value)}} value={nameInput}></Input>
        <Input   onChange={(ev) => {setSurnameInput(ev.target.value)}} value={surnameInput}></Input>
        <Input   onChange={(ev) => {setEmailInput(ev.target.value)}} value={emailInput}></Input>
        </>
        )
        
        
         : null}
                     <ButtonAlt onClick={()=>{
          if (isEditInfoMode){ 
              dispatch(fetchUserDataUpdate({...personalData, name: nameInput, surname:surnameInput, email:emailInput}))
              setIsEditInfoMode(false);
              } 
          else setIsEditInfoMode(true)
      }}>{ isEditInfoMode ? 'Submit Changes' : 'Edit Info'}</ButtonAlt>
      </>

    )}
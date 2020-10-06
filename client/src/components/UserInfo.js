import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Header3, Header5, ButtonAlt } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDataUpdate } from '../slices/userSlice';



export default function () {
    const personalData = useSelector(state=>state.user.personalData);
    const [isEditInfoMode, setIsEditInfoMode] = useState(false);
    const [nameInput, setNameInput] = useState(personalData.name);
    const [surnameInput, setSurnameInput] = useState(personalData.surname);
    const [emailInput, setEmailInput] = useState(personalData.email);
    const dispatch = useDispatch();

    function onClick(){
        if (isEditInfoMode){ 
            dispatch(fetchUserDataUpdate({ name: nameInput, surname:surnameInput, email:emailInput}));
            setIsEditInfoMode(false);
            } 
        else setIsEditInfoMode(true)
    }

    return (
     <>
      <Header3>User Info:</Header3>
      <Header5>Name:  {`${personalData.name} ${personalData.surname}`}</Header5>
      <Header5>E-mail:  {personalData.email}</Header5>
     
      {isEditInfoMode ? (
        <>
            <Input  onChange={(ev) => {setNameInput(ev.target.value)}} value={nameInput}/>
            <Input  onChange={(ev) => {setSurnameInput(ev.target.value)}} value={surnameInput}/>
            <Input  onChange={(ev) => {setEmailInput(ev.target.value)}} value={emailInput}/>
        </>
        ) : null}
        <ButtonAlt onClick={onClick}>{ isEditInfoMode ? 'Submit Changes' : 'Edit Info'}</ButtonAlt>
      </>
    )}
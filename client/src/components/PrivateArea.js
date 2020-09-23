import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Input, ValidHeader, InvalidHeader, TextArea, flexColCenter, flexRowCenter, flexRowSpace, Header3, Header5, ButtonAlt } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPersonalProducts, fetchPersonalData, fetchUserDataUpdate } from '../slices/userSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";
import PicThumbnail from './PicThumbnail.js';
import Loader from 'react-loader-spinner';
import handleAutoResize from '../helpers/autoResizeTextArea'






export default function () {
    const personalProducts = useSelector(state=>state.user.personalProducts);
    const personalData = useSelector(state=>state.user.personalData);
    const [isEditDescriptionMode, setIsEditDescriptionMode] = useState(false);
    const [descriptionText, setDescriptionText] = useState(personalData.description)
    const [isEditInfoMode, setIsEditInfoMode] = useState(false);
    const [nameInput, setNameInput] = useState(personalData.name);
    const [surnameInput, setSurnameInput] = useState(personalData.surname);
    const [emailInput, setEmailInput] = useState(personalData.email);
    const dispatch = useDispatch();
    
  useEffect(()=>{
  
   dispatch(fetchPersonalProducts());
   dispatch(fetchPersonalData());
  },[]);

  return personalProducts ? personalProducts.length>0 ? (
      <MainDiv>
      <LeftWrapperDiv>
      <LeftContainerDiv>
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
      }}>{ isEditDescriptionMode ? 'Submit Changes' : 'Edit Info'}</ButtonAlt>
      </LeftContainerDiv>
      <LeftContainerDiv>
      <Header3>Your personal description as a seller:</Header3>
      <Descriptiontext>{personalData.description}</Descriptiontext>
      {isEditDescriptionMode ? <DescriptionTextArea   onChange={(ev) => {
          handleAutoResize(ev);
          setDescriptionText(ev.target.value);             
                    }} value={descriptionText}></DescriptionTextArea> : null}
                     <ButtonAlt onClick={()=>{
          if (isEditDescriptionMode){ 
              dispatch(fetchUserDataUpdate({...personalData, description: descriptionText}))
              setIsEditDescriptionMode(false);
              } 
          else setIsEditDescriptionMode(true)
      }}>{ isEditDescriptionMode ? 'Submit Changes' : 'Edit Description'}</ButtonAlt>
      </LeftContainerDiv>
      <LeftContainerDiv>
      <Header3>Products you bought:</Header3>
      {/* Here goes the picthumbnail of productsBought array*/}
      </LeftContainerDiv>
      </LeftWrapperDiv>
      <RightContainerDiv>
      <Header3>Personal Products</Header3>
            <PicThumbnailContainer>
                {personalProducts.map((item, i) => (<PicThumbnail key={i} item={item} idx={i} priv={true}/>))}
            </PicThumbnailContainer>
          </RightContainerDiv>
        
      </MainDiv>
  ) :

  (    <Loader
      type="TailSpin"
      color="black"
      height={50}
      width={50}
      timeout={6000} //6 secs
    />) : null
}

const MainDiv = styled.div`
${flexRowSpace};
align-items:flex-start;
width:95%;
margin-top:300px;
@media (max-width:768px){
    ${flexColCenter};
    justify-content:flex-start;
    margin-top:10px;
    width:100%;
}
`

const LeftWrapperDiv = styled.div`
${flexColCenter};
width:47%;

@media (max-width:768px){
    width:100%;

`

const LeftContainerDiv = styled.div`

${flexColCenter};
width:100%;
background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 13px #6b6b6b, 
             -5px -5px 13px #ffffff;
             padding:20px;
margin-bottom:30px;
@media (max-width:768px){
    width:100%;

`
const RightContainerDiv = styled.div`

${flexColCenter};
width:47%;
background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 13px #6b6b6b, 
             -5px -5px 13px #ffffff;
             padding:20px;

@media (max-width:768px){
    width:100%;
`
const PicThumbnailContainer = styled.div`
${flexRowCenter};
width:100%;
height:80%;
flex-wrap:wrap;

`
const DescriptionTextArea = styled(TextArea)`
width:100%;
`

const Descriptiontext = styled.p`



`




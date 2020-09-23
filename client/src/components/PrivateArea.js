import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, flexRowSpace, Header3, Header5 } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPersonalProducts } from '../slices/userSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";
import PicThumbnail from './PicThumbnail.js';
import Loader from 'react-loader-spinner';





export default function () {
    const personalProducts = useSelector(state=>state.user.personalProducts);
    const userData = useSelector(state=>state.user.userData);
    const dispatch = useDispatch();
    
  useEffect(()=>{
  
   dispatch(fetchPersonalProducts());
   
  },[]);

  return personalProducts ? personalProducts.length>0 ? (
      <MainDiv>
      <LeftContainerDiv>
      <Header3>User Info:</Header3>
      <Header5>Name:  {`${userData.name} ${userData.surname}`}</Header5>
      <Header5>E-mail:  {userData.email}</Header5>
      </LeftContainerDiv>
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
const LeftContainerDiv = styled.div`

${flexColCenter};
width:47%;
background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 13px #6b6b6b, 
             -5px -5px 13px #ffffff;
             padding:20px;

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







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
import handleAutoResize from '../helpers/autoResizeTextArea';
import UserInfo from './UserInfo';
import UserPicture from './UserPicture';
import UserDescription from './UserDescription';





export default function () {
    const personalProducts = useSelector(state => state.user.personalProducts);
    const personalData = useSelector(state => state.user.personalData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPersonalProducts());
        dispatch(fetchPersonalData());

    }, []);

    return personalProducts ? personalProducts.length >= 0 ? (
        <MainDiv>
            <LeftWrapperDiv>
                <LeftContainerDiv>
                    <UserInfo />
                </LeftContainerDiv>
                <LeftContainerDiv>
                    <UserPicture />
                </LeftContainerDiv>
                <LeftContainerDiv>
                    <UserDescription />
                </LeftContainerDiv>
                <LeftContainerDiv>
                    <Header3>Products you bought:</Header3>
                    {/* Here goes the picthumbnail of productsBought array*/}
                </LeftContainerDiv>
            </LeftWrapperDiv>
            <RightContainerDiv>
                <Header3>Personal Products</Header3>
                <PicThumbnailContainer>
                    {personalProducts.map((item, i) => (<PicThumbnail key={i} item={item} idx={i} priv={true} />))}
                </PicThumbnailContainer>
            </RightContainerDiv>
        </MainDiv>
    ) :

        (<Loader
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

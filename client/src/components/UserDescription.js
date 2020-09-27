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


export default function () {
    const personalData = useSelector(state=>state.user.personalData);
    const [isEditDescriptionMode, setIsEditDescriptionMode] = useState(false);
    const [descriptionText, setDescriptionText] = useState(personalData.description);
    const dispatch = useDispatch();
    return (
     <>
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
      </>

    )}

    const DescriptionTextArea = styled(TextArea)`
width:100%;
`

const Descriptiontext = styled.p`



`

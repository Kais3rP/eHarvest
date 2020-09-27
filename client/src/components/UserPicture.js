import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Input, ValidHeader, InvalidHeader, TextArea, flexColCenter, flexRowCenter, flexRowSpace, Header3, Header5, ButtonAlt } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import {  asyncUpdateUserPicture } from '../slices/userSlice';
import { } from 'react-icons/fa';
import { IconContext } from "react-icons";
import Loader from 'react-loader-spinner';



export default function () {
  const personalData = useSelector(state => state.user.personalData);
  const [isEditPicMode, setIsEditPicMode] = useState(false);
  const [userPic, setUserPic] = useState('');
  const [isNewPicUploaded, setIsNewPicUploaded] = useState('');
  const dispatch = useDispatch();
  return (
    <>
      <Header3>Personal Picture:</Header3>
      {isEditPicMode ?

        (
          <>
            <FileInput type="file" onChange={(e) => {
              setUserPic(e.target.files[0]);
              setIsNewPicUploaded(true);
            }} name="user-picture" accept="image/*"></FileInput>

            {isNewPicUploaded ? <UserPicPreview src={URL.createObjectURL(userPic)} alt='User'></UserPicPreview> : null}
          </>)
        :
        <UserPic src={`data:image/png;base64,${personalData.picture}`}></UserPic>
      }
      <ButtonAlt onClick={() => {
        if (isEditPicMode) {
          const data = new FormData();
          if (userPic instanceof Blob){
          data.append('user-picture', userPic, 'user-picture' );
          dispatch(asyncUpdateUserPicture(data));
          setIsEditPicMode(false);
          }
        }
        else setIsEditPicMode(true)
      }}>{isEditPicMode ? 'Submit Changes' : 'Edit Picture'}</ButtonAlt>


    </>

  )
}


const FileInput = styled(Input)`
    width:95%;
    `
const UserPic = styled.img`

width:80%;
max-width:300px;
`
const UserPicPreview = styled.img`

width:80%;
`


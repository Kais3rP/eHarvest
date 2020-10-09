import React, { useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { ButtonAlt } from "../styled-components/globalStyles"
import { asyncUpdateUserPicture } from "../slices/userSlice"

export default function () {
  const personalData = useSelector((state) => state.user.personalData)
  const [isEditPicMode, setIsEditPicMode] = useState(false)
  const [userPic, setUserPic] = useState("")
  const [isNewPicUploaded, setIsNewPicUploaded] = useState("")
  const dispatch = useDispatch()

  function onClick() {
    if (isEditPicMode) {
      const data = new FormData()
      if (userPic instanceof Blob) {
        data.append("user-picture", userPic, "user-picture")
        dispatch(asyncUpdateUserPicture(data))
        setIsEditPicMode(false)
      }
    } else setIsEditPicMode(true)
  }

  function onChange(e) {
    setUserPic(e.target.files[0])
    setIsNewPicUploaded(true)
  }

  return (
    <>
      <strong>Personal Picture:</strong>
      {isEditPicMode ? (
        <>
          <FileInput
            type="file"
            onChange={onChange}
            name="user-picture"
            accept="image/*"
          />
          {isNewPicUploaded ? (
            <UserPicPreviewImg src={URL.createObjectURL(userPic)} alt="User" />
          ) : null}
        </>
      ) : (
        <UserPicImg
          src={
            personalData.picture
              ? `data:image/png;base64,${personalData.picture}`
              : "/assets/dummy-avatar.jpg"
          }
        />
      )}
      <ButtonAlt onClick={onClick}>
        {isEditPicMode ? "Submit Changes" : "Edit Picture"}
      </ButtonAlt>
    </>
  )
}

const FileInput = styled.input`
  width: 95%;
`
const UserPicImg = styled.img`
  width: 80%;
  max-width: 300px;
`
const UserPicPreviewImg = styled.img`
  width: 80%;
`

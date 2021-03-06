import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { FaShoppingCart } from "react-icons/fa"
import { IconContext } from "react-icons"
import {
  flexRowCenter,
  flexColSpace,
  flexColCenter,
  flexRowSpace,
  flexRowStart,
  ButtonAlt,
} from "../styled-components/globalStyles"
import {
  toggleCart,
  toggleHeaderModal,
  openHeaderModal,
} from "../slices/uiSlice"
import { fetchLogout } from "../slices/userSlice"
import Logo from "../components/Logo"

export default function () {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const username = useSelector((state) => state.user.username)

  const dispatch = useDispatch()
  return (
    <HeaderWrapper>
      <LeftHeaderContainer>
        <Logo />
      </LeftHeaderContainer>
      <MidHeaderContainer>
        <HeaderLink>
          <Link to="/">HOME</Link>
        </HeaderLink>
        <HeaderLink>
          <Link to="/fullshop">FULL SHOP</Link>
        </HeaderLink>
        <HeaderLink
          onMouseOver={() => {
            dispatch(openHeaderModal())
          }}
        >
          <a>WHAT'S eHARVEST</a>
        </HeaderLink>
      </MidHeaderContainer>
      <RightHeaderContainer>
        <ContainerDiv>
          <MiniNavDiv>
            <IconContext.Provider
              value={{
                style: {
                  marginRight: "10px",
                  color: "grey",
                  cursor: "pointer",
                },
              }}
            >
              <FaShoppingCart
                size={30}
                onClick={() => {
                  dispatch(toggleCart())
                }}
              />
            </IconContext.Provider>
            <div>
              {isLoggedIn ? (
                <HeaderLink>
                  <Link to="/private-area">Personal Area</Link>
                </HeaderLink>
              ) : null}
            </div>
          </MiniNavDiv>
          <LoginContainer>
            {isLoggedIn ? (
              <ButtonAlt
                type="Button"
                onClick={() => {
                  dispatch(fetchLogout())
                }}
              >
                Log Out
              </ButtonAlt>
            ) : (
              <HeaderLink>
                <Link to="/login">Welcome! Login</Link>
              </HeaderLink>
            )}
            <p>{isLoggedIn ? `Welcome ${username}!` : "Not Logged"}</p>
          </LoginContainer>
        </ContainerDiv>
      </RightHeaderContainer>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  ${flexRowCenter};
  width: 100%;
  height: 200px;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 4;
  background: white;
  box-shadow: 1px 2px 10px 2px grey;
`
const LeftHeaderContainer = styled.div`
  ${flexRowStart};
  width: 30%;
  height: 100%;
`
const RightHeaderContainer = styled.div`
  ${flexRowCenter}
  justify-content:flex-end;
  width: 30%;
  height: 100%;
  margin-right: 20px;
`
const ContainerDiv = styled.div`
  ${flexRowCenter};
  align-items: flex-start;
`

const MiniNavDiv = styled.div`
  ${flexRowCenter};
  margin-top: 12px;
`
const MidHeaderContainer = styled.div`
  ${flexRowCenter};
  width: 40%;
`

const HeaderLink = styled.div`
  margin: 10px;
  color: grey;
  cursor: pointer;
`
const LoginContainer = styled.div``

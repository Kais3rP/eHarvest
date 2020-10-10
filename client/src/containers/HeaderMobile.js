import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { FaShoppingCart } from "react-icons/fa"
import { IconContext } from "react-icons"
import {
  flexRowCenter,
  flexColCenter,
  ButtonAlt,
} from "../styled-components/globalStyles"
import { toggleCart, toggleHeaderMobile } from "../slices/uiSlice"
import { fetchLogout } from "../slices/userSlice"
import Logo from "../components/Logo"

export default function ({ position }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const username = useSelector((state) => state.user.username)

  const dispatch = useDispatch()
  return (
    <HeaderWrapper style={{ left: position }}>
      <TopHeaderContainer>
        <Logo />
      </TopHeaderContainer>
      <MidHeaderContainer>
        <HeaderLink>
          <Link
            onClick={() => {
              dispatch(toggleHeaderMobile())
            }}
            to="/"
          >
            HOME
          </Link>
        </HeaderLink>
        <HeaderLink>
          <Link
            onClick={() => {
              dispatch(toggleHeaderMobile())
            }}
            to="/fullshop"
          >
            FULL SHOP
          </Link>
        </HeaderLink>
        <HeaderLink>
          <Link
            onClick={() => {
              dispatch(toggleHeaderMobile())
            }}
            to="/howitworks"
          >
            HOW IT WORKS
          </Link>
        </HeaderLink>
        <HeaderLink>
          <Link
            onClick={() => {
              dispatch(toggleHeaderMobile())
            }}
            to="/feedbacks"
          >
            OUR FEEDBACKS
          </Link>
        </HeaderLink>
        <HeaderLink>
          <Link
            onClick={() => {
              dispatch(toggleHeaderMobile())
            }}
            to="/sell"
          >
            SELL YOU HARVEST
          </Link>
        </HeaderLink>
        <HeaderLink>
          <Link
            onClick={() => {
              dispatch(toggleHeaderMobile())
            }}
            to="/faq"
          >
            FAQ
          </Link>
        </HeaderLink>
      </MidHeaderContainer>

      <BottomHeaderContainer>
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
              <Link
                onClick={() => {
                  dispatch(toggleHeaderMobile())
                }}
                to="/login"
              >
                Welcome! Login
              </Link>
            </HeaderLink>
          )}
          <p> {isLoggedIn ? username : "Not Logged"}</p>
          {isLoggedIn ? (
            <HeaderLink>
              <Link
                onClick={() => {
                  dispatch(toggleHeaderMobile())
                }}
                to="/private-area"
              >
                Personal Area
              </Link>
            </HeaderLink>
          ) : null}
        </LoginContainer>
        <IconContext.Provider
          value={{
            style: { marginRight: "10px", color: "grey", cursor: "pointer" },
          }}
        >
          <FaShoppingCart
            size={30}
            onClick={() => {
              dispatch(toggleCart())
              dispatch(toggleHeaderMobile())
            }}
          />
        </IconContext.Provider>
      </BottomHeaderContainer>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  position: fixed;
  left: 0;
  width: 320px;
  height: 100%;
  ${flexColCenter};
  justify-content: flex-start;
  margin-top: 0px;
  transition: left 0.5s ease-in;
  z-index: 2;
  overflow-y: auto;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 1px 1px 5px #878787, -1px -1px 5px #ffffff;
`
const TopHeaderContainer = styled.div`
  ${flexRowCenter};
  width: 100%;
  height: 40%;
  min-height: 200px;
`
const MidHeaderContainer = styled.div`
  ${flexColCenter};
  width: 100%;
  height: 40%;
  min-height: 300px;
`
const BottomHeaderContainer = styled.div`
  ${flexRowCenter}

  width:100%;
  height: 20%;
  min-height: 100px;
`

const HeaderLink = styled.div`
  margin: 10px;
  color: grey;
  cursor: pointer;
`
const LoginContainer = styled.div``

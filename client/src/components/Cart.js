import React, { useState } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import {
  flexColSpace,
  flexColCenter,
  flexRowSpace,
  flexRowCenter,
  ButtonAlt,
  Input,
} from "../styled-components/globalStyles"
import {
  resetCart,
  increaseCart,
  decreaseCart,
  calculateTotalPrice,
  pay,
} from "../slices/shopSlice"
import { toggleCart } from "../slices/uiSlice"

export default function ({ position }) {
  const cart = useSelector((state) => state.shop.cart)
  const totalPrice = useSelector((state) => state.shop.totalPrice)
  const payResponse = useSelector((state) => state.shop.payResponse)
  const [hasPaid, setHasPaid] = useState(false)
  const dispatch = useDispatch()

  return (
    <CartWrapper style={{ right: position }}>
      <ControlCart>
        <ButtonAlt
          onClick={() => {
            dispatch(resetCart())
          }}
        >
          Reset Cart
        </ButtonAlt>
        <ButtonAlt
          onClick={() => {
            dispatch(pay({ cart, totalPrice }))
            setHasPaid(true)
            setTimeout(() => {
              setHasPaid(false)
            }, 3000)
          }}
        >
          Pay Now
        </ButtonAlt>
        <CloseCartButton
          onClick={() => {
            dispatch(toggleCart())
          }}
        >
          &times;
        </CloseCartButton>
      </ControlCart>
      <TotalPriceContainer>
        <strong> TOTAL TO PAY: {totalPrice.toFixed(2)}€</strong>
      </TotalPriceContainer>
      <ThumbnailsWrapper>
        {cart.map((item, i) => (
          <ThumbnailProductContainer key={i}>
            <ProductPic id={item.productName} src={item.pic} />
            <InfoUl>
              <em>{item.productName}</em>
              <strong>Sold by: </strong>
              <em>{item.sellerName}</em>
            </InfoUl>
            <QuantityControlContainer>
              <Decrease
                onClick={() => {
                  dispatch(decreaseCart(item))
                  dispatch(calculateTotalPrice())
                }}
              >
                -
              </Decrease>
              <ProductQuantity>{item.quantityInCart}Kg</ProductQuantity>
              <Increase
                onClick={() => {
                  dispatch(increaseCart(item))
                  dispatch(calculateTotalPrice())
                }}
              >
                +
              </Increase>
            </QuantityControlContainer>
          </ThumbnailProductContainer>
        ))}
        <strong>{hasPaid && payResponse}</strong>
      </ThumbnailsWrapper>
    </CartWrapper>
  )
}

const CartWrapper = styled.div`
  position: fixed;
  right: 0;
  width: 320px;
  height: 100%;
  ${flexColCenter};
  justify-content: flex-start;
  margin-top: 200px;
  transition: right 0.5s ease-in;
  z-index: 3;
  overflow-y: auto;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 1px 1px 5px #878787, -1px -1px 5px #ffffff;
  @media (max-width: 768px) {
    margin-top: 0px;
  }
  @media (max-height: 500px) {
    margin-top: 0px;
  }
`

const ControlCart = styled.div`
  ${flexRowSpace};
  width: 100%;
  height: 10%;
  min-height: 80px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
`

const ThumbnailsWrapper = styled.div`
  ${flexColCenter};
  justify-content: flex-start;
  width: 100%;
  height: 80%;
  min-height: 500px;
`
const ThumbnailProductContainer = styled.div`
  ${flexRowSpace};
  height: 10%;
  min-height: 80px;
  width: 98%;
  text-align: center;
  margin: 5px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);

  box-shadow: 1px 1px 5px #878787, -1px -1px 5px #ffffff;
`

const ProductPic = styled.img`
  width: 23%;
`
const InfoUl = styled.ul`
  ${flexColCenter}
  width:43%;
`
const QuantityControlContainer = styled.div`
  ${flexRowCenter};
  width: 30%;
`
const CloseCartButton = styled.div`
  margin-right: 5px;
  cursor: pointer;
  font-size: 50px;
`
const TotalPriceContainer = styled.div`
  width: 98%;
  height: 10%;
  min-height: 80px;
`

const ProductQuantity = styled.div`
  margin: 10px;
`
const Increase = styled.strong`
  cursor: pointer;
`

const Decrease = styled.strong`
  cursor: pointer;
`

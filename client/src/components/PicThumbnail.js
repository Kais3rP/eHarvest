import React from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart';
import convertIdNames from '../helpers/convertIdNames';
import Loader from 'react-loader-spinner'

export default function ({ item }) {

  let mimeType = "image/png";

  return (
    item ?
      (<ThumbnailOfferContainer>
        <PicContainer>
          <OfferPic src={`data:${mimeType};base64,${item.pic}`} />
        </PicContainer>

        {item.id}
        <ItemPrice>{item.price}€</ItemPrice>
        <AddToCart item={item} />
      </ThumbnailOfferContainer>)
      :
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={30}
        width={30}
        timeout={3000} //3 secs
      />
  )
}

const ThumbnailOfferContainer = styled.div`
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
width:35%;
height:100%;
min-width:100px;
text-align:center;
border: 1px solid red;
margin:5px;
`

const PicContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
height:75%;

`
const OfferPic = styled.img`


width:100%;

`
const ItemPrice = styled.div`
width:100%;
height:10%;
background:white;


`
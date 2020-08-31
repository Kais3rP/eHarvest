import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import AddToCart from './AddToCart';
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
        <ItemPrice>{item.price}€/Kg</ItemPrice>
        <AddToCart item={item} />
      </ThumbnailOfferContainer>)
      :
      <Loader
        type="TailSpin"
        color="black"
        height={50}
        width={50}
        timeout={3000} //3 secs
      />
  )
}

const ThumbnailOfferContainer = styled.div`
${flexColCenter};
width:35%;
height:100%;
min-width:100px;
text-align:center;
border: 1px solid red;
margin:5px;
`

const PicContainer = styled.div`
${flexRowCenter};
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
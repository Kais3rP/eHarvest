import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter, Header3 } from '../styled-components/globalStyles';
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
        <Header3>
        {item.id}
        </Header3>
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
${flexColSpace};
width:35%;
min-width:100px;
height:350px;
text-align:center;
margin:5px;
padding:30px;
background:white;
box-shadow: 1px 2px 10px 2px grey;
&:hover{
  box-shadow: 2px 3px 10px 5px grey;
}
`

const PicContainer = styled.div`
${flexRowCenter};
width:100%;
height:60%;

`
const OfferPic = styled.img`
height:100%;
`

const ItemPrice = styled.div`
width:100%;
height:10%;
background:white;


`
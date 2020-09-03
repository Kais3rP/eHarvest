import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowCenter, Header1, Header2, Header3, Header5 } from '../styled-components/globalStyles';
import AddToCart from './AddToCart';
import circle from '../img/circle.svg'


export default function ({ item }) {

  let mimeType = "image/png";
  return (
    <ThumbnailContainer>
      <Circle src={circle}></Circle>
      <PicContainer>
        <Pic src={`data:${mimeType};base64,${item.pic}`} />
      </PicContainer>
      
      <Header3>
        {item.productName}
      </Header3>
      <Header5>Grown by: </Header5>
        <Header3>{item.sellerName}</Header3>
     
      <Header2>{item.price}€/Kg</Header2>
     
      <AddToCart item={item} />
    </ThumbnailContainer>)


}

const ThumbnailContainer = styled.div`
position:relative;
${flexColSpace};
width:25%;
min-width:100px;
height:350px;
text-align:center;
margin:5px;

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
const Pic = styled.img`
height:60%;
z-index:1;
`

const ItemPrice = styled.div`
width:100%;
height:10%;
background:white;


`

const Circle = styled.img`
position:absolute;
z-index:0;

`
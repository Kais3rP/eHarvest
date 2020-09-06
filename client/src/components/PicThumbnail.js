import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowCenter, Header1, Header2, Header3, Header5 } from '../styled-components/globalStyles';
import AddToCart from './AddToCart';
import circle from '../img/circle.svg'


export default function ({ item }) {
 
  //let mimeType = "image/png";
  return (
    <ThumbnailContainer>
      <Circle src={circle}></Circle>
      <PicContainer>
        {/*<Pic src={`data:${mimeType};base64,${item.pic}`} />*/}
        <Pic src={item.pic} />
      </PicContainer>
      <InfoContainer>
      <Header3>
        {item.productName}
      </Header3>
      <Header5>Grown by: </Header5>
        <Header3>{item.sellerName}</Header3>
     
      <Header2>{item.price}€/Kg</Header2>
     
      
      </InfoContainer>
      <AddToCart item={item} />
    </ThumbnailContainer>)


}

const ThumbnailContainer = styled.div`
position:relative;
${flexColSpace};
width:25%;
min-width:170px;
max-width:200px;
height:350px;
text-align:center;
margin:5px;
background:white;


background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  1px 1px 5px #6b6b6b, 
             -1px -1px 5px #ffffff;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
&:hover{
  box-shadow:  2px 2px 5px #6b6b6b, 
             -2px -2px 5px #ffffff;
}
`

const PicContainer = styled.div`
${flexRowCenter};
width:100%;
height:50%;



`

const InfoContainer = styled.div`
${flexColSpace};
width:100%;
height:40%;


`
const Pic = styled.img`
height:100px;
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
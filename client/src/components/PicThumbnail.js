import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rateProduct } from '../slices/shopSlice'
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowCenter, Header1, Header2, Header3, Header5 } from '../styled-components/globalStyles';
import AddToCart from './AddToCart';
import circle from '../img/circle.svg';
import { pictureSizes } from '../styled-components/inlineStyles';
import Star from 'star-rating-react-component';

let options = {
  name: 'main',
  numOfStars: 5,
  starsWidth: '15%',
  color: "#e6e6e6",
  bgColor: "white",
  borderColor: "white",
  scoreColor: "inherit",

}
export default function ({ item, idx }) {
console.log(item.rating)
  const dispatch = useDispatch();
  return (
    <ThumbnailContainer>
      <Circle src={circle}></Circle>
      <PicContainer>
        <Pic src={item.pic}/>
      </PicContainer>
      <InfoContainer>
        <Header3>
          {item.productName}
        </Header3>
        <Header5>Grown by: </Header5>
        <Header3>{item.sellerName}</Header3>
        <Header3>{item.price}€/Kg</Header3>
        
      </InfoContainer>
      <Star options={{...options, name:idx}} handleScore={(score)=>{dispatch(rateProduct({_id:item._id, score}))}}/>
      <Header3>Total Score: {item.rating} ({item.numberOfVotes})</Header3>
      <AddToCart item={item} />
      
    </ThumbnailContainer>)
}

const ThumbnailContainer = styled.div`
position:relative;
${flexColSpace};
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
width:80px;
height:170px;
@media(min-width:768px){
  width:120px;
  height:250px;
}
@media(min-width:1200px){
  width:170px;
  height:350px;
}
`

const PicContainer = styled.div`
${flexRowCenter};
width:100%;
height:40%;
`

const InfoContainer = styled.div`
${flexColSpace};
width:100%;
height:40%;
font-size:8px;
@media(min-width:768px){
font-size:10px;
}
@media(min-width:1200px){
font-size:16px;
}
`
const Pic = styled.img`
z-index:1;
height:80%;
`

const ItemPrice = styled.div`
width:100%;
height:10%;
background:white;
`

const Circle = styled.img`
position:absolute;
z-index:0;
height:40%;
`
import React, {useEffect, useState} from 'react';
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
  color: "white",
  bgColor: "#e6e6e6",
  borderColor: "white",
  scoreColor: "inherit",
  showText:false

}
export default function ({ item, idx, priv }) {
  const productRatingResponse = useSelector(state=> state.shop.productRatingResponse);
  const dispatch = useDispatch();
  const [hasBeenRated, setHasBeenRated] = useState(false);
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const [addedMessage, setAddedMessage] = useState('');
  return (
    <WrapperDiv>
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
        <Header3>Total Score: {item.rating} <Header5>({item.numberOfVotes})</Header5></Header3>
      </InfoContainer>
      <Star options={{...options, name:idx}} handleScore={(score)=>{
        dispatch(rateProduct({_id:item._id, score}));
        setHasBeenRated(true);
        setTimeout(()=> {setHasBeenRated(false)},3000)
        }}/>
      
      <AddToCart item={item} priv={priv} setHasBeenAdded={setHasBeenAdded} setAddedMessage={setAddedMessage}/>
      
    </ThumbnailContainer>
    <Message>{hasBeenRated ? productRatingResponse : hasBeenAdded ? addedMessage : null}</Message>
    
    </WrapperDiv>)
}

const WrapperDiv = styled.div`
${flexColCenter};
`
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


const Message = styled(Header5)`
text-align:center;
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
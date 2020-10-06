import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rateProduct, setProductClicked } from '../slices/shopSlice'
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowCenter, flexRowSpace, Header1, Header2, Header3, Header5 } from '../styled-components/globalStyles';
import AddToCart from './AddToCart';
import circle from '../img/circle.svg';
import { pictureSizes } from '../styled-components/inlineStyles';
import Star from 'star-rating-react-component';
import { Link, useLocation } from "react-router-dom";

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


export default function ({ item, idx }) {
  const productRatingResponse = useSelector(state=> state.shop.productRatingResponse);
  const dispatch = useDispatch();
  const [hasBeenRated, setHasBeenRated] = useState(false);
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const [addedMessage, setAddedMessage] = useState('');
  const location = useLocation();

  function scoreHandler (score){
    dispatch(rateProduct({_id:item._id, score}));
    setHasBeenRated(true);
    setTimeout(()=> {setHasBeenRated(false)},3000)
    }

  return (
    <WrapperDiv>
    <ThumbnailContainerDiv onClick={()=>{dispatch(setProductClicked(item))}}>
      <CircleImg src={circle}></CircleImg>
      <PicContainerDiv>
      <Link to={`product/${item.productName}`}>     
        <PicImg src={item.pic}/>      
      </Link>
      </PicContainerDiv> 
      <InfoContainerDiv>
        <Header3>
          {item.productName}
        </Header3>
        <Header5>Grown by: </Header5>
        <div>
        <Link to={location}>
        <Header3>{item.sellerName}</Header3>
        </Link>
        </div>
        <Header3>{item.price}€/Kg</Header3>
        <Header3>Average Rating: {item.rating}</Header3>
      </InfoContainerDiv>
      <RatingDiv>
      <Star options={{...options, name:idx}} handleScore={scoreHandler}/>
      <Header5>({item.numberOfVotes})</Header5>
      </RatingDiv>
      
      
      
      <AddToCart item={item} setHasBeenAdded={setHasBeenAdded} setAddedMessage={setAddedMessage}/>
    </ThumbnailContainerDiv>
    <MessageH5>{hasBeenRated ? productRatingResponse : hasBeenAdded ? addedMessage : null}</MessageH5>
    </WrapperDiv>)
}

const WrapperDiv = styled.div`
${flexColCenter};
`
const ThumbnailContainerDiv = styled.div`
position:relative;
${flexColSpace};
text-align:center;
margin:5px;
background:white;
background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  1px 1px 5px #6b6b6b, 
             -1px -1px 5px #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
&:hover{
  box-shadow:  2px 2px 5px #6b6b6b, 
             -2px -2px 5px #ffffff;
}
width:80px;
height:170px;
font-size:7px;
@media(min-width:768px){
  width:120px;
  height:250px;
  font-size:10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}
@media(min-width:1200px){
  width:170px;
  height:350px;
  font-size:16px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}
`

const PicContainerDiv = styled.div`
${flexRowCenter};
width:100%;
height:35%;

`

const InfoContainerDiv = styled.div`
${flexColCenter};
width:100%;
height:30%;
`
const RatingDiv = styled.div`
${flexRowCenter};
height:10%;
width:100%;
`
const PicImg = styled.img`
z-index:1;
height:80%;
`


const CircleImg = styled.img`
position:absolute;
z-index:0;
height:35%;
`


const MessageH5 = styled(Header5)`
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

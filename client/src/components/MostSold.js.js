
import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import PicThumbnail from './PicThumbnail.js';
import { useSelector, useDispatch } from 'react-redux';



export default function ({mostSold}) {
  
  return (
    <MostSoldWrapper>
      <ProductsTitle>MOST SOLD</ProductsTitle>
     <PicThumbnailContainer> {mostSold.map((item, i) => (<PicThumbnail key={i} item={item} idx={i+100} />))}</PicThumbnailContainer>
    </MostSoldWrapper>
  )
}




const MostSoldWrapper = styled.div`
${flexColSpace};
width:98%;
text-align:center;
`


const ProductsTitle = styled.div`
width:100%;
height:10%;


`
const PicThumbnailContainer = styled.div`
${flexRowCenter};
width:100%;
height:90%;
flex-wrap:wrap;
`
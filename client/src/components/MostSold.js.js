
import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import PicThumbnail from './PicThumbnail.js';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';


export default function () {
  const mostSold = useSelector(state => state.shop.mostSoldItems)
  return (
    <MostSoldWrapper>
      <ProductsTitle>MOST SOLD</ProductsTitle>
      {mostSold ? mostSold.length > 0 ? <PicThumbnailContainer> {mostSold.map((item, i) => (<PicThumbnail key={i} item={item} />))}</PicThumbnailContainer>
        :
        <Loader
          type="TailSpin"
          color="black"
          height={50}
          width={50}
          timeout={6000} //6 secs
        />
        : null
      }
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
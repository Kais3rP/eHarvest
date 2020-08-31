import React from 'react';
import styled from 'styled-components';
import { flexColSpace, flexColCenter, flexRowSpace, flexRowCenter } from '../styled-components/globalStyles';
import Offers from './Offers';
import ProductsPreview from './ProductsPreview';

export default function () {
    return (
        <MidSectionWrapper>
            <Offers />
            <ProductsPreview />
        </MidSectionWrapper>

    )
}

const MidSectionWrapper = styled.div`
${flexColCenter};
width:100%;
background:white;
text-align:center;
margin-top:200px;
`


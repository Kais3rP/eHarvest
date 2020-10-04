import React, { useEffect, useState } from 'react';
import { Input, ButtonAlt, ValidHeader, InvalidHeader, flexColCenter, flexRowCenter, flexRowSpace, TextArea, Select, Header3 } from '../styled-components/globalStyles';
import { Link, Redirect } from "react-router-dom";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, fetchRegisterProduct, asyncUploadProductPicture } from '../slices/shopSlice';
import handleAutoResize from '../helpers/autoResizeTextArea';
import validateTextArea from '../helpers/validateTextArea';
import OptionsMenu from './OptionsMenu'




export default function () {

    const dispatch = useDispatch();
    const productRegistrationResponse = useSelector(state => state.shop.productRegistrationResponse);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const [productType, setProductType] = useState('Fruit');
    const [lengthOfText, setLengthOfText] = useState(0);
    const [hasRegistered, setHasRegistered] = useState(false);
    const [productPic, setProductPic] = useState('');
    const [isNewPicUploaded, setIsNewPicUploaded] = useState('');

    function onSubmit(ev) {
        ev.preventDefault();
        const productPicName = `productpic_${new Date().getTime()}`;
        //Set the object to add to db with the name of the picture
        const productObject = new URLSearchParams([...new FormData(ev.target).entries(), ['productPicName', productPicName]]); //This spreads the form key-value pairs and puts them in a format sendable with a www-url-encoded mime-type
        setIsNewPicUploaded(true);
        //Set the picture as formdata
        const data = new FormData();
        if (productPic instanceof Blob) {
            data.append('product-picture', productPic, 'product-picture');
            dispatch(fetchRegisterProduct(productObject));
            dispatch(asyncUploadProductPicture({ productPic: data, name: productPicName }));
            setHasRegistered(true);
        }
    }

    function textAreaOnChange(ev) {
        validateTextArea(ev);
        handleAutoResize(ev);
        setLengthOfText(ev.target.value.length);
    }

    function fileInputOnChange(ev) {
        setProductPic(ev.target.files[0]);
    }
    const options = {
        Fruit: ['Oranges', 'Apples', 'Bananas', 'Kiwis', 'Lemons', 'Peaches', 'Pomegranates', 'Strawberries', 'Watermelons'],
        Vegetables: ['Broccoli', 'Cabbages', 'Carrots', 'Cauliflowers', 'Corn', 'Cucumbers', 'Eggplant', 'Potatoes', 'Pumpkins', 'Red Chili Peppers', 'Red Peppers', 'Salad', 'Tomatoes']
    }
    return (
        <FormWrapperDiv>
            <Form onSubmit={onSubmit}>
                <OptionsMenu options={options} />
                <FormElementWrapperDiv>
                    <FormInput type='text' pattern='\d+.\d\d' placeholder='Price in € per Kg' name='price' required></FormInput>
                    <Label>Type the price of your product eg. 1.50</Label>
                </FormElementWrapperDiv>
                <FormElementWrapperDiv>
                    <FormInput type='text' pattern='\d{1,3}' placeholder='Amount of Kg available for selling' name='quantityAvailable' required></FormInput>
                    <Label>Type the amount of Kg of the product you have now readily available to sell</Label>
                </FormElementWrapperDiv>
                <FormElementWrapperDiv>
                    <FormTextArea
                        type='text'
                        placeholder={'Insert the description of your product here'}
                        name='description' rows={4}
                        onChange={textAreaOnChange}
                        required>
                    </FormTextArea>
                    <Label>{`Actual: ${lengthOfText}. `}Type here the description of your product min. 100, max. 500 characters</Label>
                </FormElementWrapperDiv>
                <FormElementWrapperDiv>
                    <FileInput type="file" onChange={fileInputOnChange} name="product-picture" accept="image/*" required></FileInput>
                    <Label>{`Upload the image of your product, the file must be a *.jpg/png file not bigger than 2MB`}</Label>
                </FormElementWrapperDiv>
                <ButtonAlt type="submit">Register the product!</ButtonAlt>
            </Form>

            {isNewPicUploaded ? <ProductPicPreviewImg src={URL.createObjectURL(productPic)} alt='Product' /> : null}
            {hasRegistered ? <Redirect to='/' /> : null}
        </FormWrapperDiv>);

}





const FormWrapperDiv = styled.div`
${flexColCenter};
width:100%;
margin-top:300px;
@media (max-width:768px){
    justify-content:flex-start;
    margin-top:10px;
}
`

const Form = styled.form`
${flexColCenter};
justify-content:flex-start;
width:60%;
background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 13px #6b6b6b, 
             -5px -5px 13px #ffffff;
             padding:20px;
             @media (max-width:768px){
  
    width:100%;
}
`
const FormElementWrapperDiv = styled.div`
${flexRowSpace};
width:100%;
`

const FormInput = styled(Input)`
width:50%;
`
const FormTextArea = styled(TextArea)`
width:50%;

`

const Label = styled.label`
font-size:14px;
width:50%;
`

const FileInput = styled(Input)`
    width:50%;
    `

const ProductPicPreviewImg = styled.img`

width:80%;
`
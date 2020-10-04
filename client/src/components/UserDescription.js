import React, { useState } from 'react';
import styled from 'styled-components';
import { TextArea, Header3, ButtonAlt } from '../styled-components/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDataUpdate } from '../slices/userSlice';
import handleAutoResize from '../helpers/autoResizeTextArea';


export default function () {
    const personalData = useSelector(state => state.user.personalData);
    const [isEditDescriptionMode, setIsEditDescriptionMode] = useState(false);
    const [descriptionText, setDescriptionText] = useState(personalData.description);
    const dispatch = useDispatch();
    function onChange(ev) {
        handleAutoResize(ev);
        setDescriptionText(ev.target.value);
    }

    function onClick() {
        if (isEditDescriptionMode) {
            dispatch(fetchUserDataUpdate({ ...personalData, description: descriptionText }))
            setIsEditDescriptionMode(false);
        }
        else setIsEditDescriptionMode(true)
    }
    return (
        <>
            <Header3>Your personal description as a seller:</Header3>
            <DescriptiontextP>{personalData.description}</DescriptiontextP>
            {isEditDescriptionMode ?
                <DescriptionTextArea
                    onChange={onChange}
                    value={descriptionText} />
                : null}
            <ButtonAlt onClick={onClick}>
                {isEditDescriptionMode ? 'Submit Changes' : 'Edit Description'}
            </ButtonAlt>
        </>

    )
}

const DescriptionTextArea = styled(TextArea)`
width:100%;
`

const DescriptiontextP = styled.p`
`

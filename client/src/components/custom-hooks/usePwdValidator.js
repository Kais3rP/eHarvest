import { useState } from 'react';

export default function () {

    const [isValidPwd, setIsValidPwd] = useState(false);
    const [validationParams, setValidationsParams] = useState({});
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isPwdCheckerOpen, setPwdCheckerOpen] = useState(false);

    const commonProps = {
        onBlur: () => { setPwdCheckerOpen(false) },
        onFocus: () => { setPwdCheckerOpen(true) },
        placeholder: 'Password',
        type: 'password',
        name: "password",
        required: 'true'
    }
    function checkPwd(password) {
        const lowerCaseLetters = /[a-z]/g;
        const upperCaseLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;
        const isLowerCase = password.match(lowerCaseLetters);
        const isUpperCase = password.match(upperCaseLetters);
        const isNumber = password.match(numbers);
        const isLongEnough = password.length >= 8;

        setValidationsParams({
            isLowerCase,
            isUpperCase,
            isNumber,
            isLongEnough
        })
        setIsValidPwd(
            isLowerCase &&
            isUpperCase &&
            isNumber &&
            isLongEnough);
    }

    function passwordOnChange(ev) {
        setPassword(ev.target.value);
        checkPwd(ev.target.value);
    }

    function passwordCheckOnChange(ev) {
        setPasswordCheck(ev.target.value);
    }

    return {
        isPwdCheckerOpen,
        isValidPwd,
        validationParams,
        password,
        passwordCheck,
        pwdProps: {
            onChange: passwordOnChange,
            ...commonProps
        },
        pwdCheckProps: {
            onChange: passwordCheckOnChange,
            ...commonProps
        }
    }
}
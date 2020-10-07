import { useState } from 'react';

export default function () {
    const [isValidName, setIsValidName] = useState(false);
    const [isValidSurname, setIsValidSurname] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPwd, setIsValidPwd] = useState(false);
    const [validationParams, setValidationsParams] = useState({});
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isPwdCheckerOpen, setPwdCheckerOpen] = useState(false);

    const commonPwdProps = {
        onBlur: () => { setPwdCheckerOpen(false) },
        onFocus: () => { setPwdCheckerOpen(true) },
        placeholder: 'Password',
        type: 'password',
        name: "password",
    }

    const nameProps = {
        placeholder: 'Name',
        type: 'text',
        name: "name",

    }
    const surnameProps = {
        placeholder: 'Surname',
        type: 'text',
        name: "surname",

    };
    const emailProps = {
        placeholder: 'E-mail',
        type: 'email',
        name: "email",

    }

    function checkText(text) {
        const regexp = /^[A-Z][a-z]{2,12}$/;
        return regexp.test(text);
    }
    function checkName(name) {
        setIsValidName(checkText(name));
    }

    function checkSurname(surname) {
        setIsValidSurname(checkText(surname))
    }

    function checkEmail(email) {
        const regexp = /^[a-z\.\-_]+@[a-z\.\-_]+.[a-z]$/;
        setIsValidEmail(regexp.test(email));
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

    function nameOnChange(ev) {
        checkName(ev.target.value)
    }

    function surnameOnChange(ev) {
        checkSurname(ev.target.value)
    }

    function emailOnChange(ev) {
        checkEmail(ev.target.value)
    }

    function passwordOnChange(ev) {
        setPassword(ev.target.value);
        checkPwd(ev.target.value);
    }

    function passwordCheckOnChange(ev) {
        setPasswordCheck(ev.target.value);
    }

    function resetValidators() {
        setIsValidName(false);
        setIsValidSurname(false);
        setIsValidEmail(false);
        setIsValidPwd(false);
        setValidationsParams({});
        setPassword('');
        setPasswordCheck('');
    }

    return {
        isPwdCheckerOpen,
        isValidName,
        isValidSurname,
        isValidEmail,
        isValidPwd,
        validationParams,
        password,
        passwordCheck,
        resetValidators,

        nameProps: {
            onChange: nameOnChange,
            ...nameProps
        },
        surnameProps: {
            onChange: surnameOnChange,
            ...surnameProps
        },
        emailProps: {
            onChange: emailOnChange,
            ...emailProps
        },
        pwdProps: {
            onChange: passwordOnChange,
            ...commonPwdProps
        },
        pwdCheckProps: {
            onChange: passwordCheckOnChange,
            ...commonPwdProps
        }
    }
}
export function checkPwd(pwdText, setIsLowerCase, setIsUpperCase, setIsNumber, setIsLongEnough) {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (pwdText.match(lowerCaseLetters)) {
       setIsLowerCase(true);
    } else {
       setIsLowerCase(false);
    }
 
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (pwdText.match(upperCaseLetters)) {
       setIsUpperCase(true);
    } else {
       setIsUpperCase(false);
    }
 
    // Validate numbers
    var numbers = /[0-9]/g;
    if (pwdText.match(numbers)) {
       setIsNumber(true);
    } else {
       setIsNumber(false);
    }
 
    // Validate length
    if (pwdText.length >= 8) {
       setIsLongEnough(true);
    } else {
       setIsLongEnough(false);
    }
 }
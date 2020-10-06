export function validatePwd(pwd, pwdConfirmDOMElem) {
    if (pwd !== pwdConfirmDOMElem.value) {
       pwdConfirmDOMElem.setCustomValidity("Passwords Don't Match");
    } else {
       pwdConfirmDOMElem.setCustomValidity('');
    }
 }
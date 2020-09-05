export function validatePwd(pwd, pwdConfirm) {
    if (pwd !== pwdConfirm.value) {
       pwdConfirm.setCustomValidity("Passwords Don't Match");
    } else {
       pwdConfirm.setCustomValidity('');
    }
 }
$(document).ready(function () {
    function ValidateEmail(inputText) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.value.match(mailformat)) {
            alert("Valid email address!");
            document.mail.email.focus();
            return true;
        }
        else {
            alert("You have entered an invalid email address!");
            document.mail.email.focus();
            return false;
        }
    }
});

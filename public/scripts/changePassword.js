var changePasswordBtn = document.getElementById('changePassword')
var changePasswordContainer = document.getElementById('changePasswordContainer')
var newPass = document.getElementById('newPass')
var confirmPass = document.getElementById('confirmPass')
var submitBtn = document.getElementById('submitBtn')
var form = document.getElementById('form')
var message = document.getElementById('msg')

setTimeout(function () {
    message.style.display = 'none'
}, 3000)

changePasswordBtn.addEventListener('click', onPasswordChange)
form.addEventListener('submit', onFormSubmit)

function onPasswordChange() {
    newPass.style.display = 'block';
    confirmPass.style.display = 'block';
    submitBtn.style.display = 'block';
}

function onFormSubmit(event) {
    if (newPass.value != confirmPass.value) {
        alert('passwords do not match')
        event.preventDefault();
    }
    else {
        form.submit();
    }
}

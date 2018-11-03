document.addEventListener('DOMContentLoaded', () => {
    const socket = io(window.location.href);
    document.querySelector('#code-form').addEventListener('submit', sendCode);
    function sendCode(e) {
        e.preventDefault();
        let eneteredCode = document.querySelector('#code').value;
        if (eneteredCode.length == 4) {
            socket.emit('code', {
                code: eneteredCode
            });

        }
        document.querySelector('#code').value = '';
    }

    socket.on('incorectCode', data => {
        document.querySelector('.error-msg').innerHTML = data;
        document.querySelector('#error').classList.remove('hide');
        document.querySelector('.error-msg').classList.remove('shake');
        setTimeout(()=>{
            document.querySelector('.error-msg').classList.add('shake');
        },2);
    })
})


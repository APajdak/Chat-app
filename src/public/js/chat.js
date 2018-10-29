document.addEventListener('DOMContentLoaded', ()=>{
    const socket = io();
    let url = /(?<=chat\/).*/.exec(window.location.href)[0];
    document.querySelector('#code-form').addEventListener('submit', sendCode);

    function sendCode(e){
        e.preventDefault();
        let eneteredCode = document.querySelector('#code').value;
        if(eneteredCode.length == 4){
            socket.emit("code", {
                code: eneteredCode,
                token: url
            });

        }
        document.querySelector('#code').value = '';
    }
})


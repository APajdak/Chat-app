document.addEventListener('DOMContentLoaded', ()=>{
    const socket = io(window.location.href);
    //let url = /(?<=chat\/).*/.exec(window.location.href)[0];
    document.querySelector('#code-form').addEventListener('submit', sendCode);

    function sendCode(e){
        e.preventDefault();
        let eneteredCode = document.querySelector('#code').value;
        if(eneteredCode.length == 4){
            socket.emit('code', {
                code: eneteredCode
            });

        }
        document.querySelector('#code').value = '';
    }

    socket.on('hello', data=>{
        console.log(data);
    })
})


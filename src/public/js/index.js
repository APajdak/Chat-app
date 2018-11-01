document.addEventListener('DOMContentLoaded', ()=>{
    const socket = io('/index');
    let roomId;
    socket.on('room', room =>{
        roomId = room
    });
    document.querySelector('#inv').addEventListener('click', createInvitation);

    function createInvitation(){
        let userNameInput = document.querySelector('#usr');
        if(userNameInput.value){
            socket.emit('createInvitation', {
                room: roomId,
                userName: userNameInput.value,
                code: document.querySelector('#code').innerHTML
            });
            userNameInput.value = "";
        }
    }
})


    function createInv(response){
        let url = new URL(`/chat?token=${response.url}`, 'http://127.0.0.1:3000');
        let li = $(`<li data-url=""></li>`);
        let span =$(`<span class="user">${response.user}</span>`);
        let inpt = $(`<input type="text" value="${url}"></input>`);
        let cpy =$(`<button class="cpy"></button>`);
        let del =$(`<button class="del"></button>`);
        li.append(span);
        li.append(inpt);
        li.append(cpy);
        li.append(del);
        $('#links').append(li);
        setCopyEvent();
    }

    function setCopyEvent(){
        let btns = $('.cpy');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function(){
                let url = this.previousSibling;
                url.select();
                document.execCommand("copy");
                this.parentNode.removeChild(this.previousSibling);
                this.parentNode.removeChild(this);
            })
            
        }
    }


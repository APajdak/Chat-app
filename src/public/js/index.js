document.addEventListener('DOMContentLoaded', () => {
    const socket = io('/index');
    let roomId;
    socket.on('room', room => {
        roomId = room
    });

    document.querySelector('#inv').addEventListener('click', createInvitation);

    function createInvitation() {
        let userNameInput = document.querySelector('#usr');
        if (userNameInput.value) {
            socket.emit('createInvitation', {
                room: roomId,
                userName: userNameInput.value,
                code: document.querySelector('#code').innerHTML
            });
            userNameInput.value = "";
        }
    }

    socket.on('token', data => {
        let url = new URL(`/chat?token=${data.url}`, window.location.href);
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.classList.add('user');
        span.innerHTML = data.user;
        let wrapper = document.createElement('div');
        wrapper.classList.add("wrapper")
        let input = document.createElement('input');
        input.type = "text";
        input.value = url;
        let copy = document.createElement('div');
        copy.classList.add('copy');
        copy.innerHTML = "Copy";
        li.append(span);
        wrapper.append(input)
        wrapper.append(copy);
        li.append(wrapper);
        document.querySelector('#links').append(li);
        setCopyEvent();
    });
    function setCopyEvent() {
        let btns = document.querySelectorAll('.copy');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                for (let j = 0; j < btns.length; j++) {
                    btns[j].classList.remove('ac');
                }
                let url = this.previousSibling;
                url.select();
                document.execCommand("copy");
                this.classList.add('ac');
            })

        }
    }
})


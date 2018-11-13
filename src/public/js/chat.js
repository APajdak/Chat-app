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

    socket.on('incorrectCode', data => {
        document.querySelector('.error-msg').innerHTML = data;
        document.querySelector('#error').classList.remove('hide');
        document.querySelector('.error-msg').classList.remove('shake');
        setTimeout(() => {
            document.querySelector('.error-msg').classList.add('shake');
        }, 100);
    });

    socket.on('joinToChat', () => {
        document.querySelector('.chat-container').classList.remove('blur');
        document.querySelector('#secret').classList.add('hide');
        document.querySelector('#message-input').removeAttribute('disabled')

        document.querySelector('#message-form').addEventListener('submit', (e) => {
            e.preventDefault();
            let msg = document.querySelector('#message-input').value;
            socket.emit('message', msg);
            document.querySelector('#message-input').value = "";
        });
    });

    socket.on('messageToOwner', data => {
        message('owner', data);
    });
    socket.on('messageToUsers', data => {
        message('users', data);
    });

    function message(to, data) {
        let li = document.createElement('li');
        let div = document.createElement('div');
        let p = document.createElement('p');
        p.innerText = data.msg;
        p.style.backgroundColor = data.color;
        let timeSpan = document.createElement('span');
        timeSpan.classList.add('time');
        timeSpan.innerText = data.sendedAt;
        let userNamespan;
        let spansDiv;
        div.append(p);
        if (to === 'owner') {
            li.classList.add('owner-message');
            div.classList.add('owner');
            spansDiv = document.createElement('div');
            spansDiv.append(timeSpan);
            div.append(spansDiv);
        } else {
            userNamespan = document.createElement('span');
            userNamespan.innerText = data.from;
            div.append(userNamespan);
            div.append(timeSpan);
        }
        li.append(div);
        document.querySelector('#message-list').append(li);
        scrollChatWindow();
    }

    socket.on('updateUsersList', data => {
        let userList = document.querySelector('#users');
        while (userList.firstChild) {
            userList.removeChild(userList.firstChild);
        }
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li');
            li.classList.add("user-li");
            li.innerText = data[i].name;
            li.style.backgroundColor = data[i].color;
            userList.appendChild(li);
        }

    })

    function scrollChatWindow() {
        document.querySelector('#message-list').scrollTop = document.querySelector('#message-list').scrollHeight;
    }
});

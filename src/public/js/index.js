$(function () {
    let room;
    $.ajax({
        url: `/roomID`,
        type: 'GET',
    }).done(function (response) {
        room = response;
    }).fail(function (error) {
        console.log(error);
    });

    $('#inv').on('click', function () {
        if ($('#usr').val()) {
            $.ajax({
                url: `/createInv`,
                type: 'POST',
                data: {
                    room: room,
                    userName: `${$('#usr').val()}`,
                    code: `${$('#code').html()}`
                }
            }).done(function (response) {
                createInv(response);
            }).fail(function (error) {
                console.log(error);
            });
        }
        $('#usr').val('');
    });

    function createInv(response){
        let url = new URL(`/chat/${response.url}`, 'http://127.0.0.1:3000');
        console.log(url);
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

});

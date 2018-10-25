$(function(){

    $('#inv').on('click', function(){
        if($('#usr').val()){
            $.ajax({
                url:	`/createInv`,
                type:	'POST',
                data:   {
                    userName: `${$('#usr').val()}`,
                    code: `${$('#code').html()}`
                }
                }).done(function(response){
                        console.log("serwer");
                }).fail(function(error){
                        console.log(error);
            });
        }
	});

});
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
                    createLink(response);
                        console.log(response);
                }).fail(function(error){
                        console.log(error);
            });
        }
    });
    
    function createLink(response){
        
    }

});
$(document).ready(function(){

    $('#login').ajaxForm({

        success : function(responseText, status, xhr, $form){
            if (status == 'success') window.location.href = '/chat';
        }
    });
    $('#user-tf').focus();
})
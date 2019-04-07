/*
 * # ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * # File: button_handler.js
 * # Project: panel.lakon.app
 * # File Created: Friday, 21st September 2018 3:01:25 pm
 * # 
 * # Author: Arif Dzikrullah
 * #         ardzix@hotmail.com>
 * #         https://github.com/ardzix/>
 * # 
 * # Last Modified: Friday, 21st September 2018 3:01:25 pm
 * # Modified By: arifdzikrullah (ardzix@hotmail.com>)
 * # 
 * # Hand-crafted & Made with Love
 * # Copyright - 2018 Lakon, lakon.app
 * # ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */


    // Script to include csrf on post method
    function csrfSafeMethod(method) {

        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Script for deleting data

    $(document).on("click", ".datatable-delete-button", function(){
        var id = $(this).attr("data-id")

        var r = confirm("You are about to delete this data.. Click OK if you sure!!");
        if (r == true) {
            $.ajax({
                url: window.location.href,
                data: { id: id} ,
                type: 'DELETE',
                success: function(result) {
                    location.reload();
                }
            });
        } else {

        }
    })

    function back(){
        document.location="{% url 'post:index' %}"
    }

    function create_new(){
        var url = window.location.href+"form/"
        url = url.replace("#", "")
        url = url.replace("_=_", "")
        window.location.replace(url)
    }
    var touchtime = 0;
    var second_touch = false;
    var can_be_clicked = false;
    $(document).on("click", ".datatable-edit-button", function(){
        var id = $(this).attr("data-id")
        var url = window.location.href+"form/?edit="+id
        url = url.replace("#", "")
        url = url.replace("_=_", "")
        if (touchtime!=0){
            touchtime = new Date().getTime();
            if(((new Date().getTime())-touchtime) < 500) {
                second_touch = true;        
            }
        }

        if(second_touch && touchtime){
            window.open(url, '_blank');
            can_be_clicked = false        
        }else{
            can_be_clicked = true        
        }

        touchtime = new Date().getTime();        
        setTimeout(function(){
            touchtime = 0;
            second_touch = false
            if (can_be_clicked){
                window.location.replace(url)    
            }
        }, 500);
    })


    $('#datatable').on( 'draw.dt', function () {
        $('[data-toggle="tooltip"]').tooltip()
    } );
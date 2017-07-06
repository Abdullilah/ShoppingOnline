/* Start make all thumbnail with same height ... Cheack CSS code */
function equalHeight(group) {    
    var tallest = 0;    
    group.each(function() {       
        var thisHeight = $(this).height();       
        if(thisHeight > tallest) {          
            tallest = thisHeight;       
        }    
    });    
    group.each(function() { $(this).height(tallest); });
} 
/* End make all thumbnail with same height ... Cheack CSS code */

$(document).ready(function() {   
    equalHeight($(".thumbnail")); 
    var costs = new Array();
    function btnClicked() {
        var number = $(this).siblings('input').val();
            var name = $(this).parents('.thumbnail').find('h3').html();
            var price = $(this).parents('.thumbnail').find('.price').html().replace('$','');

            var newItem = $("<li class=''></li>"); 
            var newName = $("<h4></h4>").text(name + ' $' + price*number); 
            var newPrice = $("<p></p>").text('Price: $' + price); 
            var newNumber = $("<p></p>").text('Number: ' + number);

            newItem.append(newName);
            newItem.append(newPrice);
            newItem.append(newNumber);
            $('.orderedItems > ul li:nth-child(1)').before(newItem);

            costs.push(price*number);

            // summasion array
            var sum = costs.reduce((a, b) => a + b, 0);
            $('.total').text('$' + sum);
            $("input[type=hidden][name=price]").val(sum);
            if($('.total').text() !== '$0'){
                $('.buyNow').css('display','inline-block');
            }
            //console.log($('.orderedItems ul').parent().parent());
            console.log($('.orderedItems ul').height()  );
            if($('.orderedItems ul').height() < ($(window).height()-100) && $(window).width() > 767) {
                $('.sidebar-offcanvas').css("position","fixed");
                //console.log("hi");
            } else{
                $('.sidebar-offcanvas').css("position","absolute");
            }
    }
        
    $(window).resize(function() {
      if($('.orderedItems ul').height() < ($(window).height()-100) && $(window).width() > 767){
            $('.sidebar-offcanvas').css("position","fixed");
        } else{
            $('.sidebar-offcanvas').css("position","absolute");
        }
    });

//    $("#navbar ul li").click(function(){
//        $(this).attr("class","active").siblings().removeClass("active");
//    });
    
    $("#navbar ul li a").click(function(){
        $(this).parent().attr("class","active").siblings().removeClass("active");
        $.ajax({
            url:$(this).attr("href"),
            success: function(response) {
                $("#mainSection").html($(response));
                equalHeight($(".thumbnail")); 
                $("a.addBtn").on("click", btnClicked);
            }
        });
        return false;
    });
});



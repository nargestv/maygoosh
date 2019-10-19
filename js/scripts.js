//fullScreenContainer();


/* =========================================
 * full screen intro
 *  =======================================*/

/*function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";
    var screenHeight = '';
    if ($(window).width() > 1000) {
        screenHeight = $(window).height() + "px";
    }
    else {
        screenHeight = "auto";
    }


    $("#intro, #intro .item").css({
        width: screenWidth,
        height: screenHeight
    });
}*/



/* ajax contact form */

function contactForm() {
    $("#contact-form").submit(function () {

        var url = "contact.php"; // the script where you handle the form input.

        $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(), // serializes the form's elements.
            success: function (data)
            {
                var messageAlert = 'alert-' + data.type;
                var messageText = data.message;
                var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable animated bounceIn"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $('#contact-form').find('.messages').html(alertBox);
                }
            }
        });
        return false; // avoid to execute the actual submit of the form.
    });
}

$(document).ready(function(){

    var answers =[], answer,cnt=0;
    const pages = new Pageable("#container");

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity','1');
    });

    $('#btn-start a').bind('click', function (e) {
        $('.dialog-top-center img').hide();
        $('#question-top-center1').show();
        $('#answers-top-re1').show();
    });

    $('.first-q a').bind('click', function (e) {
        $('#question-top-center1').hide();
        $('#answers-top-re1').hide();
        $('#question-top-center2').show();
        $('#answers-top2').show();
        answer = $(this).attr('id');
        var qs = answer.split('-');
        var ans = qs[1];
        if(ans === '1'){
            cnt++;
            answers.push(cnt);
        }
        return answers;
    });

    $('.second-q a').bind('click', function (e) {
        $('#question-top-center2').hide();
        $('#answers-top2').hide();
        $('#question-top-center3').show();
        $('#top3').show();
        answer = $(this).attr('id');
        var qs = answer.split('-');
        var ans = qs[1];
        if(ans === '2'){
            cnt++;
            answers.push(cnt);
        }
        return answers;
    });
    $('.third-q a').bind('click', function (e) {
        answer = $(this).attr('id');
        var qs = answer.split('-');
        var ans = qs[1];

        if(ans === '3'){
            cnt++;
            answers.push(cnt);
        }

        //resultAnswers();
        pages.scrollToAnchor("#page-6");

        var lnt = answers.length;
        var result = Math.round((lnt / 3 )*100);
        $('.result-page').html(result + '%');
        $(".progress-bar").data("percent",result);
        $(".progress-bar").loading();

        return answers;
    });

    $('.result-page-butt a').bind('click', function (e) {

            var lnt = answers.length;
            var result = Math.round((lnt / 3 )*100);
            $('.result-page').html(result + '%');
            $(".progress-bar").data("percent",result);
            $(".progress-bar").loading();

    });

    function resultAnswers () {
        console.log(answers);
        if(answers.length > 2){
            var lnt = answers.length;
            var result = (lnt / 3 )*100;
            $('.result-page').html(result + '%');
        }
    }
    // change the value below from 80 to whichever percentage you want it to stop at.
    perCirc($('#sellPerCirc'), 80);

    function perCirc($el, end, i) {
        if (end < 0)
            end = 0;
        else if (end > 100)
            end = 100;
        if (typeof i === 'undefined')
            i = 0;
        var curr = (100 * i) / 360;
        $el.find(".perCircStat").html(Math.round(curr) + "%");
        if (i <= 180) {
            $el.css('background-image', 'linear-gradient(' + (90 + i) + 'deg, transparent 50%, #ccc 50%),linear-gradient(90deg, #ccc 50%, transparent 50%)');
        } else {
            $el.css('background-image', 'linear-gradient(' + (i - 90) + 'deg, transparent 50%, #00cc00 50%),linear-gradient(90deg, #ccc 50%, transparent 50%)');
        }
        if (curr < end) {
            setTimeout(function () {
                perCirc($el, end, ++i);
            }, 1);
        }
    }

    $('.answers-top-re333 a').bind('click', function (e) {
        answer = $(this).attr('id');
        var qs = answer.split('-');
        var ans = qs[1];
        var cnt;
        answers.push(ans);
        if((ans) === '1'){
            cnt++;
        }
        var correct_answer = ['1','2','3'];
       // var correct_answer = ['q1-1','q2-2','q3-3'];
        var objMap;
        if((answers.length) >2){
            objMap = differenceOf2Arrays(answers ,correct_answer );
            console.log(objMap);
            /*$.each(answers, function(i, item) {
                console.log(item);

            });

            answers.forEach((e1)=>correct_answer.forEach((e2)=> {if(e1 === e2){
                objMap[e1]=objMap[e1]+1||1 ;
                }
                }
            ));
            console.log(Object.keys(objMap).map(e=>Number(e)));*/
        }
    });

    function differenceOf2Arrays (array1, array2) {

        const temp = [];
        array1 = array1.toString().split(',').map(Number);
        array2 = array2.toString().split(',').map(Number);
        console.log(array1);
        for (var i in array1) {
            if(!array2.includes(array1[i])) temp.push(array1[i]);
        }
        for(i in array2) {
            if(!array1.includes(array2[i])) temp.push(array2[i]);
        }
        return temp.sort((a,b) => a-b);
    }

    //result();
});

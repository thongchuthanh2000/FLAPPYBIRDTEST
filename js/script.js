$(function(){
    //Init Object
    var container = $("#container");
    var bird = $("#bird");

    var pole = $("#pole");
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');

    var score = $('#score');

    //Convert
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10; 

    //Status
    var go_up = false;
    var score_updated = false;
    var game_over = false;


    function playgame(){
        var the_game= setInterval(function(){
            if (collision(bird,pole_1)||
                collision(bird,pole_2)||
                parseInt(bird.css('top')) <= 0 ||
                parseInt(bird.css('top')) > container_height-bird_height
            ){
                stop_the_game();   
            }
            else{
                var pole_current_position = parseInt(pole.css('right'));

                if (pole_current_position>container_width-bird_left){
                    if (score_updated===false){
                        score.text(parseInt(score.text())+1);
                        score_updated=true;
                    }
                }

                if (pole_current_position > container_width){
                    var new_height = parseInt(Math.random()*100);

                    pole_1.css('height', pole_initial_height + new_height);
                    pole_2.css('height', pole_initial_height - new_height);

                    score_updated = false;
                    pole_current_position =pole_current_position;
                }

                pole.css('right',pole_current_position+speed);

                if (go_up===false){
                    go_down();
                }
            }
        },40);
    }

    $('container').mouseup(function(e){
        clearInterval(go_up);
        go_up=false;
    });
    $('container').mousedown(function(e){
        go_up= setInterval(up(),40);
    });

    $('#play_btn').click(function() {
        playgame(); 
        $(this).hide(); 
   });    
    function go_down(){
        bird.css('top',parseInt(bird.css('top')+10));
        bird.css('transform','rotate(50deg)');
    }

    function up(){
        bird.css('top', parseInt(bird.css('top')) - 20);
        bird.css('transform', 'rotate(-10deg)');
    }

    function stop_the_game(){
        clearInterval(playgame());
        game_over=true;
        $('#replay_btn').slideDown();
    }

    $('#replay_btn').click(function(){
        location.reload();
    });

    function collision($div1, $div2){

        //Get [x,y] of div1
        var x1= $div1.offset().left;
        var y1= $div1.offset().top;

        //Distance height of (margin + padding + content)
        var h1= $div1.outerHeight(true);
        var w1= $div1.outerWidth(true);

        //Max height of bird vs pole
        var b1=y1+h1;
        //Max width
        var r1=x1+w1;


        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;


        //Collision
        if (b1<y2 || y2>b2 ||r1<x2 ||x1>r2){
            return false;
        }else{
            return true;
        }

    }
});
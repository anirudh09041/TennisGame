var canvas;
    var canvasContext;
    var ballX = 50, ballY = 50, ballSpeedX = 3, ballSpeedY = 3;
    var paddle1Y = 250;
    var paddle2Y = 250; 
    const PADDLE_HEIGHT = 100;
    const PADDLE_THICKNESS = 10;
    const WINNING_SCORE = 5;
    var playerScore1 = 0;
    var playerScore2 = 0;

    function calculateMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.left - root.scrollTop;
        return {
            x: mouseX,
            y: mouseY
        };
  
    }


    window.onload = function() {
        console.log("game started");
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');

        var framesPerSecond = 120;
        setInterval(function() { 
            moveEverything();
            drawEverything(); 
        },1000/framesPerSecond);
        //setInterval calls the funtion repeatedly after regular interval mentioned
        canvas.addEventListener('mousemove', function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
        });
    }

    function ballReset() {

        if(playerScore1 >= WINNING_SCORE || playerScore2 >= WINNING_SCORE) {
            playerScore1 = 0;
            playerScore2 = 0;
        }
        
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width/2;
        ballY = canvas.width/2;
    }

    function computerMovement() {
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY - 35) {
		paddle2Y = paddle2Y + 6;
	} else if(paddle2YCenter > ballY + 35) {
		paddle2Y = paddle2Y - 6;
	}
    }

    function moveEverything() {
        computerMovement();

        //to change direction of the ball
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if(ballX > canvas.width) {
            if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.1;  

             }
            else {
                playerScore1 ++;
                ballReset();
               
            }
            
        }
        if(ballX < 0) {
            if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
                ballSpeedX = - ballSpeedX;


                var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.1;  
            }
            else
            {
                playerScore2 ++; 
                ballReset(); 
                             
            }
        }  
        
        if(ballY > canvas.height) {
            
            ballSpeedY = -ballSpeedY;
        }
        if(ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }              
    }
    
    
    function drawEverything() {
        canvasContext.fillStyle = 'black';  //background canvas
        canvasContext.fillRect(0,0,canvas.width,canvas.height);


        canvasContext.fillStyle = 'white';  //to create paddle on left
        canvasContext.fillRect(0,paddle1Y,10,100);

        canvasContext.fillStyle = 'white';  //to create paddle on left
        canvasContext.fillRect(canvas.width-10,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT);


        canvasContext.fillStyle = 'red';   //to create ball
        canvasContext.beginPath();
        canvasContext.arc(ballX,ballY,10,0,Math.PI*2,true);
        canvasContext.fill();


        canvasContext.fillStyle = 'white';
        canvasContext.fillText(playerScore1,100,100);       
        canvasContext.fillText(playerScore2,690,100);
    }
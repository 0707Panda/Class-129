var song="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreLeft=0;
scoreRight=0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    net = ml5.poseNet(video, modelLoaded);
    net.on('poses', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");

    if(scoreLeft > 0.2){
    circle(leftWristx,leftWristy,20);

    AllNumbers = Number(leftWristy);
    RoundY = floor(AllNumbers);
    volume = RoundY/500;
    document.getElementById("volumeButton").innerHTML = "Volume: " + volume;
    song.setVolume(volume);
    }

    if(scoreRight > 0.2){
        circle(rightWristx, rightWristy, 20);
        if(rightWristy > 0 && rightWristy <= 100){
            document.getElementById("speedButton").innerHTML= "Speed: 0.5x";
            song.rate(0.5);
        }
        else if(rightWristy > 100 && rightWristy <= 200){
            document.getElementsByName("speedButton").innerHTML= "Speed: 1x";
            song.rate(1);
        }
        else if(rightWristy > 200 && rightWristy <= 300){
            document.getElementById("speedButton").innerHTML= "Speed: 1.5x";
            song.rate(1.5);
        }
        else if(rightWristy > 300 && rightWristy <= 400){
            document.getElementById("speedButton").innerHTML= "Speed: 2x";
            song.rate(2);
        }
        else if(rightWristy > 400 && rightWristy <= 500){
            document.getElementById("speedButton").innerHTML= "Speed: 2.5x";
            song.rate(2.5);
        }
    }
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
}

function modelLoaded(){
    console.log("Model has started.");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("Left wrist x: " + leftWristx + "Left wrist y: " + leftWristy);
        
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("Right wrist x: " + rightWristx + "Right wrist y: " + rightWristy);

        scoreLeft = results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist" + scoreLeft);

        scoreRight = results[0].pose.keypoints[10].score;
        console.log("Score of Right Wrist" + scoreRight);
    }
}
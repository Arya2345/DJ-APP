song = "";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleft=0;
scoreright=0;

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    PoseNet=ml5.poseNet(video,modalLoaded);
    PoseNet.on("pose",gotResults);
}

function modalLoaded(){
    console.log("modal is loaded");
}

function gotResults(results){
    if (results.length>0){
        console.log(results);
        scoreright=results[0].pose.keypoints[10].score;
        scoreleft=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log(leftWristX);
        
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#f50202");
    stroke("#f50202");
    if(scoreright>0.2){
    circle(rightWristX,rightWristY,20);
    if (rightWristY > 0 && rightWristY <=100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <=200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <=400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <=500){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}
    if (scoreleft>0.2){
    circle(leftWristX,leftWristY,20);
    num1=Number(leftWristY);
    num2=floor(num1); 
    vol=num2/500;
    document.getElementById("volume").innerHTML="volume= "+vol;
    song.setVolume(vol);
    }
}

function preload(){
song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}
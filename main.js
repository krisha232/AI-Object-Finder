status1="";
input="";
objects=[];
function preload(){
    video=createCapture(VIDEO);
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);
    if(status1 !=""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
          if(objects[i].label==input){  document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("object").innerHTML=input+"found";

            fill("#FF0000");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + ""+percent+"%",objects[i].x + 15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }else{
            document.getElementById("object").innerHTML=input+"not found";
            document.getElementById("status").innerHTML="Status : Object Not Detected";
        }
    }}
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    document.getElementById("object").innerHTML="checking for"+input;
    input=document.getElementById("input").value;
    console.log(input);
}
function modelLoaded(){
    console.log("Model Loaded!");
    status1=true;
}

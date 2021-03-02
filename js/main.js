let audio, playbtn, nextbtn, prevbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking=false, seekto, curtimetext, 
durtimetext, playlist_status, dir, playlist, ext, agent, playlist_artist, repeat, random;

dir="music/";
playlist = ["Intro Boy Meets Evil",
    "Blood Sweat Tears",
    "Begin",
    "Lie",
    "Stigma",
    "First Love",
    "Reflection",
    "MAMA",
    "Awake",
    "Lost",
    "BTS Cypher 4",
    "Am I Wrong",
    "21st Century Girl",
    "Two! Three!",
    "Outro Wings"];
title = ["Intro Boy Meets Evil",
    "Blood Sweat Tears",
    "Begin",
    "Lie",
    "Stigma",
    "First Love",
    "Reflection",
    "MAMA",
    "Awake",
    "Lost",
    "Cypher Part-4",
    "Am I Wrong",
    "21st Century Girl",
    "Two! Three!",
    "Outro Wings"];
artists = ["BTS-JHope",
    "BTS",
    "BTS-Jungkook",
    "BTS-Jimin",
    "BTS-V",
    "BTS-Suga",
    "BTS-RM",
    "BTS-JHope",
    "BTS-Jin",
    "BTS-Vocal Line",
    "BTS-Rap Line",
    "BTS",
    "BTS",
    "BTS",
    "BTS"];
poster = ["images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg",
"images/ncs1.jpg"];

ext=".mp3";
agent= navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox')!=-1||agent.indexOf('opera')!=-1){
    ext=".ogg";
}

playbtn= document.getElementById("playpausebtn");
nextbtn= document.getElementById("nextbtn");
prevbtn= document.getElementById("prevbtn");
mutebtn= document.getElementById("mutebtn");
seekslider= document.getElementById("seekslider");
volumeslider= document.getElementById("volumeslider");
curtimetext= document.getElementById("curtimetext");
durtimetext= document.getElementById("durtimeText");
playlist_status= document.getElementById("playlist_status");
playlist_artist= document.getElementById("playlist_artist");
repeat= document.getElementById("repeat");
random= document.getElementById("random");

audio= new Audio();
audio.src= dir+playlist[0] + ext;
audio.loop=false;

playlist_index=0;

playlist_status.innerHTML= title[playlist_index];
playlist_artist.innerHTML= artists[playlist_index];

playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
mutebtn.addEventListener("click",mute);
seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
seekslider.addEventListener("mousemove", function(event){ seek(event); });
seekslider.addEventListener("mouseup", function(event){ seeking=false; });
volumeslider.addEventListener("mousemove", setVolume);
audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
audio.addEventListener("ended", function(){ switchTrack(); });
repeat.addEventListener("click", loop);
random.addEventListener("click", randomSong);

function fetchMusicDetails(){
    $("#playpausebtn img").attr("src", "images/pause-red2.png");
    $("#bgImage").attr("src", poster[playlist_index]);
    $("#image").attr("src", poster[playlist_index]);

    playlist_status.innerHTML= title[playlist_index];
    playlist_artist.innerHTML= artists[playlist_index];
    
    audio.src= dir+playlist[playlist_index]+ext;
    audio.play();
}

function playPause(){
    if(audio.paused){
        audio.play();
        $("#playpausebtn img").attr("src", "images/pause-red2.png");    
    }else{
        audio.pause();
        $("#playpausebtn img").attr("src", "images/play-red2.png"); 
    }
}

function nextSong(){
    playlist_index++;
    if(playlist_index > playlist.length - 1){
        playlist_index=0;
    }
    fetchMusicDetails();
}

function prevSong(){
    playlist_index--;
    if(playlist_index < 0){
        playlist_index= playlist.length - 1;
    }
    fetchMusicDetails();
}

function mute(){
    if(audio.muted){
        audio.muted= false;
        $("#mutebtn img").attr("src", "images/speaker.png");
    }else{
        audio.muted= true;
        $("#mutebtn img").attr("src", "images/mute.png");
    }
}

function seek(event){
    if(audio.duration == 0){
        null;
    }else{
        if(seeking){
            seekslider.value= event.clientX - seekslider.offsetLeft;
            seekto= audio.duration * (seekslider.value/100);
            audio.currentTime= seekto;
        }
    }
}

function setVolume(){
    audio.volume= volumeslider.value/100;
}

function seektimeupdate(){
    if(audio.duration){
        let nt= audio.currentTime * (100/audio.duration);
        seekslider.value= nt;
        var curmins= Math.floor(audio.currentTime/60);
        var cursecs= Math.floor(audio.currentTime-curmins*60);
        var durmins= Math.floor(audio.duration/60);
        var dursecs= Math.floor(audio.duration-durmins*60);
        if(cursecs<10){ cursecs="0"+cursecs };
        if(curmins<10){ curmins="0"+curmins };
        if(dursecs<10){ dursecs="0"+dursecs };
        if(durmins<10){ durmins="0"+durmins };
        curtimetext.innerHTML= curmins+":"+cursecs;
        durtimetext.innerHTML= durmins+":"+dursecs;
    }else{
        curtimetext.innerHTML= "00"+":"+"00";
        durtimetext.innerHTML= "00"+":"+"00";
    }
}

function switchTrack(){
    if(playlist_index == (playlist_length-1)){
        playlist_index=0;
    }else{
        playlist_index++;
    }
    fetchMusicDetails();
}

function loop(){
    if(audio.loop){
        audio.loop= false;
        $("#repeat img").attr("src", "images/rep.png")
    }else{
        audio.loop= true;
        $("#repeat img").attr("src", "images/rep1.png")
    }
}

function getRandomNumber(min,max){
    return Math.floor(Math.random() * Math.floor(max));
}

function randomSong(){
    let randomIndex= getRandomNumber(0, playlist.length-1);
    playlist_index = randomIndex;
    $("#playpausebtn img").attr("src", "images/pause-red2.png");
    $("#bgImage").attr("src", poster[playlist_index]);
    $("#image").attr("src", poster[playlist_index]);

    playlist_status.innerHTML= title[playlist_index];
    playlist_artist.innerHTML= artists[playlist_index];

    audio.src= dir+playlist[playlist_index]+ext;
    audio.play();
}
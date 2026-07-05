const songs = [
{
    title: "Shape of You",
    artist: "Ed Sheeran",
    src: "music/song1.mp3",
    cover: "images/song1.jpg"
},
{
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "music/song2.mp3",
    cover: "images/song2.jpg"
},
{
    title: "Believer",
    artist: "Imagine Dragons",
    src: "music/song3.mp3",
    cover: "images/song3.jpg"
}
];
let currentSong=0;

const audio=document.getElementById("audio");

const title=document.getElementById("title");

const artist=document.getElementById("artist");

const cover=document.getElementById("cover");

const progress=document.getElementById("progress");

const current=document.getElementById("current");

const duration=document.getElementById("duration");

const volume=document.getElementById("volume");

const playIcon=document.getElementById("playIcon");

const playlist=document.getElementById("playlist");

function loadSong(index){

title.innerHTML=songs[index].title;

artist.innerHTML=songs[index].artist;

cover.src=songs[index].cover;

audio.src=songs[index].src;

highlight();

}

loadSong(currentSong);

function playPause(){

if(audio.paused){

audio.play();

playIcon.className="fas fa-pause";

}

else{

audio.pause();

playIcon.className="fas fa-play";

}

}

function nextSong(){

currentSong++;

if(currentSong>=songs.length)

currentSong=0;

loadSong(currentSong);

audio.play();

playIcon.className="fas fa-pause";

}

function prevSong(){

currentSong--;

if(currentSong<0)

currentSong=songs.length-1;

loadSong(currentSong);

audio.play();

playIcon.className="fas fa-pause";

}

audio.addEventListener("timeupdate",()=>{

progress.max=audio.duration;

progress.value=audio.currentTime;

current.innerHTML=format(audio.currentTime);

duration.innerHTML=format(audio.duration);

});

progress.addEventListener("input",()=>{

audio.currentTime=progress.value;

});

volume.addEventListener("input",()=>{

audio.volume=volume.value;

});

audio.addEventListener("ended",nextSong);

function format(time){

if(isNaN(time)) return "0:00";

let min=Math.floor(time/60);

let sec=Math.floor(time%60);

if(sec<10) sec="0"+sec;

return min+":"+sec;

}

songs.forEach((song,index)=>{

let li=document.createElement("li");

li.innerHTML=song.title+" - "+song.artist;

li.onclick=()=>{

currentSong=index;

loadSong(index);

audio.play();

playIcon.className="fas fa-pause";

};

playlist.appendChild(li);

});

function highlight(){

document.querySelectorAll("li").forEach((li,i)=>{

li.classList.toggle("active",i===currentSong);

});

}
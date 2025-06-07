// filepath: d:\codewithharryspotify\script.js
console.log("Welcome to Spotify");

// 1. Song list array: Add your songs here
let songs = [
    {
        songName: "Only Love can Hurt like this",
        filePath: "firstsong.mp3",
        coverPath: "music cover1.jpg",
        duration: "3:37"
    },
    {
        songName: "I'll never love again",
        filePath: "secondsong.mp3",
        coverPath: "music cover2.jpg",
        duration: "5:32"
    },
    {
        songName: "Summertime Sadness",
        filePath: "thirdsong.mp3",
        coverPath: "music cover3.jpg",
        duration: "4:26"
    },
    {
        songName: "Sach keh raha hai deewana",
        filePath: "fourthsong.mp3",
        coverPath: "music cover4.jpg",
        duration: "5:49"
    },
    {
        songName: "Din Pareshan hai",
        filePath: "fifthsong.mp3",
        coverPath: "music cover5.jpg",
        duration: "3:08"
    },
    {
        songName: "Shape of You",
        filePath: "sixthsong.mp3",
        coverPath: "music cover6.jpg",
        duration: "4:20"
    }
    
    // Add more songs as needed
];

// 2. Initializations
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById('masterplay');
let progressBar = document.getElementById('myProgressBar');
let songItems = document.getElementsByClassName('songItem');
let backward = document.getElementById('backward');
let forward = document.getElementById('forward');

// 3. Update song list UI with song info
Array.from(songItems).forEach((element, i) => {
    let img = element.getElementsByTagName("img")[0];
    let name = element.getElementsByTagName("span")[0];
    let time = element.querySelector(".timestamp");
    img.src = songs[i].coverPath;
    name.innerText = songs[i].songName;
    if (time) time.childNodes[0].nodeValue = songs[i].duration;
});

// 4. Play/Pause functionality
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
});

// 5. Listen to Events (progress bar)
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress || 0;
});

// 6. Seek in song
progressBar.addEventListener('input', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// 7. Play song from song list
Array.from(songItems).forEach((element, i) => {
    element.addEventListener('click', () => {
        songIndex = i;
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    });
});

// 8. Next song
forward.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

// 9. Previous song
backward.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

/*
    --- How to add your songs ---
    1. Place your mp3 files and cover images in your project folder.
    2. Add song objects to the 'songs' array above with correct file paths and info.
    3. Make sure your HTML song list matches the number/order of songs in the array.
*/
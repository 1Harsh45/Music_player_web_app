console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;

    const res = await fetch(`/${folder}/info.json`);
    const data = await res.json();
    songs = data.songs;

    // Show all the songs in the playlist
    const songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    for (const song of songs) {
        songUL.innerHTML += `
            <li>
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${song}</div>
                    <div></div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
            </li>`;
    }

    // Click handlers to play songs & animate
    document.querySelectorAll(".songList li").forEach((li, index) => {
        li.addEventListener("click", () => {
            playMusic(songs[index]);

            document.querySelectorAll(".songList li").forEach(el => el.classList.remove("clicked"));
            void li.offsetWidth;
            li.classList.add("clicked");
        });
    });

    return songs;
}


const playMusic = (track, pause = false) => {
    currentSong.src = `${currFolder}/` + track;

    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

    // ✅ Highlight the currently playing song
    const songListItems = document.querySelectorAll(".songList li");
    songListItems.forEach((li) => {
        const title = li.querySelector(".info > div").innerText.trim();

        if (decodeURIComponent(track).includes(title)) {
            li.classList.remove("clicked");         // Remove if already present
            void li.offsetWidth;                    // Force reflow
            li.classList.add("clicked");            // Add animation class
        } else {
            li.classList.remove("clicked");
        }
    });
};



async function displayAlbums() {
    console.log("Displaying albums");

    const folders = [
        "Arijit Singh",
        "Diljit Dosanjh",
        "Karan Aujla",
        "Shubh"
    ];

    const cardContainer = document.querySelector(".cardContainer");

    for (const folder of folders) {
        try {
            const res = await fetch(`songs/${folder}/info.json`);
            const info = await res.json();

            cardContainer.innerHTML += `
                <div data-folder="songs/${folder}" class="card">
                    <div class="play">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                                stroke-linejoin="round" />
                        </svg>
                    </div>

                    <img src="songs/${folder}/cover.jpg" alt="">
                    <h2>${info.title}</h2>
                    <p>${info.description}</p>
                </div>`;
        } catch (error) {
            console.error(`Could not load album: ${folder}`, error);
        }
    }

    // Attach click event to each card
    document.querySelectorAll(".card").forEach(e => {
        e.addEventListener("click", async item => {
            const folder = item.currentTarget.dataset.folder;
            console.log("Fetching songs from", folder);
            songs = await getSongs(folder);
            playMusic(songs[0]);
        });
    });
}



// Load the playlist whenever card is clicked
Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click", async item => {
        console.log("Fetching Songs")
        songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        playMusic(songs[0])

    })
})


async function main() {
    // Get the list of all the songs
    await getSongs("songs/Arijit Singh")
    playMusic(songs[0], true)


    // Display all the albums on the page
    await displayAlbums()


    // Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "img/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "img/play.svg"
        }
    })

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Auto-play next song when the current one ends
    currentSong.addEventListener("ended", () => {
        let currentTrack = decodeURI(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentTrack);
        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        } else {
            // Optional: Reset UI when playlist ends
            play.src = "img/play.svg";
        }
    });


    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentSong.pause();
        let currentTrack = decodeURI(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentTrack);
        if (index > 0) {
            playMusic(songs[index - 1]);
        }
    });

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause();
        let currentTrack = decodeURI(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentTrack);
        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        }
    });


    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })





}

main() 
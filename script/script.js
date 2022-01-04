

/* ============== Tabs ============== */
let btnOne = document.getElementById('one');
let btnTwo = document.getElementById('two');
let btnThree = document.getElementById('three');
let content = document.querySelector('.header');


btnTwo.addEventListener('click', () => {
    content.classList.remove('header_origin');
    content.classList.add('header__active');
    content.classList.remove('header__active_2');
})
btnThree.addEventListener('click', () => {
    content.classList.toggle('header__active_2');
    content.classList.add('header__active_2');
    content.classList.remove('header__active');
    content.classList.remove('header_origin');
})
btnOne.addEventListener('click', () => {
    content.classList.remove('header__active');
    content.classList.remove('header__active_2');
    content.classList.add('header__origin')

})

/* ============== Burger-menu =========== */

const Btn = document.querySelector('.burger');
const menu = document.querySelector('.nav')
Btn.addEventListener('click', () => {
    menu.classList.toggle('nav__active');
})

/* ===============  Stars  ================== */

const ratings = document.querySelectorAll('.product__rating')
if (ratings.length > 0) {
    initRatings();
}

function initRatings() {
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRatings(rating);
    }

    function initRatings(rating) {
        initRatingsVars(rating);
        setRatingActiveWidth();

        if (rating.classList.contains('rating__set')) {
            setRating(rating);
        }

    }
    function initRatingsVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`
    }

    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener('mouseenter', (e) => {
                initRatingsVars(rating);
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener('mouseleave', (e) => {
                setRatingActiveWidth();
            });
            ratingItem.addEventListener('click', (e) => {
                initRatingsVars(rating);
                ratingValue.innerHTML = index + 1;
                setRatingActiveWidth();
            })

        }
    }

}


/* ============ Video Player ============= */

class Player {
    constructor(selector) {
        this.player = document.querySelector(selector);
        this.video = this.player.querySelector('video');
        this.hidePanel = true;
        this.timer;
        this.playVideo();

    }

    playVideo() {
        this.video.addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.player__video_play').addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.player__play_circle').addEventListener('click', this.toggleVideo.bind(this));
        this.video.addEventListener('dblclick', this.toggleFullScreen.bind(this));
        this.player.querySelector('.player__fullScreen').addEventListener('click', this.toggleFullScreen.bind(this));
        this.player.querySelector('.player__panel_mute').addEventListener('click', this.toggleVolume.bind(this));
        this.player.querySelector('.player__volume_slider').addEventListener('input', this.setVolume.bind(this));
        this.player.querySelector('.player__video_speed').addEventListener('input', this.setSpeed.bind(this));
        this.video.addEventListener('loadedmetadata', this.setVideoTime.bind(this));
        this.video.addEventListener('timeupdate', this.timeUpdate.bind(this));
        this.player.querySelector('.player__panel_line').addEventListener('click', this.setVideoLine.bind(this));
    }


    toggleVideo() {
        this.playing = !this.playing;
        const playIcon = this.player.querySelector('.player__video_play .far');
        const playCircle = this.player.querySelector('.player__play_circle');
        playIcon.classList.toggle('play__vid', !this.playing);
        playIcon.classList.toggle('pause', this.playing);


        if (this.playing) {
            this.video.play();
            playCircle.style.display = 'none';
        } else {
            this.video.pause();
            playCircle.style.display = 'block';
        }
    }

    toggleFullScreen() {
        const full = document.fullscreenElement;
        const fullIcon = this.player.querySelector('.player__fullScreen .far');
        fullIcon.classList.toggle('fullScreen', full);
        fullIcon.classList.toggle('full', !full);

        if (!full) {
            this.player.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    toggleVolume() {
        this.sounding = !this.sounding;
        const volumeIcon = this.player.querySelector('.player__panel_mute .far');
        const volumeSlider = this.player.querySelector('.player__volume_slider');
        volumeIcon.classList.toggle('vol__m', !this.sounding);
        volumeIcon.classList.toggle('vol__muted', this.sounding);
        if (this.sounding) {
            this.video.muted = true;
            volumeSlider.setAttribute('data-volume', volumeSlider.value);
            volumeSlider.value = 0;
        } else {
            this.video.muted = false;
            volumeSlider.value = volumeSlider.getAttribute('data-volume');
        }
    }

    setVolume() {
        this.video.volume = this.player.querySelector('.player__volume_slider').value / 100;
    }

    setSpeed() {
        this.video.playbackRate = this.player.querySelector('.player__video_speed').value;
    }
    setVideoTime() {
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.all__time').innerHTML = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    }
    timeUpdate() {
        const duration = Math.floor(this.video.duration);
        const current = Math.floor(this.video.currentTime);
        let seconds;
        if (current % 60 < 10) {
            seconds = `0${current % 60}`;
        } else {
            seconds = `${current % 60}`;
        }
        this.player.querySelector('.current__time').innerHTML = `${Math.floor(current / 60)}:${seconds}`;
        this.player.querySelector('.player__line_current').style.width = `${current / duration * 100}%`;
        if (this.hidePanel) {
            this.hidePanel = false;
            this.timer = setTimeout(() => {
                this.player.querySelector('.player__panel').style.bottom = '-68px';
            }, 3000);
        }
        this.video.addEventListener('mousemove', this.hide.bind(this))
    }

    hide() {
        this.hidePanel = true;
        clearTimeout(this.timer);
        document.querySelector('.player__panel').style.bottom = '0';
    }



    setVideoLine(event) {
        const lineWidth = this.player.querySelector('.player__panel').clientWidth;
        const position = event.offsetX;
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.player__line_current').style.width = `${position / lineWidth * 100}%`
        this.video.currentTime = position / lineWidth * duration;

    }

}

let player = new Player('.player');

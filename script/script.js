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
/* ================== Slider ============== */

class Slider{
    constructor({el, active, duration, autoplay, indicators, buttons, interval}){
        this.slider = el instanceof HTMLElement ? el : document.querySelector(el);
        this.active = active !== undefined ? active : 0;
        this.duration = duration !== undefined ? duration : 400;
        this.autoplay = autoplay;
        this.indicators = indicators;
        this.buttons = buttons;
        this.interval = interval !== undefined ? interval : 3000;
        this.id = '';
        this.sliderContent = this.slider.querySelector('.slider__all_block');
        this.sliderItems = [...this.sliderContent.children];
        if(this.indicators){
            let indParent = this.slider.querySelector('.control__dots');
            for (let i = 0; i < this.sliderItems.length; i++) {
                let li = document.createElement('li');
                indParent.append(li);                
            }
        }
        this.sliderItems.forEach(item => {
            item.style.transition = `${this.duration}ms linear`;
        })
        this.sliderPrev = this.slider.querySelector('.controls__left') ?? null;
        this.sliderNext = this.slider.querySelector('.controls__right') ?? null;
        this.indicatorsItems = this.indicators ? [...this.slider.querySelectorAll('.control__dots li')] : null;
        this.changeClass();
        if(this.buttons){
            this.sliderPrev.addEventListener('click', () => this.changeSlide(this.sliderPrev));
            this.sliderNext.addEventListener('click', () => this.changeSlide(this.sliderNext));
        }
        if(this.indicators) {
            this.indicatorsItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    let index = this.indicatorsItems.findIndex(item => item == e.target);
                    this.active = index;
                    this.changeClass();
                })
            })
        }
        this.autoplaying();
        
    }
    init(){
        this.width 
    }
    
    changeClass(){
        if(this.autoplay) {
           clearInterval(this.id);
           this.autoplaying();
        }
        for (let i = 0; i < this.sliderItems.length; i++) {
            this.sliderItems[i].classList.remove('active');
            if(this.indicatorsItems) this.indicatorsItems[i].classList.remove('active');
        }
        this.sliderItems[this.active].classList.add('active');
        if(this.indicatorsItems) this.indicatorsItems[this.active].classList.add('active');
    }
    changeSlide(btn = this.sliderNext){
        if(btn == this.sliderNext){
            this.active++;
            if(this.active == this.sliderItems.length) this.active = 0;  
        }
        else if(btn == this.sliderPrev){
            this.active--;
            if(this.active < 0) this.active = this.sliderItems.length - 1;
        }
        else throw new Error('Wrong Button');
        this.changeClass();
    }
    autoplaying(){
        if(this.autoplay){
           this.id = setInterval(() => {
                this.changeSlide();
           }, this.interval);
        }
    }
};
const mySlider = new Slider({
    el: '.slider',
    active: 1,//указывается от 0
    duration: 2000,
    autoplay: true,
    indicators: true,
    buttons: true,
    interval: 4000,
});















/* class Slider {
    constructor(options) {
        this.slider = document.querySelector(options.slider);
        this.sliderLine = this.slider.querySelector('.slider__all_block');
        this.slides = this.sliderLine.children;
        this.next = this.slider.querySelector('.controls__right');
        this.prev = this.slider.querySelector('.controls__left');
        this.dir = options.direction.toUpperCase() == 'X' ? 'X' : Y;
        this.timeMove = options.time != undefined ? options.time : 1000;
        this.width = this.slider.clientWidth;
        this.height = this.slider.clientHeight;
        this.moveSize = 'X' === this.dir ? this.width : this.height;
        this.activeSlide = 0;
        this.sliderLine.style = `height: ${this.height}px; overflow: hidden;`
        for (let i = 0; i < this.slides.length; i++) {
            const sl = this.slides[i];
            sl.style = `width:${this.width}px; height: ${this.height}px`
            if (i != this.activeSlide) {
                sl.style.transform = `translate${this.dir}(${this.moveSize}px)`;
            }
            if (i === this.slides.length - 1) {
                sl.style.transform = `translate ${this.dir}(${-this.moveSize}px)`
            }
        }
        this.next.addEventListener('click',() => this.move(this.next))
        this.prev.addEventListener('click',() => this.move(this.prev))
    }
    move(btn){
      let btnButtons = btn == this.next ? this.moveSize * -1 : this.moveSize;
      this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnButtons}px)`;
      this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';
      if (btn == this.next) {
          this.activeSlide++;
          if (this.activeSlide >= this.slides.length) {
              
          }
      }else if (btn == this.prev){
          this.activeSlide--
      }
      this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
      this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';
    }
}

const slider = new Slider({
    slider: '.slider',
    direction: 'x',
    time: 1000

}) */
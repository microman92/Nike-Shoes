/* ============== Tabs ============== */
let btnOne =  document.getElementById('one');
let btnTwo =  document.getElementById('two');
let btnThree = document.getElementById('three');
let content = document.querySelector('.header');


 btnTwo.addEventListener('click', () => { 
     content.classList.remove('header_origin');
     content.classList.add('header__active');
    content.classList.remove('header__active_2');
 })
 btnThree.addEventListener('click',() => { 
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

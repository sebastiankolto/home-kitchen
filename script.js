// -----------
// NAVBAR
// Showing and hiding the hidden menu
const hiddenMenu = document.querySelector("#hiddenMenu");
const mainHeader = document.querySelector("#mainHeader");

document.querySelector("#hamBtn").addEventListener("click", ()=>{
    hiddenMenu.classList.add("show");
    document.body.classList.add("mobile-menu-open");
    mainHeader.classList.remove("main-header--inactive")
})

document.querySelector("#exitMenu").addEventListener("click", ()=>{
    hiddenMenu.classList.remove("show");
    document.body.classList.remove("mobile-menu-open");
})




// CAROUSEL AT THE TOP
const splide = new Splide('.splide', {
    type: 'loop',
    loop:true,
    perPage: 1,
    width:"100%",
    height:"100%",
    autoplay:true,
    interval:3000,
    arrows:false,
    drag:false,
    classes: {
        page:'splide__pagination__page flat-pagination',
    }
});

splide.mount();





// GALLERY CAROUSEL
const splide1 = new Splide( '#main-carousel', {
    pagination: false,
  } );
  
  const thumbnails = document.getElementsByClassName( 'thumbnail' );
  let current;
  
  for ( let i = 0; i < thumbnails.length; i++ ) {
    initThumbnail( thumbnails[ i ], i );
  }
  
  function initThumbnail( thumbnail, index ) {
    thumbnail.addEventListener( 'click', function () {
      splide1.go( index );
    } );
  }
  
  splide1.on( 'mounted move', function () {
    var thumbnail = thumbnails[ splide.index ];
  
    if ( thumbnail ) {
      if ( current ) {
        current.classList.remove( 'is-active' );
      }
  
      thumbnail.classList.add( 'is-active' );
      current = thumbnail;
    }
  } );
  
  splide1.mount();





//NAVBAR GETS FIXED, HIDDEN, SHOWN ON SCROLL
let lastScroll = 0;

window.addEventListener("scroll", function(){
    const navBar = document.querySelector("#navbar");

    const currentScroll = window.scrollY
    
    // Scrolling up
    if(currentScroll < lastScroll){
        mainHeader.classList.remove("main-header--inactive")
        mainHeader.classList.add("main-header--active")
        navBar.classList.add("navbar--active")
    }
    
    // Scrolling down
    if(currentScroll > lastScroll){
        mainHeader.classList.add("main-header--inactive")
    }
    
    // At the top
    if(currentScroll < 20 && mainHeader.classList.contains("main-header--active")){
        mainHeader.classList.remove("main-header--active")
        navBar.classList.remove("navbar--active")
    }

    lastScroll = currentScroll;
})





// CAROUSEL OF REVIEWS
const reviewTrack = document.querySelector("#reviewTrack")
const numberOfReviews = Array.from(reviewTrack.children).length;

const reviewTrackContainer = document.querySelector("#reviewTrackContainer");
 
// Next button
const nextButton = document.querySelector("#rightBtn");
// Prev button
const prevButton = document.querySelector("#leftBtn");

let reviewWidth = document.querySelector(".reviewContent").clientWidth;

window.addEventListener("resize", function(){
    reviewWidth = document.querySelector(".reviewContent").clientWidth
})

let transformValue = 0;

// All indicators
const indicators = document.querySelectorAll(".indicator");
indicators[0].classList.add("indicator--active")  

//All the reviews
const reviewContents = document.querySelectorAll(".reviewContent")

// BASE FUNCTION TO CHECK WHAT ELEMENT IS IN THE VIEWPORT
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// GRABBING WAY OF CHANGING REVIEWS FOR SMALLER SCREENS
if(window.innerWidth < 800){

    // CHANGING REVIEWS WITH ARROWS AND GRAB
    let isDown = false;
    let startX;
    let scrollLeft;

    reviewTrack.classList.add("review__track--active")
    reviewTrack.addEventListener('mousedown', e => {
        isDown = true;
        reviewTrack.classList.add('active');
        startX = e.pageX - reviewTrack.offsetLeft;
        scrollLeft = reviewTrack.scrollLeft;
      });

      reviewTrack.addEventListener('mouseleave', _ => {
        isDown = false;
        reviewTrack.classList.remove('active');
      });

      reviewTrack.addEventListener('mouseup', _ => {
        isDown = false;
        reviewTrack.classList.remove('active');

        // CHANGING ACTIVE INDICATORS 
        // Add active class to the active indicator if the review is visible
        for(let i = 0; i < reviewContents.length; i++){
            if(isInViewport(reviewContents[i])){
                indicators.forEach((indicator)=>{
                    indicator.classList.remove("indicator--active")
                })
                alert("now")
                indicators[i].classList.add("indicator--active")
            }
        }
      });

      reviewTrack.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviewTrack.offsetLeft;
        const SCROLL_SPEED = 3;
        const walk = (x - startX) * SCROLL_SPEED;
        reviewTrack.scrollLeft = scrollLeft - walk;
      });
}


// CHANGING REVIEWS WITH ARROWS ON BIGGER SCREENS
if(window.innerWidth>800){
    if(transformValue === 0){
        prevButton.classList.add("disabled-button")
    }
    
    nextButton.addEventListener("click", function(){
        transformValue = transformValue + reviewWidth;
        reviewTrack.style.transform = `translateX(-${transformValue}px)`;
    
        if(transformValue > 0){
            prevButton.classList.remove("disabled-button")
        } else{
            prevButton.classList.add("disabled-button")
        }
    
        if(transformValue >= reviewWidth * (numberOfReviews-1)){
            nextButton.classList.add("disabled-button")
        } else{
            nextButton.classList.remove("disabled-button")
        }
    })
    
    prevButton.addEventListener("click", function(){
        transformValue = transformValue - reviewWidth;
        reviewTrack.style.transform = `translateX(-${transformValue}px)`;
    
        if(transformValue > 0){
            prevButton.classList.remove("disabled-button")
        } else {
            prevButton.classList.add("disabled-button")
        }
    
        if(transformValue >= reviewWidth * (numberOfReviews-1)){
            nextButton.classList.add("disabled-button")
        } else{
            nextButton.classList.remove("disabled-button")
        }
    })
}





// SHOW AND HIDE FULLSCREEN IMAGE
const galleryFullScreen = document.querySelector("#galleryFullscreen");
const exitImage = document.querySelector("#exitFullscreenImg");

// Clicking any thumbnail, opens the gallery
const thumbnails1 = document.querySelectorAll(".thumbnail");
  thumbnails1.forEach((thumbnail)=>{
    thumbnail.addEventListener("click", function(){
        galleryFullScreen.classList.remove("hide-gallery")
        document.body.classList.add("mobile-menu-open");   
    })
  })


// Closing the gallery with the exit button
exitImage.addEventListener("click", function(){
    galleryFullScreen.classList.add("hide-gallery")
    document.body.classList.remove("mobile-menu-open")
})

galleryFullScreen.addEventListener("click", function(e){
    const svgs = galleryFullScreen.querySelectorAll("svg")
    const paths = galleryFullScreen.querySelectorAll("path")
    svgs.forEach((svg)=>{
        svg.classList.add("gallery-arrow")
    })
    paths.forEach((path)=>{
        path.classList.add("gallery-arrow")
    })

    // If we click outside, and not on an img or arrow, it will close the fullscreen gallery
    if(!e.target.classList.contains("splide-gallery__img") && !e.target.classList.contains("gallery-arrow")){
        galleryFullScreen.classList.add("hide-gallery");
        document.body.classList.remove("mobile-menu-open") 
    }
})





//ANIMATIONS
// QUALITY CRAFTMANSHIP ANIMATION - IMG
let qcAnimation = gsap.timeline({
    paused:true,
    defaults:{
        ease:"power2.inOut",
        opacity: 1
    }
});

// QUALITY CRAFTMANSHIP ANIMATION - BUTTON
let qcAnimationButton = gsap.timeline({
    paused:true,
    defaults:{
        opacity: 1,
        delay:0.6
    }
});


// STARTING PROPERTY OF IMG
qcAnimation.set(".image-out", {
    opacity:0,
    x:"-40%"
})

// STARTING PROPERTY OF TEXTS
qcAnimation.set(".text-out",{
    opacity:0,
    x:"100px"
})

// STARTING PROPERTY OF THE BUTTON
qcAnimationButton.set(".qc-button-out",{
    opacity:0,
    x:"100px"
})


// ANIMATING THE IMAGE IN
qcAnimation.to(".image-out", {
    x:"0%",
    duration:0.8,
})

//ANIMATING THE TEXTS IN
qcAnimation.to(".text-out", {
    x:"0px",
    duration:0.8,
    stagger: 0.1
})

//ANIMATING THE BUTTON IN
qcAnimationButton.to(".qc-button-out",{
    duration:0.4,
    x:"0px"
})




// TRIGGERING THE ANIMATION ON SCROLL
const qcImageObserver = document.querySelector(".image-out");
const qualityCraftmanshipText = document.querySelector(".quality-craftmanship")

const options = {
    root:null,
    threshold: 1,
    rootMargin: "300px"
};



const imageIn = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        } else {
            // Starting the GSAP animation or timeline
            qcAnimation.play();
            qcAnimationButton.play();
            appearOnScroll.unobserve(entry.target)
        }
    });
}, options);

imageIn.observe(qualityCraftmanshipText)




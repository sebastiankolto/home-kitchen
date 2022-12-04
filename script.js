// -----------
// NAVBAR
// Showing and hiding the hidden menu
const hiddenMenu = document.querySelector("#hiddenMenu");

document.querySelector("#hamBtn").addEventListener("click", ()=>{
    hiddenMenu.classList.add("show");
    document.body.classList.add("mobile-menu-open");
})

document.querySelector("#exitMenu").addEventListener("click", ()=>{
    hiddenMenu.classList.remove("show");
    document.body.classList.remove("mobile-menu-open");
})

const splide = new Splide('.splide', {
    type: 'loop',
    loop:true,
    perPage: 1,
    width:"100%",
    height:"100%",
    autoplay:true,
    interval:3000,
    arrows:false,
    classes: {
        page:'splide__pagination__page flat-pagination',
    }
});

splide.mount();


//NAVBAR
// 
window.addEventListener("scroll", function(){
    const mainHeader = document.querySelector("#mainHeader");
    const navBar = document.querySelector("#navbar");

    if(window.scrollY > 20){
        mainHeader.style.background= "#000";
        navBar.style.padding = "10px 16px";
    } else {
        mainHeader.style.background = "";
        navBar.style.padding = "";
    }
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




// SHOW AND HIDE FULLSCREEN IMAGE
const gallery = document.querySelector("#gallery");
const galleryImages = Array.from(gallery.children);

const galleryFullScreen = document.querySelector("#galleryFullscreen");
const galleryFullscreenImg = document.querySelector("#galleryFullscreenImg");

const exitImage = document.querySelector("#exitFullscreenImg");

gallery.addEventListener("click", function(e){
    const currentImage = e.target.src
    const currentImageUrl = currentImage.split("/")[4];
    galleryFullScreen.classList.remove("hide");

    galleryFullscreenImg.src= currentImage;

    // No scrolling in background
    document.body.classList.add("mobile-menu-open");
})


console.log("helooo")

exitImage.addEventListener("click", function(){
    galleryFullScreen.classList.add("hide")
    document.body.classList.remove("mobile-menu-open")
})

document.querySelector("#hamBtn").addEventListener("click", ()=>{
    hiddenMenu.classList.add("show");
})

document.querySelector("#exitMenu").addEventListener("click", ()=>{
    hiddenMenu.classList.remove("show");
})

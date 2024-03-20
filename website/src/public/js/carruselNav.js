window.addEventListener("load", function(){
    const swiper = new Swiper('.swiperNav', {
        slidesPerView: "auto",
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false
        },
    });
})
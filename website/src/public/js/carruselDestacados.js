const crearSwiper = (nroSlides) => {
    const swiper = new Swiper('.swiperDestacado', {
    slidesPerView: nroSlides,
    direction: 'horizontal',
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

window.addEventListener("load", function() {
    const width = window.screen.width;
    const swiperWraper = document.querySelector("#swiperWraperDestacado")

    if(width < 480) {
        swiperWraper.style.justifyContent = ""
        crearSwiper(1)
    }else if(480 <= width && width < 768){
        swiperWraper.style.justifyContent = "center"
        crearSwiper(2)
    }else if(width >= 768) {
        swiperWraper.style.justifyContent = "center"
        crearSwiper(3)
    }
})

window.addEventListener("resize", function() {
    const width = window.screen.width;
    const swiperWraper = document.querySelector("#swiperWraperDestacado")
    
    if(width < 480) {
        swiperWraper.style.justifyContent = ""
        crearSwiper(1)
    }else if(480 <= width && width < 768){
        swiperWraper.style.justifyContent = "center"
        crearSwiper(2)
    }else if(width >= 768) {
        swiperWraper.style.justifyContent = "center"
        crearSwiper(3)
    }
})

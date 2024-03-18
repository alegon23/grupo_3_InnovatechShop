const crearSwiperPromo = (nroSlides) => {
    const swiper = new Swiper('.swiperPromociones', {
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


    if(width < 480) {
        crearSwiperPromo(1)
    }else if(480 <= width && width < 768){
        crearSwiperPromo(2)
    }else if(width >= 768) {
        crearSwiperPromo(3)
    }
})

window.addEventListener("resize", function() {
    const width = window.screen.width;
    
    if(width < 480) {
        crearSwiperPromo(1)
    }else if(480 <= width && width < 768){
        crearSwiperPromo(2)
    }else if(width >= 768) {
        crearSwiperPromo(3)
    }
})

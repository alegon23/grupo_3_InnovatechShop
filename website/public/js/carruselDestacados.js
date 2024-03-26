const crearSwiper = (nroSlides) => {
    const swiper = new Swiper('.swiperDestacado', {
    slidesPerView: nroSlides,
    direction: 'horizontal',
  
    // paginacion
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    // flechas de navegacion
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

window.addEventListener("load", function() {
    const width = window.screen.width;

    if(width < 480) {
        crearSwiper(1)
    }else if(480 <= width && width < 768){
        crearSwiper(2)
    }else if(width >= 768) {
        crearSwiper(3)
    }
})

window.addEventListener("resize", function() {
    const width = window.screen.width;
    
    if(width < 480) {
        crearSwiper(1)
    }else if(480 <= width && width < 768){
        crearSwiper(2)
    }else if(width >= 768) {
        crearSwiper(3)
    }
})

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("images",[
      {
        url:'/images/iphone13/iphone13.png',
        mainImage:1,
        idProductFK:1
      },{ 
        url:'/images/iphone13/I 13-lateral1 (1).png',
        mainImage:0,
        idProductFK:1
      },
      {
        url:'/images/iphone13/I 13-lateral1 (2).png',
        mainImage:0,
        idProductFK:1
      },
      {
        url:'/images/iphone13/I 13-lateral1 (3).png',
        mainImage:0,
        idProductFK:1
      },
      {
        url:'/images/Monitor Samsung Odissey/MSAMO.png',
        mainImage:1,
        idProductFK:2
      },
      {
        url:'/images/Monitor Samsung Odissey/MSAMO -lateral (1).png',
        mainImage:0,
        idProductFK:2
      },
      {
        url:'/images/Monitor Samsung Odissey/MSAMO -lateral (2).png',
        mainImage:0,
        idProductFK:2
      },
      {
        url:'/images/Monitor Samsung Odissey/MSAMO -lateral (3).png',
        mainImage:0,
        idProductFK:2
      },
      {
        url:'/images/Monitor Samsung Odissey/MSAMO -lateral (4).png',
        mainImage:0,
        idProductFK:2
      },
      {
        url:'/images/Smart TV 65 Samsung 4K AU7000/TVSAM65-frente.png',
        mainImage:1,
        idProductFK:3
      },
      {
        url:'/images/Smart TV 65 Samsung 4K AU7000/TVSAM65-lateral.png',
        mainImage:0,
        idProductFK:3
      },
      {
        url:'/images/Notebook Samsung book3/S-Book3.png',
        mainImage:1,
        idProductFK:4
      },
      {
        url:'/images/Notebook Samsung book3/NSAM-lateral (1).png',
        mainImage:0,
        idProductFK:4
      },
      {
        url:'/images/Notebook Samsung book3/NSAM-lateral (2).png',
        mainImage:0,
        idProductFK:4
      },
      {
        url:'/images/Notebook Samsung book3/NSAM-lateral (3).png',
        mainImage:0,
        idProductFK:4
      },
      {
        url:'/images/Notebook Samsung book3/NSAM-lateral (4).png',
        mainImage:0,
        idProductFK:4
      },
      {
        url:'/images/Notebook Samsung book3/NSAM-lateral (5).png',
        mainImage:0,
        idProductFK:4
      },
      {
        url:'/images/Notebook Samsung book3/NSAM-lateral (6).png',
        mainImage:0,
        idProductFK:4
      },
      {
        url:'/images/Motorola E13/M E13.png',
        mainImage:1,
        idProductFK:5
      },
      {
        url:'/images/Motorola E13/M E13-lateral (1).png',
        mainImage:0,
        idProductFK:5
      },
      {
        url:'/images/Motorola E13/M E13-lateral (2).png',
        mainImage:0,
        idProductFK:5
      },
      {
        url:'/images/Smart TV 50 TCL/TVTCL50.png',
        mainImage:1,
        idProductFK:6
      },
      {
        url:'/images/Smart TV 50 TCL/TVTCL50-lateral (1).png',
        mainImage:0,
        idProductFK:6
      },
      {
        url:'/images/Smart TV 50 TCL/TVTCL50-lateral (2).png',
        mainImage:0,
        idProductFK:6
      },
      {
        url:'/images/products/img-1570001.png',
        mainImage:1,
        idProductFK:7
      },
      {
        url:'/images/products/img-4167943.png',
        mainImage:0,
        idProductFK:7
      },
      {
        url:'/images/products/img-8470204.png',
        mainImage:0,
        idProductFK:7
      },
      {
        url:'/images/products/img-4784981.png',
        mainImage:1,
        idProductFK:8
      },
      {
        url:'/images/products/img-6492933.png',
        mainImage:0,
        idProductFK:8
      },
      {
        url:'/images/products/img-9644271.png',
        mainImage:0,
        idProductFK:8
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("images", null, {});
  }
};

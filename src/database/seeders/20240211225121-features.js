'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const features = [
      {
        idFeature: 1,
        feature: 'Memoria interna: 256 GB'
      },
      {
        idFeature: 2,
        feature: 'Cámara trasera principal: 12 Mpx'
      },
      {
        idFeature: 3,
        feature: 'Cámara frontal principal: 12 Mpx'
      },
      {
        idFeature: 4,
        feature: 'Desbloqueo: Reconocimiento facial'
      },
      {
        idFeature: 5,
        feature: 'Tamaño de pantalla: 25"'
      },
      {
        idFeature: 6,
        feature: 'Resolución: Full HD'
      },
      {
        idFeature: 7,
        feature: 'Es curvo: No'
      },
      {
        idFeature: 8,
        feature: 'Es reclinable: Si'
      },
      {
        idFeature: 9,
        feature: 'Resolución: 4K'
      },
      {
        idFeature: 10,
        feature: 'Tipo de pantalla: LED'
      },
      {
        idFeature: 11,
        feature: 'Aplicaciones integradas: Web browser, Gallery, Netflix, Prime Video, Apple TV, YouTube'
      },
      {
        idFeature: 12,
        feature: 'Cantidad de puertos HDMI: 3'
      },
      {
        idFeature: 13,
        feature: 'Memoria RAM: 8 GB'
      },
      {
        idFeature: 14,
        feature: 'Tamaño de pantalla: 15.6"'
      },
      {
        idFeature: 15,
        feature: 'Pantalla táctil: No'
      },
      {
        idFeature: 16,
        feature: 'Memoria interna: 64 GB'
      },
      {
        idFeature: 17,
        feature: 'Cámara trasera principal: 13 Mpx'
      },
      {
        idFeature: 18,
        feature: 'Cámara frontal principal: 5 Mpx'
      },
      {
        idFeature: 19,
        feature: 'Tamaño de pantalla: 50"'
      },
      {
        idFeature: 20,
        feature: 'Es smart: Si'
      },
  ];
    await queryInterface.bulkInsert('features', features);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('features', null, {});
  }
};

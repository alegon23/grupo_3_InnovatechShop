'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const features = [
      { feature: 'Memoria interna: 256 GB'},
      { feature: 'Cámara trasera principal: 12 Mpx' },
      { feature: 'Cámara frontal principal: 12 Mpx' },
      { feature: 'Desbloqueo: Reconocimiento facial' },
      { feature: 'Tamaño de pantalla: 25"' },
      { feature: 'Resolución: Full HD' },
      { feature: 'Es curvo: No' },
      { feature: 'Es reclinable: Si' },
      { feature: 'Resolución: 4K' },
      { feature: 'Tipo de pantalla: LED' },
      { feature: 'Aplicaciones integradas: Web browser, Gallery, Netflix, Prime Video, Apple TV, YouTube' },
      { feature: 'Cantidad de puertos HDMI: 3' },
      { feature: 'Memoria RAM: 8 GB' },
      { feature: 'Tamaño de pantalla: 15.6"' },
      { feature: 'Pantalla táctil: No' },
      { feature: 'Memoria interna: 64 GB' },
      { feature: 'Cámara trasera principal: 13 Mpx' },
      { feature: 'Cámara frontal principal: 5 Mpx' },
      { feature: 'Tamaño de pantalla: 50"' },
      { feature: 'Es smart: Si' },
    ];
    
    await queryInterface.bulkInsert('features', features);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('features', null, {});
  }
};

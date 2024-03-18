'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products",[
      {
        productName:'iPhone 13 PRO',
        originalPrice:1600000,
        onDiscount:1,
        discount:10,
        mainProduct:0,
        description:`Rendimiento
        El iPhone 13 Pro Max posee la versión más reciente de sistema operativo iOS 15. Cuenta con una memoria interna de 256 gigabytes de memoria y una RAM de 6 gigabytes brindando un desempeño increíble. Obtendrás más potencia para jugar, stremear y usar las funciones avanzadas de cámara, además de un funcionamiento más eficiente que consume menos batería.
        Pantalla
        Su pantalla OLED y Super Retina XDR con ProMotion de 6.7 pulgadas y una resolución de 2778 x 1284 pixeles tu entretenimiento favorito cobrará vida. Disfrutarás de una visión con tonos oscuros profundos y colores más brillantes acompañados de imágenes súper nítidas. Tiene esquinas redondeadas que siguen el elegante diseño curvo del teléfono, y las esquinas se encuentran dentro de un rectángulo estándar.
        Cámara
        Gracias a su sistema de cámaras Pro de 12 MP con teleobjetivo, gran angular y ultra gran angular, lograrás retratar cada momento con una gran calidad, capturar tomas amplias increíbles y acercamientos detallados en cualquier condición de luz y desde cualquier ángulo.`,
        stock:20,
        idCategoryFK:1,
        idBrandFK:1
    },
    {
      productName:'Monitor Samsung Odissey',
      originalPrice:350000,
      onDiscount:1,
      discount:20,
      mainProduct:0,
      description:`La notebook Samsung Premium Galaxy Book3 es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina.
      Pantalla con gran impacto visual
      Su pantalla FHD PLS de 15.6" y FHD de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle.
      Eficiencia a tu alcance
      Su procesador Intel I5, te permitirá ejecutar programas variados y procesos indispensables para desenvolverte en el día a día, ya sea en tu trabajo o en los momentos de ocio en tu hogar.
      Un procesador exclusivo para los gráficos
      Su placa de video Intel Iris Xe convierte a este dispositivo en una gran herramienta de trabajo para cualquier profesional del diseño. Te permitirá lograr una gran performance en todos tus juegos y en otras tareas cotidianas que impliquen procesamiento gráfico.`,
      stock:20,
      idCategoryFK:2,
      idBrandFK:2
    },
    {
      productName:'Samsung Smart TV 65"',
      originalPrice:1200000,
      onDiscount:1,
      discount:5,
      mainProduct:0,
      description:`Viví en 4K
      La cantidad de pixeles que ofrece es 4 veces mayor que la Full HD, ¿el resultado? Escenas mucho más realistas y con un nivel de detalle increíble. Ahora vas a conocer una aventura de inmersión que no va a dejar de sorprenderte.
      Más allá de ver televisión
      Su función Screen Share permite duplicar la pantalla de tu smartphone, tablet o PC para que aparezca en la TV. De esta forma vas a poder visualizar todo tipo de contenido: material audiovisual, documentos de trabajo, correos electrónicos y más.
      Conexión invisible
      Este modelo está pensado para que puedas despejar tu campo visual. El sector donde coloques el televisor se verá mucho más prolijo porque los cables estarán ocultos, ordenados y organizados, ¡vas a notar la diferencia!
      Un sonido que te envuelve
      Vas a sentir que proviene desde todas las direcciones posibles, lo cual enriquece la percepción del mismo. Los diálogos de tus series de fin de semana o la música de tus cantantes preferidos van a cobrar otro significado.`,
      stock:20,
      idCategoryFK:2,
      idBrandFK:2
    },
    {
      productName:'Notebook Samsung Book3',
      originalPrice:680000,
      onDiscount:0,
      discount:0,
      mainProduct:1,
      description:`La notebook Samsung Premium Galaxy Book3 es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina.
      Pantalla con gran impacto visual
      Su pantalla FHD PLS de 15.6" y FHD de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle.
      Eficiencia a tu alcance
      Su procesador Intel I5, te permitirá ejecutar programas variados y procesos indispensables para desenvolverte en el día a día, ya sea en tu trabajo o en los momentos de ocio en tu hogar.
      Un procesador exclusivo para los gráficos
      Su placa de video Intel Iris Xe convierte a este dispositivo en una gran herramienta de trabajo para cualquier profesional del diseño. Te permitirá lograr una gran performance en todos tus juegos y en otras tareas cotidianas que impliquen procesamiento gráfico.`,
      stock:20,
      idCategoryFK:4,
      idBrandFK:2
    },
    {
      productName:'Motorola E13',
      originalPrice:73999,
      onDiscount:0,
      discount:0,
      mainProduct:1,
      description:`No te quedes sin batería
      Con su batería de 5000 mAh lograrás trabajar y jugar por hasta por 40 horas sin interrupciones.
      Disfrutá de un gran rendimiento
      Su procesador Octa-Core, su memoria interna de 64 GB y RAM de 2 GB, te brindarán todo el espacio y la rapidez que necesitás en tu día a día.
      Diseño
      El celular Motorola E13 posee un moderno diseño en color Natural. Su pantalla con tecnología IPS es de 6,5 pulgadas, te permitirá jugar e interactuar con todo tu contenido favorito, como videos y series, en una calidad excelente y sin retrasos ni interrupciones. Además cuenta con una resolución de 720 x 1600, HD+, 60 HZ.
      Captura tus momentos
      Gracias a su cámara principal de 13 MP lograrás fotos nítidas y brillantes,retratos profesionales y acercamientos detallados.También podrás disfrutar de tus selfies con su cámara frontal de 5 MP y sus funciones de cámara rápida,panorámica y captura automática de sonrisa o con un gesto. Además ofrece marca de agua, cuadrícula de asistencia y nivelador.`,
      stock:20,
      idCategoryFK:1,
      idBrandFK:3
    },
    {
      productName:'Smart TV TCL 50"',
      originalPrice:419999,
      onDiscount:0,
      discount:0,
      mainProduct:1,
      description:`Cuenta con la tecnología Wide Color Gamut (WCG) que puede mostrar una paleta de colores más amplia hasta un 90 % de la gama bajo el estándar DCI-P3. Al igual que cuando ves a través de un caleidoscopio para presenciar el mundo de los colores.
      Tu Google TV te ayuda más que nunca con Hands Free Voice Control 2.0, accesibilidad al alcance de tu voz:
      Alto Rango dinámico (HDR), es el último estándar para contenidos UHD, brinda una experiencia superior con un brillo sorprendente, detalles de sombras excepcionales y colores vivos. Sentate y disfrutá de increíbles detalles de imagen tal como un cineasta.
      Dentro de los Google TV se encuentra disponible la conexión mediante Bluetooth 5.0. Vas a poder utilizar tus parlantes, auriculares, joysticks, teclados, y demás dispositivos inalámbricos sin necesidad de cables. Además, cuenta con conexión Wifi en 2.4 y 5 GHz para que puedas elegir la opción que mejor se adapte a tus necesidades.`,
      stock:20,
      idCategoryFK:2,
      idBrandFK:4
    },
    {
      productName:'Tablet Samsung Galaxy Tab S8+',
      originalPrice:980000,
      onDiscount:1,
      discount:35,
      mainProduct:0,
      description:`- Pantalla súper AMOLED de 12.4".
      - El mayor avance en la capacidad de respuesta del S Pen con una latencia ultrabaja.
      - La carcasa Armor Aluminum protege contra todo tipo de golpes y caídas.
      - Es grande, resistente y equilibra una durabilidad impresionante con un diseño delgado y superliviano.
      - Samsung notes es la forma más rápida de anotar todas tus ideas brillantes y valiosas en un instante.
      - Puedes hacerlo todo: recordatorios, bocetos, dibujos; incluso puedes convertir la escritura a mano`,
      stock:20,
      idCategoryFK:3,
      idBrandFK:2
    },
    {
      productName:'Tablet TCL Tab 10 Lite',
      originalPrice:186000,
      onDiscount:0,
      discount:0,
      mainProduct:1,
      description:`Personalizá tu tablet
      Sus 64 GB de memoria interna te permiten descargar aplicaciones y almacenar música, videos y fotos. Además, puedes expandir su capacidad hasta 128 GB mediante tarjeta Micro SD.
      Disfrutá un mayor rendimiento
      El sistema operativo Android 10 (Go Edition) es eficiente y fácil de usar. Cuenta con un procesador Quad Core 1.3 GHz que optimiza la memoria RAM de 1 GB, permitiendo ejecutar aplicaciones y realizar tareas de manera ágil.
      Conectá tus dispositivos
      Conectate inalámbricamente a internet y otros dispositivos gracias a la conexión Wi-Fi y Bluetooth 4.0.
      Capturá tus momentos
      Este producto tiene una cámara principal de 2 megapíxeles.
      Experimentá su diseño
      La Tablet TCL TAB-10 LITE ofrece un diseño ergonómico para un mejor agarre, es compacta y ligera. Posee una pantalla IPS de 10 pulgadas HD (800x1280 pixels).
      En la caja: cargador y cable USB.`,
      stock:20,
      idCategoryFK:3,
      idBrandFK:4
    },
  ])
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  }
};

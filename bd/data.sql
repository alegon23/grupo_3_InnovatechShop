/*CARGANDO DATOS EN TABLA ROLES*/
INSERT INTO innovatechShop_db.roles(roleName) VALUES ('user');
INSERT INTO innovatechShop_db.roles(roleName) VALUES ('admin');

/*CARGANDO DATOS EN TABLA CATEGORIES*/
INSERT INTO innovatechShop_db.categories (categoryName) VALUES ('Celulares');
INSERT INTO innovatechShop_db.categories (categoryName) VALUES ('Monitores & TVs');
INSERT INTO innovatechShop_db.categories (categoryName) VALUES ('Tablets');
INSERT INTO innovatechShop_db.categories (categoryName) VALUES ('Notebooks');
INSERT INTO innovatechShop_db.categories (categoryName) VALUES ('Hardware');
INSERT INTO innovatechShop_db.categories (categoryName) VALUES ('Accesorios');

/*CARGANDO DATOS EN TABLA BRANDS*/
INSERT INTO innovatechShop_db.brands (brandName) VALUES ('iPhone');
INSERT INTO innovatechShop_db.brands (brandName) VALUES ('Samsung');
INSERT INTO innovatechShop_db.brands (brandName) VALUES ('Motorola');
INSERT INTO innovatechShop_db.brands (brandName) VALUES ('TCL');

/*CARGANDO DATOS EN TABLA FEATURES*/
INSERT INTO features(feature) VALUES ('Memoria interna: 256 GB');
INSERT INTO features(feature) VALUES ('Cámara trasera principal: 12 Mpx');
INSERT INTO features(feature) VALUES ('Cámara frontal principal: 12 Mpx');
INSERT INTO features(feature) VALUES ('Desbloqueo: Reconocimiento facial');
INSERT INTO features(feature) VALUES ('Tamaño de pantalla: 25"');
INSERT INTO features(feature) VALUES ('Resolución: Full HD');
INSERT INTO features(feature) VALUES ('Es curvo: No');
INSERT INTO features(feature) VALUES ('Es reclinable: Si');
INSERT INTO features(feature) VALUES ('Resolución: 4K');
INSERT INTO features(feature) VALUES ('Tipo de pantalla: LED');
INSERT INTO features(feature) VALUES ('Aplicaciones integradas: Web browser, Gallery, Netflix, Prime Video, Apple TV, YouTube');
INSERT INTO features(feature) VALUES ('Cantidad de puertos HDMI: 3');
INSERT INTO features(feature) VALUES ('Memoria RAM: 8 GB');
INSERT INTO features(feature) VALUES ('Tamaño de pantalla: 15.6"');
INSERT INTO features(feature) VALUES ('Pantalla táctil: No');
INSERT INTO features(feature) VALUES ('Memoria interna: 64 GB');
INSERT INTO features(feature) VALUES ('Cámara trasera principal: 13 Mpx');
INSERT INTO features(feature) VALUES ('Cámara frontal principal: 5 Mpx');
INSERT INTO features(feature) VALUES ('Tamaño de pantalla: 50"');
INSERT INTO features(feature) VALUES ('Es smart: Si');

/*CARGANDO DATOS EN TABLA USERS*/
INSERT INTO users(firstName,lastName,email,password,birthdate,avatar,idRoleFK) VALUES ('Nahuel','Banco','nahuel@gmail.com','$2a$10$xbm40QXyhfqhbfnhTqjTMu9j6i5qEBCNEKDo3uHyXKu9PpMNuD7Hy','2000-07-19','/images/users/default.png',2);
INSERT INTO users(firstName,lastName,email,password,birthdate,avatar,idRoleFK) VALUES ('Alejandra', 'Gonzalez', 'ale@mail.com', '$2a$10$fqH.0GEMmXhzfg3XqnefjebG5/C.4a5.Bx..T46vDOj5J2yAoC3ue', '1995-06-23', '/images/users/default.png', 2);
INSERT INTO users(firstName,lastName,email,password,birthdate,avatar,idRoleFK) VALUES ('Mirian', 'Baigorria', 'mirian@gmail.com', '$2a$10$l0fc3WF3WPbjoR3d.UTjZeqhunMVk.7ivLKfddtZUpfEcxMtGAA4G', '2000-01-01', '/images/users/default.png', 2);

/*CARGANDO DATOS EN TABLA PRODUCTS*/
INSERT INTO products(productName,originalPrice,onDiscount,discount,mainProduct,description,stock,idCategoryFK,idBrandFK) VALUES ('iPhone 13 PRO',1600000,1,10,0,
'Rendimiento
El iPhone 13 Pro Max posee la versión más reciente de sistema operativo iOS 15. Cuenta con una memoria interna de 256 gigabytes de memoria y una RAM de 6 gigabytes brindando un desempeño increíble. Obtendrás más potencia para jugar, stremear y usar las funciones avanzadas de cámara, además de un funcionamiento más eficiente que consume menos batería.
Pantalla
Su pantalla OLED y Super Retina XDR con ProMotion de 6.7 pulgadas y una resolución de 2778 x 1284 pixeles tu entretenimiento favorito cobrará vida. Disfrutarás de una visión con tonos oscuros profundos y colores más brillantes acompañados de imágenes súper nítidas. Tiene esquinas redondeadas que siguen el elegante diseño curvo del teléfono, y las esquinas se encuentran dentro de un rectángulo estándar.
Cámara
Gracias a su sistema de cámaras Pro de 12 MP con teleobjetivo, gran angular y ultra gran angular, lograrás retratar cada momento con una gran calidad, capturar tomas amplias increíbles y acercamientos detallados en cualquier condición de luz y desde cualquier ángulo.',
20,1,1);
INSERT INTO products(productName,originalPrice,onDiscount,discount,mainProduct,description,stock,idCategoryFK,idBrandFK) VALUES ('Monitor Samsung Odissey',350000,1,20,0,'La notebook Samsung Premium Galaxy Book3 es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina.
Pantalla con gran impacto visual
Su pantalla FHD PLS de 15.6" y FHD de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle.
Eficiencia a tu alcance
Su procesador Intel I5, te permitirá ejecutar programas variados y procesos indispensables para desenvolverte en el día a día, ya sea en tu trabajo o en los momentos de ocio en tu hogar.
Un procesador exclusivo para los gráficos
Su placa de video Intel Iris Xe convierte a este dispositivo en una gran herramienta de trabajo para cualquier profesional del diseño. Te permitirá lograr una gran performance en todos tus juegos y en otras tareas cotidianas que impliquen procesamiento gráfico.',20,2,2);
INSERT INTO products(productName,originalPrice,onDiscount,discount,mainProduct,description,stock,idCategoryFK,idBrandFK) VALUES ('Samsung Smart TV 65"',1200000,1,5,0,'Viví en 4K
La cantidad de pixeles que ofrece es 4 veces mayor que la Full HD, ¿el resultado? Escenas mucho más realistas y con un nivel de detalle increíble. Ahora vas a conocer una aventura de inmersión que no va a dejar de sorprenderte.
Más allá de ver televisión
Su función Screen Share permite duplicar la pantalla de tu smartphone, tablet o PC para que aparezca en la TV. De esta forma vas a poder visualizar todo tipo de contenido: material audiovisual, documentos de trabajo, correos electrónicos y más.
Conexión invisible
Este modelo está pensado para que puedas despejar tu campo visual. El sector donde coloques el televisor se verá mucho más prolijo porque los cables estarán ocultos, ordenados y organizados, ¡vas a notar la diferencia!
Un sonido que te envuelve
Vas a sentir que proviene desde todas las direcciones posibles, lo cual enriquece la percepción del mismo. Los diálogos de tus series de fin de semana o la música de tus cantantes preferidos van a cobrar otro significado.',20,2,2);
INSERT INTO products(productName,originalPrice,onDiscount,discount,mainProduct,description,stock,idCategoryFK,idBrandFK) VALUES ('Notebook Samsung Book3',680000,0,0,1,'La notebook Samsung Premium Galaxy Book3 es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina.
Pantalla con gran impacto visual
Su pantalla FHD PLS de 15.6" y FHD de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle.
Eficiencia a tu alcance
Su procesador Intel I5, te permitirá ejecutar programas variados y procesos indispensables para desenvolverte en el día a día, ya sea en tu trabajo o en los momentos de ocio en tu hogar.
Un procesador exclusivo para los gráficos
Su placa de video Intel Iris Xe convierte a este dispositivo en una gran herramienta de trabajo para cualquier profesional del diseño. Te permitirá lograr una gran performance en todos tus juegos y en otras tareas cotidianas que impliquen procesamiento gráfico.',20,4,2);

INSERT INTO products(productName,originalPrice,onDiscount,discount,mainProduct,description,stock,idCategoryFK,idBrandFK) VALUES ('Motorola E13',73999,0,0,1,'No te quedes sin batería
Con su batería de 5000 mAh lograrás trabajar y jugar por hasta por 40 horas sin interrupciones.
Disfrutá de un gran rendimiento
Su procesador Octa-Core, su memoria interna de 64 GB y RAM de 2 GB, te brindarán todo el espacio y la rapidez que necesitás en tu día a día.
Diseño
El celular Motorola E13 posee un moderno diseño en color Natural. Su pantalla con tecnología IPS es de 6,5 pulgadas, te permitirá jugar e interactuar con todo tu contenido favorito, como videos y series, en una calidad excelente y sin retrasos ni interrupciones. Además cuenta con una resolución de 720 x 1600, HD+, 60 HZ.
Captura tus momentos
Gracias a su cámara principal de 13 MP lograrás fotos nítidas y brillantes,retratos profesionales y acercamientos detallados.También podrás disfrutar de tus selfies con su cámara frontal de 5 MP y sus funciones de cámara rápida,panorámica y captura automática de sonrisa o con un gesto. Además ofrece marca de agua, cuadrícula de asistencia y nivelador.',20,1,3);

INSERT INTO products(productName,originalPrice,onDiscount,discount,mainProduct,description,stock,idCategoryFK,idBrandFK) VALUES ('Smart TV TCL 50"',419999,0,0,1,'Cuenta con la tecnología Wide Color Gamut (WCG) que puede mostrar una paleta de colores más amplia hasta un 90 % de la gama bajo el estándar DCI-P3. Al igual que cuando ves a través de un caleidoscopio para presenciar el mundo de los colores.
Tu Google TV te ayuda más que nunca con Hands Free Voice Control 2.0, accesibilidad al alcance de tu voz:
Alto Rango dinámico (HDR), es el último estándar para contenidos UHD, brinda una experiencia superior con un brillo sorprendente, detalles de sombras excepcionales y colores vivos. Sentate y disfrutá de increíbles detalles de imagen tal como un cineasta.
Dentro de los Google TV se encuentra disponible la conexión mediante Bluetooth 5.0. Vas a poder utilizar tus parlantes, auriculares, joysticks, teclados, y demás dispositivos inalámbricos sin necesidad de cables. Además, cuenta con conexión Wifi en 2.4 y 5 GHz para que puedas elegir la opción que mejor se adapte a tus necesidades.',20,2,4);

/*CARGANDO DATOS EN TABLA IMAGES*/
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/iphone13/iphone13.png',1,1);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/iphone13/I 13-lateral1 (1).png',0,1);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/iphone13/I 13-lateral1 (2).png',0,1);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/iphone13/I 13-lateral1 (3).png',0,1);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Monitor Samsung Odissey/MSAMO.png',1,2);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Monitor Samsung Odissey/MSAMO -lateral (1).png',0,2);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Monitor Samsung Odissey/MSAMO -lateral (2).png',0,2);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Monitor Samsung Odissey/MSAMO -lateral (3).png',0,2);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Monitor Samsung Odissey/MSAMO -lateral (4).png',0,2);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Smart TV 65 Samsung 4K AU7000/TVSAM65-frente.png',1,3);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Smart TV 65 Samsung 4K AU7000/TVSAM65-lateral.png',0,3);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Notebook Samsung book3/S-Book3.png',1,4);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Notebook Samsung book3/NSAM-lateral (1).png',0,4);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Notebook Samsung book3/NSAM-lateral (2).png',0,4);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Notebook Samsung book3/NSAM-lateral (3).png',0,4);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Notebook Samsung book3/NSAM-lateral (4).png',0,4);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Notebook Samsung book3/NSAM-lateral (5).png',0,4);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Notebook Samsung book3/NSAM-lateral (6).png',0,4);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Motorola E13/M E13.png',1,5);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Motorola E13/M E13-lateral (1).png',0,5);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Motorola E13/M E13-lateral (2).png',0,5);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Smart TV 50 TCL/TVTCL50.png',1,6);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Smart TV 50 TCL/TVTCL50-lateral (1).png',0,6);
INSERT INTO images(url,mainImage,idProductFK) VALUES ('/images/Smart TV 50 TCL/TVTCL50-lateral (2).png',0,6);

/*CARGANDO DATOS EN TABLA products_features*/
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (1, 1);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (1, 2);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (1, 3);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (1, 4);

INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (2, 5);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (2, 6);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (2, 7);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (2, 8);

INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (3, 9);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (3, 10);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (3, 11);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (3, 12);

INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (4, 13);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (4, 14);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (4, 6);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (4, 15);

INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (5, 16);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (5, 17);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (5, 18);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (5, 4);

INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (6, 19);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (6, 9);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (6, 20);
INSERT INTO products_features(idProductFK, idFeatureFK) VALUES (6, 10);

CREATE DATABASE innovatechShop_db;
USE innovatechShop_db;

CREATE TABLE innovatechShop_db.roles (
	idRole INT UNSIGNED NOT NULL AUTO_INCREMENT,
    roleName VARCHAR(50) NOT NULL,
    PRIMARY KEY (idRole)
);

CREATE TABLE innovatechShop_db.users (
    idUser INT UNSIGNED NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    avatar VARCHAR(150) NOT NULL,
    idRoleFK INT UNSIGNED NOT NULL,
    PRIMARY KEY (idUser),
    FOREIGN KEY (idRoleFK) references innovatechShop_db.roles(idRole)
    );
    
CREATE TABLE innovatechShop_db.purchases (
	idPurchase INT UNSIGNED NOT NULL AUTO_INCREMENT,
    quantityItems INT UNSIGNED NOT NULL,
    totalPrice DECIMAL(7,2),
    idUserFK INT UNSIGNED NOT NULL,
    PRIMARY KEY (idPurchase),
    FOREIGN KEY (idUserFK) references innovatechShop_db.users(idUser)
);

CREATE TABLE innovatechShop_db.categories (
	idCategory INT UNSIGNED NOT NULL AUTO_INCREMENT,
    categoryName VARCHAR(50) NOT NULL,
    PRIMARY KEY (idCategory)
);

CREATE TABLE innovatechShop_db.brands (
	idBrand INT UNSIGNED NOT NULL AUTO_INCREMENT,
    brandName VARCHAR(30) NOT NULL,
    PRIMARY KEY (idBrand)
);

CREATE TABLE innovatechShop_db.products(
	idProduct INT UNSIGNED NOT NULL AUTO_INCREMENT,
    productName VARCHAR(100) NOT NULL,
    originalPrice DECIMAL(10,2) NOT NULL,
    onDiscount TINYINT NOT NULL,
    discount INT UNSIGNED NOT NULL,
    mainProduct TINYINT NOT NULL,
    description TEXT,
    stock INT NOT NULL,
    idCategoryFK INT UNSIGNED NOT NULL,
    idBrandFK INT UNSIGNED NOT NULL,
	PRIMARY KEY (idProduct),
	FOREIGN KEY (idCategoryFK) references innovatechShop_db.categories(idCategory),
    FOREIGN KEY (idBrandFK) references innovatechShop_db.brands(idBrand)
);

CREATE TABLE innovatechShop_db.images(
	idImage INT UNSIGNED NOT NULL AUTO_INCREMENT,
    url VARCHAR(150) NOT NULL,
    mainImage TINYINT NOT NULL,
    idProductFK INT UNSIGNED NOT NULL,
    PRIMARY KEY (idImage),
    FOREIGN KEY (idProductFK) references innovatechShop_db.products(idProduct)
);

CREATE TABLE innovatechShop_db.purchases_products(
	idPurchasesProducts INT UNSIGNED NOT NULL AUTO_INCREMENT,
    idPurchaseFK INT UNSIGNED NOT NULL,
    idProductFK INT UNSIGNED NOT NULL,
    PRIMARY KEY (idPurchasesProducts),
    FOREIGN KEY (idPurchaseFK) references innovatechShop_db.purchases(idPurchase),
    FOREIGN KEY (idProductFK) references innovatechShop_db.products(idProduct)
);

CREATE TABLE innovatechShop_db.features(
	idFeature INT UNSIGNED NOT NULL AUTO_INCREMENT,
    feature VARCHAR(150) NOT NULL,
    PRIMARY KEY (idFeature)
);

CREATE TABLE innovatechShop_db.products_features(
	idProductsFeatures INT UNSIGNED NOT NULL AUTO_INCREMENT,
    idProductFK INT UNSIGNED NOT NULL,
    idFeatureFK INT UNSIGNED NOT NULL,
    PRIMARY KEY (idProductsFeatures),
    FOREIGN KEY (idProductFK) references innovatechShop_db.products(idProduct),
    FOREIGN KEY (idFeatureFK) references innovatechShop_db.features(idFeature)
);

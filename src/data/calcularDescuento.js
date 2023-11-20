calcularDescuento = (precioOriginal, porcentaje) => {
    return precioOriginal - ((precioOriginal * porcentaje) / 100);
};

module.exports = calcularDescuento;
calcularDescuento = (precioOriginal, porcentaje) => {
    return Math.round(precioOriginal - ((precioOriginal * porcentaje) / 100));
};

module.exports = calcularDescuento;
const toThousand = n => {
    let numeroCentavos = n.toString().replace(".", ",");
    let numeroMiles = numeroCentavos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return numeroMiles;
};

module.exports = toThousand;
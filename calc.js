
const calcular = function (numerox, numeroy, operacao)
{

    var x = parseFloat(numerox);
    var y = parseFloat(numeroy);

    const calc = new Promise((resolve, reject) => {       

        switch(operacao)
        {
            case "+":
                resolve(x + y);
            break;
            case "-":
                resolve(x - y);
            break;
            case "*":
                resolve(x * y);
            break;
            case "/":
                resolve(x / y);
            break;
            default:
                reject("Operação não encontrada.");
            break;
        }
    })

    return calc;
}

module.exports  = {
    calcular   
}

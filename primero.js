function promedio(nota_uno, nota_dos, nota_tres){
    let resultado=(nota_uno+nota_dos+nota_tres)/3;
    console.log(resultado);
}

let promedio1 =(nota_uno, nota_dos, nota_tres) => {
    setTimeout(function(){
        console.log((nota_uno+nota_dos+nota_tres)/3);
    },2000);
}

let promedio2 =(nota_uno, nota_dos, nota_tres, callback) => {
    setTimeout(function(){
        let resultado = (nota_uno+nota_dos+nota_tres)/3;
        callback (resultado);
    },0);
}

// promedio(2,3,4);
// promedio1(2,3,4);
promedio2(5,4,10,function(resultado){
    console.log(resultado);
})


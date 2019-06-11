const {argv} = require('./yargs');
const funciones = require('./funciones');

let comando = argv._[0]
if(argv._[0] == 'crear'){
    funciones.crear(argv)
}
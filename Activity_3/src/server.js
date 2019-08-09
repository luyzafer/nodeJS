const io = require('socket.io');

var server;

function initSocketIo (pserver){
    if(server) {
        return server;
    } else {
        server = io(pserver);
    }
}

var serverModule = {
    init: (pserver) => initSocketIo(pserver),
    server: () => server 
}

module.exports = serverModule;
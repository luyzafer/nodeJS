socket= io()

const chat = document.querySelector('#chat')
const alert = document.querySelector('#alert')


socket.on('news', function (data) {
    console.log(data);
    alert.hidden = false ;
    socket.emit(chat.innerHTML = 'Ey! Actualmente la plataforma tiene '+data+' estudiantes activos en cursos');
  });


const socket = io.connect('http://localhost:8080', { 'forceNew': true})

let message={};

socket.on('messages', function(data){
  console.log(data);
})

function render(data) {
  let html = data.map((elem)=>{
    return(`<div>
             <strong>${elem.author}</strong>:
               <em>${elem.text}</em>
          </div>`)
  }).join(" ");

document.getElementById('messages').innerHTML = html;
}

socket.on('messages', (data)=>{
  render(data);
});

function addMessage(e) {
	mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('text').value
  };

  console.log(mensaje)

  socket.emit('new-message', mensaje);
  return false;
}

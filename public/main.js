const socket = io.connect('http://localhost:8080', { 'forceNew': true})

let message={};

socket.on('messages', function(data){
  console.log(data);
})

function render(data) {
  let html = data.map((elem)=>{
    return(`<div>
             <strong>${elem.username}</strong>:
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
    username: document.getElementById('username').value,
    text: document.getElementById('text').value
  };

  socket.emit('new-message', mensaje);
  return false;
}

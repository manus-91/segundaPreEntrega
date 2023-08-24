const socket = io();

let chatBox = document.getElementById("chatBox");

let user;
Swal.fire({
  title: "Bienvenido al chat",
  text: "Ingrese su email para comenzar a chatear",
  input: "email",
  confirmButtonText: "Aceptar",
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      return "Debe ingresar un email valido";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Debe ingresar un email valido";
    }
  },
}).then((result) => {
  if (result.value) {
    user = result.value;
    socket.emit("new-user", { user: user, id: socket.id });
  }
});

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user: user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let message = "";

  data.forEach((elem) => {
    message += `
      <div class="chat-message">
        <div class="message-bubble">
          <p class="fw-bold mb-0">${elem.user}</p>
          <hr />
          <p class="message">${elem.message}</p>
      </div>
      </div>
    `;
  });

  log.innerHTML = message;
});

socket.on("new-user-connected", (data) => {
  if (data.id !== socket.id)
    Swal.fire({
      text: `${data.user} se ha conectado al chat`,
      toast: true,
      position: "top-end",
    });
});

function addToCart(id) {
  console.log("tenemos el id desde  el backend", id);
}

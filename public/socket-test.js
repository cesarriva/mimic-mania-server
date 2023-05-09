var socket = io();

socket.emit("requestNewGame");

socket.on("newGameCreated", (data) => {
  console.log("Game code", data);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

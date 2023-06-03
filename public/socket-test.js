var socket = io({
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg1Nzc1NjMwfQ.73cFu-cUwGFsVvF7cLETrS8UimRGI-B-LgJDemJL4Zo",
  },
});

socket.emit("requestNewGame");

socket.on("newGameCreated", (data) => {
  console.log("Game code", data);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

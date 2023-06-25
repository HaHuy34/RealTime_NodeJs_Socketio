//Todo: GỌi thư viện express
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var arrUser = [];

//Todo: Lắng nghe có ai kết nối hay ko
io.on("connection", function (socket) {
  console.log("Co nguoi ket noi " + socket.id);
  socket.on("client-send-Username", function (data) {
    if (arrUser.indexOf(data) >= 0) {
      // That bai
      socket.emit("server-send-dki-thatbai");
    } else {
      // Thanh cong
      socket.Username = data;
      arrUser.push(data);
      socket.emit("server-send-dki-thanhcong", data);
      io.sockets.emit("server-send-ds-Users", arrUser);
    }
  });

  socket.on("logout", function () {
    arrUser.splice(arrUser.indexOf(socket.Username), 1);
    socket.broadcast.emit("server-send-ds-Users", arrUser);
  });

  socket.on("user-sent-mess", function(data){
    console.log(data);
    io.sockets.emit("server-send-mess", {username:socket.Username, content:data})
  });
});

app.get("/", function (req, res) {
  res.render("trangchu");
});

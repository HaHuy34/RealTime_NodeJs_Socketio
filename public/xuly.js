var socket = io("http://localhost:3000");
socket.on("server-send-dki-thatbai", function () {
  alert("Sai User Name (co nguoi da dang ki ten nay roi!!)");
});

socket.on("server-send-ds-Users", function (data) {
  $("#users-onl").html("");
  data.forEach(function (i) {
    $("#users-onl").append("<div class='box-user'>" + i + "</div>");
  });
});

socket.on("server-send-dki-thanhcong", function (data) {
  $("#currentUser").html(data);
  $("#chatForm").show(2000);
  $("#loginForm").hide(1000);
});

socket.on("server-send-mess", function(data){
    $(".listMess").append("<div class='mess'>"+data.username + ":" + data.content+"</div>");
});

$(document).ready(function () {
  $("#chatForm").hide();
  $("#loginForm").show();
  $("#btnRegister").click(function () {
    socket.emit("client-send-Username", $("#userName").val());
  });

  $("#btn-log-out").click(function () {
    $("#chatForm").hide(2000);
    $("#loginForm").show(1000);
    $("#userName").val("");
    socket.emit("logout");
  });

  $("#sentMess").click(function(){
    socket.emit("user-sent-mess", $("#contentMess").val());
  });
});

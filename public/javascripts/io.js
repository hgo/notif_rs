var socket = io.connect('');
 
  // Connectivity
  socket.emit('username', 'guven');
 
  socket.on('reconnect', function () {
    console.log('Reconnected to the server');
    socket.emit('username', 'guven');
  });
 
  socket.on('reconnecting', function () {
    console.log('Attempting to re-connect to the server');
  });
 
  // Custom Messages
 
  socket.on('bid', function(data) {
  console.log(data);
    /* $('body').append("<div class='notifications'>" +
    "Bid: Rs." + data.amount + " for " + data.customer +
    "</div>");
    */
  });
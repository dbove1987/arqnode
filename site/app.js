window.onload = function () {
    // Busca a referencia elementos da página
    var form = document.getElementById("message-form");
    var numerox = document.getElementById("numerox");
    var numeroy = document.getElementById("numeroy");
    var operador = document.getElementById("operador");
    var messagesList = document.getElementById("messages");
    var socketStatus = document.getElementById("status");
    var closeBtn = document.getElementById("close");
  
    // Cria um novo socket.
    var socket = new WebSocket("ws://localhost:3000");
    // var socket = new WebSocket("wss:echo.websocket.org");
  
  
    // Função para tratar os erros que podem ocorrer
    socket.onerror = function (error) {
      console.log("WebSocket Error: ", error);
    };
  
    // Função chamada no momento da conexão do cliente com o servidor
    socket.onopen = function (event) {
      socketStatus.innerHTML =
        "Conectado ao servidor: " + event.currentTarget.url;
      socketStatus.className = "open";
    };
  
    // Função para tratar mensagens enviadas pelo servidor.
    socket.onmessage = function (event) {
      var message = event.data;
      messagesList.innerHTML +=
        '<li class="received"><span>Recebido:</span>' + message + "</li>";
    };
  
    // Função chamada no momento da desconexão do servidor com o cliente
    socket.onclose = function (event) {
      socketStatus.innerHTML = "Websocket desconectado.";
      socketStatus.className = "closed";
    };
  
    // Função que envia mensagens para o servidor através da conexão websocket
    form.onsubmit = function (e) {
      e.preventDefault();
  
      // Pega a mensagem digitada no campo de mensagem do formulário
      var body = new Object();

      body.numerox = numerox.value;
      body.numeroy = numeroy.value;
      body.operador = operador.value;
  
      var jsonString= JSON.stringify(body);

      // Envia a mensagem através do websocket
      socket.send(jsonString);
  
      // Adiciona a mensagem enviada na tela
      messagesList.innerHTML +=
        '<li class="sent"><span>Enviado:</span>' + jsonString + "</li>";
  
      // Limpa o campo de mensagem
      numerox.value = "";   
      numeroy.value = "";
      operador.value = "";
  
      return false;
    };
  
    // Função que fecha a conexão websocket
    closeBtn.onclick = function (e) {
      e.preventDefault();
  
      socket.close();
  
      return false;
    };
  };
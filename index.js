const calc = require("./calc");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
//Inicializa um servidor HTTP orquestrado pelo express
const server = http.createServer(app);

//Inicializa um instancia de servidor websocket a partir do servidor http
const wss = new WebSocket.Server({ server });

app.use("/", express.static("./site"));


// Função responsável por manusear a conexão websocket
wss.on("connection", (ws) => {
  // Função que trata as mensagens recebidas pelo servidor
  ws.on("message", (message) => {

    const obj = JSON.parse(message);

    console.log("Mensagem recebida: ", obj.numerox);
 
    calc.calcular(obj.numerox, obj.numeroy, obj.operador)
         .then(result => ws.send("Resultado: " + result))
         .catch(error => console.log("Error: " + error));
    
  });
});

//Inicia o servidor
server.listen(process.env.PORT || 8080, () => {
  console.log("Servidor conectado na porta:", server.address().port);
});

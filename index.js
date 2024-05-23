const express = require("express");
const { Client } = require('pg');
const cors = require("cors");
const bodyparser = require("body-parser");
const config = require("./config");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

//Conectar ao banco
var conString = config.urlConnection;
var client = new Client(conString);
//Conectado ao banco
client.connect(function(err) {
  if(err) {
    return console.error('Não foi possível conectar ao banco.', err);
  }
//Executando um query
  client.query('SELECT NOW()', function(err, result) {
    if(err) {
      return console.error('Erro ao executar a query.', err);
    }
    console.log(result.rows[0]);
  });
});

app.get("/", (req, res) => {
    console.log("Response ok.");
    res.send("Ok – Servidor disponível.");
  });
  
  
  
  app.get("/usuarios/listar", (req, res) => {
    try {
    client.query("SELECT nome,email FROM Usuarios ORDER BY nome ASC", function
   (err, result) {
    if (err) {
    return console.error("Erro ao executar a qry de SELECT", err);
    return res.status(500).send("Erro ao executar a qry de SELECT");
    }
    res.send(result.rows);
    console.log("Rota: Listar os usuários em ordem alfabetica por nome");
    });
    } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao executar a qry de SELECT");
    }
   });



 
 
  
  

  
  
  
  
  
  
  
  //Iniciando o Servidor tem que ser o ultimo
  app.listen(config.port, () =>
    console.log("Servidor funcionando na porta " + config.port)

  );
  module.exports = app;
  
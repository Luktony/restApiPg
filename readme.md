///Iniciando um rpojeto baseado em node
npm init

///Iniciando um backend com Express.js
• npm install express
• npm install dotenv
• npm install cors
• npm install body-parser

///Bibliotecas para acesso ao BD
• npm install pg 
Ou
• npm install mysql

///Node Monitor
npm install --save-dev nodemon

///Estrutura do projeto
- index.js
- config.js
- .env
- .gitignore

///Arquivo .env
#configuracoes para o express (local)
PORT=9081
#configuracoes para o postgreSQL remoto
pgConnection = "<urlConexao>"

///Arquivo config.js
Esse código JavaScript está configurando variáveis de ambiente para um aplicativo Node.js usando a biblioteca dotenv e exportando essas variáveis para uso em outras partes do código.
const dotenv = require('dotenv');: Isso importa a biblioteca dotenv, que é usada para carregar variáveis de ambiente de um arquivo .env para o processo do Node.js.
dotenv.config();: Esta linha executa o método config() da biblioteca dotenv, que carrega as variáveis de ambiente do arquivo .env e as disponibiliza para o processo do Node.js.
const { PORT, pgConnection } = process.env;: Aqui, estamos usando a desestruturação do ES6 para extrair as variáveis PORT e pgConnection do objeto process.env. Isso permite que usemos essas variáveis diretamente em nosso código sem precisar acessar process.env.PORT e process.env.pgConnection toda vez.
module.exports = { port: PORT, urlConnection: pgConnection }: Por fim, estamos exportando um objeto que contém as variáveis extraídas. Este objeto tem duas propriedades: port, que recebe o valor da variável de ambiente PORT, e urlConnection, que recebe o valor da variável de ambiente pgConnection.

const dotenv = require('dotenv');
dotenv.config();
const {
 PORT,
 pgConnection
} = process.env;
module.exports = {
 port: PORT,
 urlConnection: pgConnection
}

//Arquivo package.json
• Para monitorar o servidor de forma a atualiza-lo sempre que o código fonte for 
modificado, defina a diretiva start no item scripts (já existente) conforme 
abaixo:"start": "nodemon index.js"

//Arquivo index.js
const express = require("express");
Express é um framework para Node.js que facilita a criação e gerenciamento de servidores web e APIs. Esta linha importa o módulo express e o atribui à constante express.

const { Client } = require('pg');
pg é um módulo que permite interagir com bancos de dados PostgreSQL a partir de um aplicativo Node.js. Esta linha importa a classe Client do módulo pg, que é usada para criar instâncias de cliente que se conectam ao banco de dados PostgreSQL.

const cors = require("cors");
CORS (Cross-Origin Resource Sharing) é um mecanismo que permite que recursos restritos em uma página web sejam solicitados a partir de um domínio diferente daquele que serviu o primeiro recurso. Esta linha importa o módulo cors, que é um middleware para habilitar CORS em aplicativos Express.

const bodyparser = require("body-parser");
body-parser é um middleware usado no Express para analisar corpos de requisições HTTP. Ele permite que você processe dados enviados em uma requisição POST, por exemplo. Esta linha importa o módulo body-parser.

const config = require("./config")
Esta linha importa um módulo local chamado config

//Arquivo index.js – Inicialização e Middlewares
const app = express();
Esta linha cria uma instância do aplicativo Express. A variável app agora representa o servidor Express e será usada para definir rotas, middlewares e configurar o servidor

app.use(express.json());
Este middleware integrado ao Express analisa corpos de requisições JSON. Ele processa as requisições com o cabeçalho Content-Type: application/json e disponibiliza os dados parseados em req.body.
Exemplo: Se uma requisição POST enviar um JSON { "name": "John" }, você poderá acessar req.body.name no manipulador de rota.

app.use(cors());
Este middleware configura o CORS (Cross-Origin Resource Sharing) para permitir que o aplicativo responda a requisições de origens diferentes. Sem isso, navegadores modernos bloqueariam tais requisições por motivos de segurança.
Exemplo: Se seu servidor estiver em http://api.example.com e um cliente web em http://www.example.com tentar fazer uma requisição, o CORS permitirá que essa requisição seja aceita e respondida.

app.use(bodyparser.json())
Este middleware do body-parser também analisa corpos de requisições JSON, similar ao express.json(). Ele processa requisições com o cabeçalho Content-Type: application/json e disponibiliza os dados parseados em req.body.
Nota: Desde o Express 4.16.0, o express.json() é uma função integrada que oferece a mesma funcionalidade que bodyparser.json(). Então, em versões mais recentes do Express, usar express.json() é suficiente e você pode não precisar do body-parser separadamente.

//Arquivo index.js

-Conexão com o Banco de Dados:
var conString = config.urlConnection;
var client = new Client(conString);

-Conectando ao Banco de Dados:
client.connect(function(err) {
  if(err) {
    return console.error('Não foi possível conectar ao banco.', err);
  }
-Executando uma Query:
  client.query('SELECT NOW()', function(err, result) {
    if(err) {
      return console.error('Erro ao executar a query.', err);
    }
    console.log(result.rows[0]);
  });
});
Obtém a URL de conexão ao banco de dados do módulo de configuração.
Cria um cliente PostgreSQL usando essa URL.
Tenta se conectar ao banco de dados.
Se a conexão for bem-sucedida, executa uma consulta para obter a data e hora atuais do servidor do banco de dados.
Registra no console o resultado da consulta ou mensagens de erro caso ocorra algum problema na conexão ou na execução da consulta.
Este é um exemplo típico de como se conectar a um banco de dados PostgreSQL e executar uma consulta simples usando Node.js e o módulo pg.

//Arquivo index.js

-Definindo uma Rota GET:
app.get("/", (req, res) => {
  console.log("Response ok.");
  res.send("Ok – Servidor disponível.");
});

-Iniciando o Servidor:
app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);
Rota GET /:

Quando uma requisição GET é feita ao caminho raiz (/), o servidor:
Registra a mensagem "Response ok." no console.
Envia a resposta "Ok – Servidor disponível." ao cliente.
Iniciando o Servidor:

O servidor começa a escutar requisições na porta especificada pela configuração (config.port).
Registra a mensagem "Servidor funcionando na porta [port]" no console, indicando que o servidor está ativo e funcionando na porta configurada.

Agora 
//Subir o servidor local
 Para fazer a API funcionar em modo local, digitar no console (na mesma pasta 
do projeto)

npm start

//Agora pode criar suas Rotas/routes/endPoints desejados
//Exemplo de rota simples:

app.get("/usuarios", (req, res) => {
  try {
    client.query("SELECT * FROM Usuarios", function(err, result) {
      if (err) {
        return console.error("Erro ao executar a qry de SELECT", err);
      }
      res.send(result.rows);
      console.log("Rota: get usuarios");
    });
  } catch (error) {
    console.log(error);
  }
});
Esta rota /usuarios faz o seguinte:

Requisição GET:

Quando uma requisição GET é feita ao caminho /usuarios, o servidor executa a lógica definida no callback.
Execução da Consulta SQL:

O servidor tenta executar a consulta SQL SELECT * FROM Usuarios para selecionar todos os registros da tabela Usuarios.
Tratamento de Erros:

Se ocorrer um erro durante a execução da consulta, a mensagem de erro é registrada no console e a execução é interrompida.
Envio da Resposta:

Se a consulta for bem-sucedida, os resultados da consulta (registros da tabela Usuarios) são enviados como resposta à requisição.
Uma mensagem de log é registrada no console indicando que a rota /usuarios foi acessada e a consulta foi executada.







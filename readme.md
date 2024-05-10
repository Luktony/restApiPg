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
const express = require('express');
const bodyParser = require('body-parser');
const Usuario = require('./Usuario');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/cadastro', async (req, res) => {
  const { primeiro_nome, sobrenome, email, celular, senha, genero } = req.body;

  try {
    const usuario = await Usuario.create({
      primeiro_nome,
      sobrenome,
      email,
      celular,
      senha,
      genero
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
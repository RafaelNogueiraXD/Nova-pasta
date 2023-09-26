const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = 'database.json';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/addUser', (req, res) => {
    const { email, senha } = req.body;

    // Ler o arquivo JSON existente
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err || !data) {
            data = '[]'; // Se o arquivo não existir ou estiver vazio, inicialize com uma lista vazia
        }

        const database = JSON.parse(data);
        database.push({ email, senha });

        // Salvar os dados atualizados no arquivo JSON
        fs.writeFile(DATA_FILE, JSON.stringify(database, null, 2), (err) => {
            if (err) {
                res.status(500).send('Erro ao salvar os dados.');
                return;
            }
            res.send('Usuário adicionado com sucesso!');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

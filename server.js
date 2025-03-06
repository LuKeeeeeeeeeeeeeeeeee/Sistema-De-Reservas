const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors()); // Habilitar CORS

const FILE_PATH = 'reservas.txt';

// Servir un mensaje en la ruta raíz para evitar "Cannot GET /"
app.get('/', (req, res) => {
    res.send("Servidor de Reservas Activo 🚀");
});

// Ruta para leer las reservaciones
app.get('/leer', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el archivo:", err);
            return res.status(500).send("Hubo un problema al obtener las reservaciones.");
        }
        res.send(data);
    });
});

// Ruta para guardar una reservación
app.post('/guardar', (req, res) => {
    const { nombre, fecha, personas } = req.body;

    if (!nombre || !fecha || !personas) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    const nuevaReserva = `Nombre: ${nombre}, Fecha: ${fecha}, Personas: ${personas}\n`;

    fs.appendFile(FILE_PATH, nuevaReserva, 'utf8', (err) => {
        if (err) {
            console.error("Error al guardar la reservación:", err);
            return res.status(500).send("Hubo un problema al guardar la reservación.");
        }
        res.send("Reservación guardada con éxito.");
    });
});

// Verificar que el archivo reservas.txt exista
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, '', 'utf8');
}

// Configuración del puerto en Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

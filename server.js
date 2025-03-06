const express = require('express');
const fs = require('fs');
const app = express();

// Habilitar el uso de JSON en las peticiones
app.use(express.json());

// Ruta para leer reservaciones (esto es solo un ejemplo, puedes modificar la lógica)
app.get('/leer', (req, res) => {
    // Aquí podrías leer el archivo o base de datos
    fs.readFile('reservas.txt', 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el archivo:", err);
            return res.status(500).send("Hubo un problema al obtener las reservaciones.");
        }
        res.send(data);
    });
});

// Ruta para guardar reservación (esto es solo un ejemplo)
app.post('/guardar', (req, res) => {
    const { nombre, fecha, personas } = req.body;

    // Lógica para guardar la reservación
    const nuevaReserva = `Nombre: ${nombre}, Fecha: ${fecha}, Personas: ${personas}\n`;

    fs.appendFile('reservas.txt', nuevaReserva, 'utf8', (err) => {
        if (err) {
            console.error("Error al guardar la reservación:", err);
            return res.status(500).send("Hubo un problema al guardar la reservación.");
        }
        res.send("Reservación guardada con éxito.");
    });
});

// Usar el puerto proporcionado por Render o 3000 por defecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

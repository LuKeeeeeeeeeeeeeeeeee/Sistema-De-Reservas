const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = "reservas.txt";

// Habilitar CORS y JSON
app.use(cors());
app.use(express.json());

// Ruta principal (para verificar que el servidor está activo)
app.get("/", (req, res) => {
    res.send("Servidor de Reservas Activo 🧐");
});

// Ruta para leer reservaciones
app.get("/leer", (req, res) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error al leer las reservaciones.");
        }
        res.send(data || "No hay reservaciones.");
    });
});

// Ruta para guardar reservaciones
app.post("/guardar", (req, res) => {
    const { nombre, fecha, personas } = req.body;

    if (!nombre || !fecha || !personas) {
        return res.status(400).send("Datos incompletos.");
    }

    const nuevaReserva = `Nombre: ${nombre}, Fecha: ${fecha}, Personas: ${personas}\n`;

    fs.appendFile(FILE_PATH, nuevaReserva, (err) => {
        if (err) {
            return res.status(500).send("Error al guardar la reservación.");
        }
        res.send("Reservación guardada con éxito.");
    });
});

// Iniciar el servidor en el puerto correcto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

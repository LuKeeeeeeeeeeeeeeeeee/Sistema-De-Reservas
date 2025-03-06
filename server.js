const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = path.join(__dirname, "reservas.txt");

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("Servidor de Reservas Activo 🧐");
});

// Ruta para obtener las reservaciones
app.get("/leer", (req, res) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer las reservaciones." });
        }
        res.json({ reservaciones: data ? data.split("\n").filter(Boolean) : [] });
    });
});

// Ruta para guardar una nueva reservación
app.post("/guardar", (req, res) => {
    const { nombre, fecha, personas } = req.body;

    if (!nombre || !fecha || !personas) {
        return res.status(400).json({ error: "Datos incompletos." });
    }

    const nuevaReserva = `Nombre: ${nombre}, Fecha: ${fecha}, Personas: ${personas}\n`;

    fs.appendFile(FILE_PATH, nuevaReserva, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error al guardar la reservación." });
        }
        res.json({ mensaje: "Reservación guardada con éxito." });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});

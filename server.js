const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = "reservas.txt";

// Habilitar CORS y JSON en el servidor
app.use(cors());
app.use(express.json());

// Asegurar que el archivo de reservas exista
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "", "utf8");
}

// Ruta principal (para verificar que el servidor está activo)
app.get("/", (req, res) => {
    res.send("Servidor de Reservas Activo 🚀");
});

// Ruta para leer reservaciones
app.get("/leer", (req, res) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Hubo un problema al obtener las reservaciones.");
        } else {
            res.send(data || "No hay reservaciones registradas.");
        }
    });
});

// Ruta para guardar una reservación
app.post("/guardar", (req, res) => {
    const { nombre, fecha, personas } = req.body;

    if (!nombre || !fecha || !personas) {
        return res.status(400).send("Faltan datos en la reservación.");
    }

    const nuevaReserva = `Nombre: ${nombre}, Fecha: ${fecha}, Personas: ${personas}\n`;

    fs.appendFile(FILE_PATH, nuevaReserva, (err) => {
        if (err) {
            res.status(500).send("Hubo un problema al guardar la reservación.");
        } else {
            res.send("Reservación guardada con éxito.");
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

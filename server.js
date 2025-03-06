const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Usar CORS para permitir peticiones desde otros dominios (necesario para tu frontend)
app.use(cors());

// Configurar el servidor para manejar peticiones JSON
app.use(express.json());

// Datos de ejemplo (deberías reemplazar esto con acceso a tu base de datos)
let reservaciones = [
    { nombre: 'Juan', fecha: '2025-03-10 10:00', personas: 2 },
    { nombre: 'Ana', fecha: '2025-03-11 12:00', personas: 4 }
];

// Ruta para obtener todas las reservaciones
app.get('/leer', (req, res) => {
    res.json(reservaciones);  // Devolver las reservaciones como JSON
});

// Ruta para guardar una nueva reservación
app.post('/guardar', (req, res) => {
    const { nombre, fecha, personas } = req.body;

    if (!nombre || !fecha || !personas) {
        return res.status(400).send("Faltan datos requeridos.");
    }

    // Guardar la nueva reservación en el array (simulando un almacenamiento)
    const nuevaReservacion = { nombre, fecha, personas };
    reservaciones.push(nuevaReservacion);

    res.status(200).send("Reservación guardada exitosamente.");
});

const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Ruta para obtener las reservaciones (lectura)
app.get('/leer', (req, res) => {
    const path = '/tmp/Num_Reserva/Num_Reserva.txt'; // Ruta temporal en Render

    // Verificar si el archivo existe
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            res.status(500).send('Hubo un problema al cargar las reservaciones.');
        } else {
            res.send(data);  // Enviar el contenido del archivo como respuesta
        }
    });
});

// Ruta para guardar las reservaciones
app.post('/guardar', (req, res) => {
    const { nombre, fecha, personas } = req.body;
    
    // Crear la carpeta si no existe
    const dirPath = '/tmp/Num_Reserva';
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Definir la ruta del archivo donde se guardará la reservación
    const filePath = `${dirPath}/Num_Reserva.txt`;

    // Preparar el contenido a escribir en el archivo
    const reservacionData = `Nombre: ${nombre}\nFecha: ${fecha}\nNúmero de Personas: ${personas}\n\n`;

    // Escribir la nueva reservación en el archivo
    fs.appendFile(filePath, reservacionData, (err) => {
        if (err) {
            console.error('Error al guardar la reservación:', err);
            res.status(500).send('Hubo un problema al guardar la reservación.');
        } else {
            res.send('Reservación guardada correctamente.');
        }
    });
});

// Servir la aplicación en el puerto definido
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

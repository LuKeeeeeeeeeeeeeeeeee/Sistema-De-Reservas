const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.static("."));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post("/guardar", (req, res) => {
    const { nombre, fecha, personas } = req.body;
    let filePath = `Num_Reserva/${nombre.replace(/\s/g, "_")}.txt`;

    if (fs.existsSync(filePath)) {
        res.send("Ya existe una reservación para este momento");
    } else {
        fs.writeFileSync(filePath, `${nombre}\n${fecha}\n${personas}`);
        res.send("Reservación guardada con éxito");
    }
});

app.get("/leer", (req, res) => {
    let reservas = fs.readdirSync("Num_Reserva").map(file => fs.readFileSync(`Num_Reserva/${file}`, "utf-8")).join("\n\n");
    res.send(reservas || "No hay reservaciones.");
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

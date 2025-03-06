const backendURL = "https://sistema-de-reservas-o0v3.onrender.com"; 

document.addEventListener("DOMContentLoaded", function () {
    // Llenar el select de horas
    const horaSelect = document.getElementById('hora');
    const horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
    horas.forEach(hora => {
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    });

    // Llenar el select de número de personas
    const personasSelect = document.getElementById('personas');
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} persona${i > 1 ? 's' : ''}`;
        personasSelect.appendChild(option);
    }
});

// Mostrar el formulario
document.getElementById("btnAgendar").addEventListener("click", function () {
    document.getElementById("formulario").style.display = "block";  
    document.getElementById("reservaciones").style.display = "none";  
});

// Mostrar las reservaciones
document.getElementById("btnVer").addEventListener("click", function () {
    fetch(`${backendURL}/leer`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo obtener las reservaciones.");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("reservaciones").innerText = data;
            document.getElementById("reservaciones").style.display = "block";  
            document.getElementById("formulario").style.display = "none";  
        })
        .catch(error => {
            console.error(error);
            document.getElementById("reservaciones").innerText = "Hubo un problema al cargar las reservaciones.";
        });
});

// Guardar reservación
document.getElementById("btnGuardar").addEventListener("click", function () {
    let nombre = document.getElementById("nombre").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let personas = document.getElementById("personas").value;

    let datos = { nombre, fecha: `${fecha} ${hora}`, personas };

    fetch(`${backendURL}/guardar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al guardar la reservación.");
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("mensaje").innerText = data;  
        document.getElementById("formulario").style.display = "none";  
    })
    .catch(error => {
        console.error(error);
        document.getElementById("mensaje").innerText = "Hubo un problema al guardar la reservación.";
    });
});

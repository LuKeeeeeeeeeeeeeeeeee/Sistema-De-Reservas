const backendURL = "https://sistema-de-reservas-5p56.onrender.com"; // Asegúrate de que esta URL sea la correcta

document.addEventListener("DOMContentLoaded", function () {
    // Llenar el select de hora con opciones
    const horaSelect = document.getElementById('hora');
    const horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
    horas.forEach(hora => {
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    });

    // Llenar el select de número de personas con opciones
    const personasSelect = document.getElementById('personas');
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} persona${i > 1 ? 's' : ''}`;
        personasSelect.appendChild(option);
    }
});

// Mostrar el formulario al hacer clic en "Agendar Reservación"
document.getElementById("btnAgendar").addEventListener("click", function () {
    document.getElementById("formulario").style.display = "block";  // Mostrar el formulario
    document.getElementById("reservaciones").style.display = "none";  // Ocultar la lista de reservaciones
});

// Mostrar las reservaciones al hacer clic en "Ver Reservaciones"
document.getElementById("btnVer").addEventListener("click", function () {
    fetch(`${backendURL}/leer`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener las reservaciones: ${response.statusText}`);
            }
            return response.json();  // Cambié a .json() para obtener datos JSON
        })
        .then(data => {
            // Mostrar las reservaciones
            let reservacionesHtml = "<ul>";
            data.forEach(res => {
                reservacionesHtml += `<li>${res.nombre} - ${res.fecha} - ${res.personas} persona(s)</li>`;
            });
            reservacionesHtml += "</ul>";

            document.getElementById("reservaciones").innerHTML = reservacionesHtml;
            document.getElementById("reservaciones").style.display = "block";  // Mostrar la lista de reservaciones
            document.getElementById("formulario").style.display = "none";  // Ocultar el formulario
        })
        .catch(error => {
            console.error(error);
            document.getElementById("reservaciones").innerText = "Hubo un problema al cargar las reservaciones.";
        });
});

// Guardar la reservación cuando se haga clic en "Guardar"
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
        return response.text();  // Mostrar el mensaje de éxito
    })
    .then(data => {
        document.getElementById("mensaje").innerText = data;
        document.getElementById("formulario").style.display = "none";  // Ocultar el formulario después de guardar
    })
    .catch(error => {
        console.error(error);
        document.getElementById("mensaje").innerText = "Hubo un problema al guardar la reservación.";
    });
});

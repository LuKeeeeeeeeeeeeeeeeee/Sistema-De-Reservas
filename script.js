const backendURL = "https://reservas-backend.onrender.com";

document.getElementById("btnAgendar").addEventListener("click", function () {
    document.getElementById("formulario").style.display = "block";
    document.getElementById("reservaciones").style.display = "none";
});

document.getElementById("btnVer").addEventListener("click", function () {
    fetch(`${backendURL}/leer`)
        .then(response => response.text())
        .then(data => {
            document.getElementById("reservaciones").innerText = data;
            document.getElementById("reservaciones").style.display = "block";
            document.getElementById("formulario").style.display = "none";
        });
});

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
    .then(response => response.text())
    .then(data => {
        document.getElementById("mensaje").innerText = data;
    });
});
        document.getElementById("mensaje").innerText = data;
    });
});

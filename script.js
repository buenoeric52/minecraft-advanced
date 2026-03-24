// Función para copiar códigos al portapapeles
function copiarCodigo(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        // Esto crea una pequeña alerta visual
        alert("¡Código copiado con éxito! Ya puedes pegarlo en tu proyecto.");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Función por si quieres que los botones de navegación tengan efectos de sonido o algo más
document.querySelectorAll('.btn').forEach(boton => {
    boton.addEventListener('click', () => {
        console.log("Botón presionado: " + boton.innerText);
    });
});
// Lógica para quitar la animación de inicio
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }
    }, 3000); // 3000 significa 3 segundos
});
// Añade esto si creas el botón de comentarios:
function enviarComentario() {
    const box = document.querySelector('.comment-box textarea');
    if(box.value.trim() !== "") {
        alert("¡Erick recibió tu mensaje! Gracias por el feedback.");
        box.value = ""; // Esto limpia el cuadro después de enviar
    } else {
        alert("¡Escribe algo primero!");
    }
}

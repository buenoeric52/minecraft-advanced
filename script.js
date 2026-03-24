/* =========================================
   MC ADVANCED - SCRIPT GLOBAL PRO
   ========================================= */

// 1. LÓGICA DE CARGA (Loader con barra de progreso)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.progress');
    
    // Simulamos que la barra se llena
    if (progress) progress.style.width = '100%';

    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }
    }, 3000); // 3 segundos de carga épica
    
    // Cargar comentarios guardados (simulación)
    cargarComentariosBase();
});

// 2. FUNCIÓN PARA COPIAR CÓDIGOS
function copiarCodigo(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        // Alerta personalizada estilo Minecraft
        alert("¡CÓDIGO COPIADO! Ya puedes usarlo en tu proyecto.");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// 3. SISTEMA DE COMENTARIOS AVANZADO
const comentariosIniciales = [
    { user: "StevePro", msg: "¡La APK 1.26 funciona perfecto!" },
    { user: "AlexDev", msg: "Esos scripts de GameTest están a otro nivel." }
];

function cargarComentariosBase() {
    const container = document.getElementById('comments-list');
    if (!container) return;

    comentariosIniciales.forEach(c => {
        insertarComentarioHTML(c.user, c.msg);
    });
}

function enviarComentario() {
    const box = document.getElementById('user-comment');
    const texto = box.value.trim();

    if (texto !== "") {
        // Añadimos el comentario a la lista visualmente
        insertarComentarioHTML("Tú (ErickDev User)", texto);
        
        alert("¡Gracias por tu feedback! Tu comentario ha sido publicado.");
        box.value = ""; // Limpiar el cuadro
    } else {
        alert("¡Escribe algo antes de enviar!");
    }
}

function insertarComentarioHTML(usuario, mensaje) {
    const container = document.getElementById('comments-list');
    if (!container) return;

    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `
        <div class="comment-user">${usuario}</div>
        <div class="comment-text">${mensaje}</div>
    `;
    
    // Insertar al principio de la lista
    container.prepend(item);
}

// 4. INTERACTIVIDAD DE BOTONES
document.querySelectorAll('.btn').forEach(boton => {
    boton.addEventListener('click', () => {
        console.log("Acción ejecutada: " + boton.innerText);
    });
});

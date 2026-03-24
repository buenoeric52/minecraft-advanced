/* =========================================
   MC ADVANCED - SISTEMA OPERATIVO (v4.0)
   ========================================= */

// 1. GESTIÓN DE CARGA Y LOGS
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const fill = document.querySelector('.fill');
    
    if (fill) fill.style.width = '100%';

    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 1000);
        }
    }, 3500);

    // Cargar comentarios guardados del navegador
    cargarMensajesGuardados();
});

// 2. FUNCIÓN DE COPIADO CON NOTIFICACIÓN FLOTANTE
function copiarCodigo(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        mostrarNotificacion("¡CÓDIGO COPIADO!");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// 3. SISTEMA DE NOTIFICACIONES (Estilo Logro de MC)
function mostrarNotificacion(mensaje) {
    // Crear el elemento de la notificación
    const toast = document.createElement('div');
    toast.className = 'mc-toast';
    toast.innerHTML = `<span class="mc-font" style="font-size:10px">${mensaje}</span>`;
    
    document.body.appendChild(toast);

    // Animación de salida
    setTimeout(() => {
        toast.style.transform = 'translateY(-100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

// 4. CHAT CON MEMORIA (LOCAL STORAGE)
function enviarComentario() {
    const nameInput = document.getElementById('user-name');
    const msgInput = document.getElementById('user-comment');

    const usuario = nameInput.value.trim() || "Jugador";
    const mensaje = msgInput.value.trim();

    if (mensaje !== "") {
        const nuevoMensaje = { usuario, mensaje, fecha: Date.now() };
        
        // Guardar en la lista visual
        agregarMensajeAlChat(usuario, mensaje);
        
        // Guardar en la memoria del navegador
        guardarEnLocal(nuevoMensaje);

        msgInput.value = "";
        mostrarNotificacion("¡MENSAJE ENVIADO!");
    }
}

function agregarMensajeAlChat(usuario, texto) {
    const chatBox = document.getElementById('comments-display');
    if (!chatBox) return;

    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `
        <span class="comment-user">[${usuario.toUpperCase()}]</span> 
        <span class="comment-text">${texto}</span>
    `;
    chatBox.prepend(div);
}

function guardarEnLocal(obj) {
    let historial = JSON.parse(localStorage.getItem('mc_chat')) || [];
    historial.push(obj);
    localStorage.setItem('mc_chat', JSON.stringify(historial));
}

function cargarMensajesGuardados() {
    let historial = JSON.parse(localStorage.getItem('mc_chat')) || [];
    historial.forEach(m => agregarMensajeAlChat(m.usuario, m.mensaje));
}

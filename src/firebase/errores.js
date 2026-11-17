const mensajes = {
    // Autenticación
    "auth/invalid-credential": "Email o contraseña incorrectos.",
    "auth/wrong-password": "Email o contraseña incorrectos.",
    "auth/user-not-found": "Email o contraseña incorrectos.",
    "auth/invalid-email": "El email no es válido.",
    "auth/email-already-in-use": "Ese email ya está registrado.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/too-many-requests": "Demasiados intentos. Probá de nuevo en unos minutos.",
    "auth/network-request-failed": "Sin conexión. Revisá tu internet.",

    // Firestore
    "permission-denied": "No tenés permisos para hacer esta acción.",
    "unavailable": "No se pudo conectar con el servidor. Revisá tu conexión o desactivá el bloqueador de anuncios.",
    "not-found": "El producto no existe o fue eliminado.",

    // Imágenes
    "imagen/subida": "No se pudo subir la imagen. Probá con otra o intentá de nuevo.",
};

export const traducirError = (codigo) =>
    mensajes[codigo] || "Ocurrió un error inesperado. Intentá de nuevo.";
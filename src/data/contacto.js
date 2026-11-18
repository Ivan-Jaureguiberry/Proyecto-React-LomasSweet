export const INSTAGRAM_URL = "https://www.instagram.com/lomas.sweet.alfajores/";
export const INSTAGRAM_USUARIO = "@lomas.sweet.alfajores";

export const WHATSAPP_URL = "https://wa.me/5491100000000";
export const WHATSAPP_TEXTO = "11 0000-0000";

export const EMAIL_GENERAL = "hola@lomassweet.com.ar";
export const EMAIL_MAYORISTAS = "mayoristas@lomassweet.com.ar";

export const SUCURSALES = [
    {
        nombre: "Casa Central",
        direccion: "Av. Hipólito Yrigoyen 8950, Lomas de Zamora",
        horario: "Lun a Sáb · 9 a 20 h",
    },
    {
        nombre: "Sucursal Banfield",
        direccion: "Maipú 320, Banfield",
        horario: "Lun a Sáb · 10 a 19 h",
    },
    {
        nombre: "Sucursal Temperley",
        direccion: "Av. Meeks 150, Temperley",
        horario: "Mar a Dom · 10 a 20 h",
    },
];

// Link de Google Maps para buscar una dirección
export const linkMapa = (direccion) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
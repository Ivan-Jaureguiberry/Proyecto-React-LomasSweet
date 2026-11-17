import {
    collection, doc, getDocs, getDoc,
    addDoc, updateDoc, deleteDoc, writeBatch
} from "firebase/firestore";
import {db} from "./config";

const coleccion = collection(db, "productos");

export const resolverImagen = (ruta) => {
    if (!ruta) return "";
    if (/^https?:\/\//.test(ruta)) return ruta;
    return `${import.meta.env.BASE_URL}${ruta}`;
};

const formatear = (snap) => {
    const datos = snap.data();
    return { ...datos, id: snap.id, image: resolverImagen(datos.image) };
};

export const obtenerProducto = async (id) => {
    const snap = await getDoc(doc(db, "productos", id));
    if (!snap.exists()) {
        const error = new Error("Producto inexistente");
        error.code = "not-found";
        throw error;
    }
    return formatear(snap);
};

export const crearProducto = async (datos) => {
    const ref = await addDoc(coleccion, datos);
    return ref.id;
};

export const actualizarProducto = (id, datos) => {
    return updateDoc(doc(db, "productos", id), datos);
};

export const eliminarProducto = (id) => {
    return deleteDoc(doc(db, "productos", id));
};

// Para pasar los productos de productos.json a Firestore
export const cargarProductosIniciales = async () => {
    const res = await fetch(`${import.meta.env.BASE_URL}data/productos.json`);
    if (!res.ok) throw new Error("No se pudo leer productos.json");

    const productos = await res.json();
    const lote = writeBatch(db);

    productos.forEach(({ id, ...resto }) => {
        lote.set(doc(db, "productos", String(id)), resto);
    });

    await lote.commit();
};

// Subir imagenes a IMGBB
const IMGBB_KEY = "fbbfe0f9b75c1002bbaa61ec393a2dad";

export const subirImagen = async (archivo) => {
    const formData = new FormData();
    formData.append("image", archivo);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: "POST",
        body: formData
    });
    const datos = await res.json().catch(() => null);

    if (!res.ok || !datos?.success) {
        const error = new Error("Falló la subida a IMGBB");
        error.code = "imagen/subida";
        throw error;
    }

    return datos.data.url;
};
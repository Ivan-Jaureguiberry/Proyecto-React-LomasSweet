import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export const enviarMensaje = (datos) => {
    return addDoc(collection(db, "mensajes"), {
        ...datos,
        fecha: serverTimestamp()
    });
};
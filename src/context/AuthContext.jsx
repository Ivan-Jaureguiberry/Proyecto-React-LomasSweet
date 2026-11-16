import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context)
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");

    return context;
};

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    const registrar = async ({ nombre, apellido, email, password }) => {
        const credencial = await createUserWithEmailAndPassword(auth, email, password);
        const { uid } = credencial.user;

        await setDoc(doc(db, "usuarios", uid), { nombre, apellido, email, rol: "usuario" });
        setUsuario({ uid, nombre, apellido, email, rol: "usuario" });

        return credencial;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const desuscribir = onAuthStateChanged(auth, async (usuarioFirebase) => {
            if(!usuarioFirebase) {
                setUsuario(null);
                setCargando(false);
                return;
            }

            let datos = {};
            try {
                const snap = await getDoc(doc(db, "usuarios", usuarioFirebase.uid));
                if (snap.exists()) datos = snap.data();
            } catch (err) {
                console.error("No se pudieron leer los datos del usuario", err);
            }

            setUsuario({
                uid: usuarioFirebase.uid,
                email: usuarioFirebase.email,
                nombre: datos.nombre ?? "",
                apellido: datos.apellido ?? "",
                rol: datos.rol ?? "usuario"
            });
            setCargando(false);
        });

        return desuscribir;
    }, []);

    return (
        <AuthContext.Provider value = {{
            usuario,
            cargando,
            esAdmin: usuario?.rol === "admin",
            registrar,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
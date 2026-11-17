import styles from "./FormProducto.module.css";

const FormProducto = ({
    datosForm,
    errores,
    errorGeneral,
    vistaPrevia,
    esEdicion,
    cargando,
    manejarCambio,
    manejarCambioImagen,
    manejarEnvio,
    onCancelar
}) => {
    const claseInput = (campo, base = styles.input) =>
        `${base} ${errores[campo] ? styles.inputError : ""}`;

    return (
        <form onSubmit={manejarEnvio} className={styles.formulario} noValidate>
            <div className={styles.campo}>
                <label htmlFor="title" className={styles.label}>Nombre del producto</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Ej: Alfajor de Pistacho"
                    value={datosForm.title}
                    onChange={manejarCambio}
                    className={claseInput("title")}
                />
                {errores.title && <span className={styles.mensajeError}>{errores.title}</span>}
            </div>

            <div className={styles.fila}>
                <div className={styles.campo}>
                    <label htmlFor="price" className={styles.label}>Precio (AR$)</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        placeholder="Ej: 4000"
                        value={datosForm.price}
                        onChange={manejarCambio}
                        className={claseInput("price")}
                    />
                    {errores.price && <span className={styles.mensajeError}>{errores.price}</span>}
                </div>

                <div className={styles.campo}>
                    <label htmlFor="stock" className={styles.label}>Stock</label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Ej: 50"
                        value={datosForm.stock}
                        onChange={manejarCambio}
                        className={claseInput("stock")}
                    />
                    {errores.stock && <span className={styles.mensajeError}>{errores.stock}</span>}
                </div>
            </div>

            <div className={styles.campo}>
                <label htmlFor="description" className={styles.label}>Descripción</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Contá cómo es el relleno, las tapas y el baño..."
                    value={datosForm.description}
                    onChange={manejarCambio}
                    className={claseInput("description", styles.textarea)}
                />
                {errores.description && <span className={styles.mensajeError}>{errores.description}</span>}
            </div>

            <div className={styles.campo}>
                <label htmlFor="imagen" className={styles.label}>
                    {esEdicion ? "Cambiar imagen (opcional)" : "Imagen del producto"}
                </label>
                <input
                    id="imagen"
                    name="imagen"
                    type="file"
                    accept="image/*"
                    onChange={manejarCambioImagen}
                    className={styles.archivo}
                />
                {errores.imagen && <span className={styles.mensajeError}>{errores.imagen}</span>}
                {vistaPrevia && <img src={vistaPrevia} alt="Vista previa" className={styles.vistaPrevia} />}
            </div>

            {errorGeneral && <p className={styles.errorGeneral} role="alert">{errorGeneral}</p>}

            <div className={styles.acciones}>
                <button type="button" onClick={onCancelar} className={styles.botonSecundario}>
                    Cancelar
                </button>
                <button type="submit" className={styles.boton} disabled={cargando}>
                    {cargando ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear producto"}
                </button>
            </div>
        </form>
    );
};

export default FormProducto;
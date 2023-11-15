import { useState, useEffect } from "react";
import cerrarModal from "../img/cerrar.svg";
import Mensaje from "./Mensaje";
const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar,
}) => {
    const [mensaje, setMensaje] = useState("");
    const [mostrarTexto, setMostrarTexto] = useState(true);

    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [id, setId] = useState("");
    const [fecha, setFecha] = useState("");

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, [gastoEditar]);

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({})
        setMostrarTexto(false)
        

        setTimeout(() => {
            setModal(false);
        }, 200);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([categoria, nombre, cantidad].includes("")) {
            setMensaje("Todos los campos son obligatorios");

            setTimeout(() => {
                setMensaje("");
            }, 3000);
            return;
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha });
    };
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={cerrarModal} alt="cerrar modal" onClick={ocultarModal} />
            </div>
            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            >
                <legend>{gastoEditar && mostrarTexto ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Añade el Nombre del Gasto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="number"
                        id="cantidad"
                        placeholder="Añade la Cantidad del Gasto. ej. 300"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="varios">Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                    <input
                        type="submit"
                        value={gastoEditar && nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
                </div>
            </form>
        </div>
    );
};

export default Modal;

/* import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context" */

import { BasicContainer, /* , Modal */ } from "../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalPropio } from '../../components';
import { Button } from "@/components/ui/button";


const Menu = () => {
    /* const { actions: ua } = useContext(UserContext)

    const nav = useNavigate()

    const permisos = ua.user().permissions
    const permisosOrigen = permisos.filter((permiso) =>
        permiso.name.startsWith("origen.")
    ) */

    /////////////
    // prueba <ModalPropio/>
    ///////////
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false)

    const nav = useNavigate();

    interface Permiso {
        name: string;
    }
    const permisosOrigen = [
        { name: "origen.ejemplo" },
        { name: "origen.login" },
        { name: "origen.examen" },
    ];
    const hasPermission = (permisoName: string): boolean => {
        return true;
    };

    return (
        <BasicContainer titulo='Componente Menu a traves de un modal'>

            <div className="p-4 ">
                <Button
                    onClick={handleOpen}
                    className=" text-black  hover:bg-blue-600 hover:text-gray-200   "
                >
                    Abrir menu
                </Button>
                <ModalPropio
                    show={showModal}
                    onHide={handleClose}
                    title={() => <h3 style={{ color: 'blue' }}>Modal sin bootstrap</h3>}
                    footer={() => (
                        <button
                            onClick={handleClose}
                            className="btn btn-danger"
                        >
                            Cerrar
                        </button>
                    )}
                >
                    <p>Este es un contenido de prueba para el componente Modal</p>
                    <div className='container_menu p-3 rounded'>
                        <div className='bg-body p-3 rounded'>
                            <h2 className='text-center m-0'>Menú Principal</h2>
                            <hr />
                            <div className='d-grid gap-2 col-8 mx-auto justify-content-center'>

                                {permisosOrigen.map((permiso) => {
                                    const nombreOrigen = permiso.name.split(".")[1]
                                    return (

                                        <Button
                                            className=' border-blue-600 text-black w-100 btn-menu'
                                            onClick={() =>
                                                nav(`/${nombreOrigen}`)
                                            }
                                            hidden={!hasPermission(permiso.name)}
                                            key={permiso.name}
                                        >
                                            {nombreOrigen.toUpperCase()}
                                        </Button>
                                    )
                                })}
                                <Button
                                    className=' border-blue-600 text-black w-100 btn-menu'
                                    onClick={() => nav("/404vadarerror")}
                                >
                                    404 notFound
                                </Button>
                                {/* <button
                                    className='btn btn-primary text-black w-100 btn-menu'
                                    onClick={() => nav("/PageExample")}
                                >
                                    prueba de container
                                </button> */}
                            </div>
                        </div>
                    </div>
                </ModalPropio>
            </div>


        </BasicContainer>
    )


}

export default Menu;
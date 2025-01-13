import { useNavigate } from "react-router-dom";
import { NavigateBeforeOutlined } from "@mui/icons-material"
import ContainerSecundario from "../../components/Containers/ContainerSecundario"
import TaskBoard from "@/components/Tasks/TaskList";
import { Button } from "@/components/ui/button";
import { getStorage, setStorage } from "@/utils/localStorage";
import { NewTaskButton } from "@/components/Tasks/NewTaksButton";


const ExamenPage = () => {
    const nav = useNavigate();
    const storage = getStorage()
    const user = storage?.user

    const userIsAdmin = user?.role[0].name === 'Admin'
    const logout = () => {
        setStorage(null)
        nav("/login")
    }
    return (
        <ContainerSecundario
            titulo="Examen Modernización"
            className="custom-section"
            containerClass="container_custom p-4 rounded-lg"
            headerClass="bg-light p-4 rounded-lg shadow"
            tituloClass="col-12 text-center text-primary fs-3"
            actions={
                <div className="flex justify-between w-full">
                    <Button
                        onClick={() => nav("/")}
                        className=" hover:bg-blue-400 align-items-center"
                    >
                        <NavigateBeforeOutlined /> Volver al Home
                    </Button>

                    {!!user && <div className="flex items-center gap-2">
                        <span>Bienvenido: <span className="ms-2">{user?.name}</span></span>

                        <Button
                            onClick={logout}
                            className=" hover:bg-red-400 align-items-center"
                        >
                            Cerrar Sesión
                        </Button>
                    </div>
                    }
                </div>
            }
        >
            <p>
                Esta es la pagina del Examen de la secretaria de modernizacion de la municipalidad de Neuquen
            </p>

            {!!user && <div>
                {userIsAdmin && <NewTaskButton />}
                <TaskBoard userRoleId={user.role[0].id} userId={user.id} />
            </div>
            }
            {!user && <Button
                onClick={() => nav("/login")}
                className=" hover:bg-green-400 align-items-center"
            >
                Iniciar Sesión
            </Button>}
        </ContainerSecundario>
    )
}

export default ExamenPage

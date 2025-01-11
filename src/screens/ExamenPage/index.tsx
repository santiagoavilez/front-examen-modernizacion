import { useNavigate } from "react-router-dom";
import { NavigateBeforeOutlined } from "@mui/icons-material"
import ContainerSecundario from "../../components/Containers/ContainerSecundario"
import TaskBoard from "@/components/Tasks/TaskList";
import { Button } from "@/components/ui/button";


const ExamenPage = () => {
    const nav = useNavigate();
    return (
        <ContainerSecundario
            titulo="Examen Modernización"
            className="custom-section"
            containerClass="container_custom p-4 rounded-lg"
            headerClass="bg-light p-4 rounded-lg shadow"
            tituloClass="col-12 text-center text-primary fs-3"
            actions={
                <div className="d-flex">
                    <Button
                        onClick={() => nav("/")}
                        className=" hover:bg-blue-400 align-items-center"
                    >
                        <NavigateBeforeOutlined /> Volver al Home
                    </Button>
                </div>
            }
        >
            <p>
                Esta es la pagina del Examen de la secretaria de modernizacion de la municipalidad de Neuquen
            </p>

            <TaskBoard />

        </ContainerSecundario>
    )
}

export default ExamenPage

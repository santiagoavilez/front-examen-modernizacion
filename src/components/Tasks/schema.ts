import { array, number, object, string } from "yup"

export const schema = object({
    title: string().required("El titulo es requerido"),
    description: string().required("La descripcion es requerida"),
    priority: object({ label: string(), value: string() }).required(
        "La prioridad es requerida"
    ),
    users: array(
        object({
            id: number(),
            name: string(),
        }).optional()
    ),
})

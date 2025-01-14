import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Input } from "../../components"

import { schema } from "./schema"
import { axios } from "@/utils/axios"
import { User } from "@/interface"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ReactSelect from 'react-select'
import { Label } from "../ui/label"
import { Task } from "@/interface/Task"
import { getStorage } from "@/utils/localStorage"

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    task: Task
}

const fetchUsers = async () => {
    const response = await axios().get("/users");
    return response.data;
};

const postTask = async ({ form, taskId }: { form: any; taskId: number }) => {
    const response = await axios().put(`/tasks/${taskId}`, form);
    return response.data;
}

const EditTaskForm = ({ setOpen, task }: Props) => {
    const taskPriorityValue = {
        label: task.priority.name,
        value: task.priority.id
    }
    const { register, handleSubmit, formState, control } = useForm({
        resolver: yupResolver(schema),
    })
    const taskquery = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
    const { data: dataUsers, isLoading, isError } = taskquery;
    const users: User[] = dataUsers;

    const queryClient = useQueryClient()
    const { isPending: isLoadingTask, mutate } = useMutation({
        mutationFn: postTask,
        onSuccess: async () => {
            queryClient.fetchQuery({ queryKey: ["task_list"] })
            setOpen(false)
        }
    })

    const storage = getStorage()
    const user = storage?.user

    const userIsAdmin = user?.role[0].name === 'Admin'
    // primero se valida si esta cargando, si hay un error o si no hay users
    if (isLoading) return <p className="text-center">Cargando users...</p>;
    if (isError) return <p className="text-center text-red-500">Error al cargar las users.</p>;
    if (!users && !isLoading && !isError) return <p>no hay users aun</p>;

    const formatUsers = (users: User[]) => {
        const formattedUsers = users.map(user => ({
            value: user.id,
            label: user.name
        }));
        return formattedUsers;
    }
    const onSubmit = async (form: any) => {
        // const data = await postForm("login", form, showSpinner)

        if (!form.priority.value) {
            form.priority_id = 2

        }
        else {
            form.priority_id = parseInt(form.priority.value);

        }
        if (form?.users) {
            const usersTask = form.users.map((user: { value: number, label: string }) => ({
                id: user.value,
                name: user.label
            }));
            form.users = usersTask;
        }

        mutate({ form, taskId: task.id })


    }
    return (
        <div className=''>

            <form onSubmit={handleSubmit(onSubmit)} className='p-3'>
                <Input
                    className={{
                        container: "mb-3",
                        label: "form-label text-muted",
                        input: "form-control form-control shadow-sm",
                    }}
                    defaultValue={task.title}
                    invalidMsg={formState.errors.title?.message}
                    label={"Titulo*"}
                    register={{ ...register("title") }}
                />
                <Input
                    className={{
                        label: "form-label text-muted",
                        input: "form-control form-control shadow-sm",
                    }}
                    defaultValue={task.description}
                    invalidMsg={formState.errors.description?.message}
                    label='Descripcion corta *'
                    register={{ ...register("description") }}
                />
                {userIsAdmin && <>

                    <label className=' form-label text-muted'>Prioridad</label>
                    <Controller
                        control={control}
                        name="priority"
                        render={({
                            field: { onChange, value, name, ref },
                        }) => (
                            <ReactSelect
                                isSearchable
                                onChange={onChange}
                                value={value ? value : taskPriorityValue}
                                name={name}
                                ref={ref}
                                placeholder='Seleccionar prioridad'
                                className="py-2"
                                options={[
                                    {
                                        label: "Baja",
                                        value: "1"
                                    },
                                    {
                                        label: "Media",
                                        value: "2"
                                    },
                                    {
                                        label: "Alta",
                                        value: "3"
                                    }
                                ]}
                            />
                        )}
                    />
                    {formState.errors.priority && <Label className='text-danger'>{formState.errors.priority?.message}</Label>}
                    <label className=' form-label text-muted'>Usuarios asignados</label>

                    <Controller
                        control={control}
                        name="users"

                        render={({
                            field: { onChange, value, name, ref },
                        }) => (
                            <ReactSelect
                                isMulti
                                isSearchable
                                onChange={onChange}
                                value={value ? value : formatUsers(task.users)}
                                name={name}
                                ref={ref}
                                isLoading={isLoading}
                                loadingMessage={() => 'Cargando usuarios...'}
                                placeholder='Seleccionar usuarios'
                                options={formatUsers(users)}
                            />
                        )}
                    />
                    {formState.errors.users && <Label className='text-danger'>{formState.errors.users.message}</Label>}
                </>
                }
                <div className='d-flex justify-content-center mt-3'>
                    <button
                        type='submit'
                        className='btn btn-primary  w-100 py-2'
                        disabled={isLoading}
                        style={{ fontSize: "1.1rem", fontWeight: "500" }}
                    >
                        {isLoadingTask ? "Cargando..." : "Editar tarea"}
                    </button>
                </div>
            </form>

        </div>
    )
}

export default EditTaskForm

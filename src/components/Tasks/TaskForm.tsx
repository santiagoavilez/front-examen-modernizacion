import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Input } from "../../components"

import { schema } from "./schema"
import { axios } from "@/utils/axios"
import { User } from "@/interface"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ReactSelect from 'react-select'
import { Label } from "../ui/label"

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const fetchUsers = async () => {
    const response = await axios().get("/users");
    return response.data;
};

const postTask = async (form: any) => {
    const response = await axios().post("/task", form);
    return response.data;
}

const TaskForm = ({ setOpen }: Props) => {
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
        console.log('formulario enviado', form.priority)
        if (!form.priority.value) {
            form.priority_id = 2
            console.log('update', form)

        }
        else {
            form.priority_id = parseInt(form.priority.value);
            console.log('update int', form)

        }
        if (form?.users) {
            const usersTask = form.users.map((user: { value: number, label: string }) => ({
                id: user.value,
                name: user.label
            }));
            form.users = usersTask;
            console.log('formatted users', form);
        }

        mutate(form)


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
                    invalidMsg={formState.errors.title?.message}
                    label={"Titulo*"}
                    register={{ ...register("title") }}
                />
                <Input
                    className={{
                        label: "form-label text-muted",
                        input: "form-control form-control shadow-sm",
                    }}
                    invalidMsg={formState.errors.description?.message}
                    label='Descripcion corta *'
                    register={{ ...register("description") }}
                />
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
                            value={value ? value : {
                                label: "Media",
                                value: "2"
                            }}
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
                            value={value ? value : []}
                            name={name}
                            ref={ref}
                            isLoading={isLoading}
                            loadingMessage={() => 'Cargando usuarios...'}
                            placeholder='Seleccionar usuarios'
                            // se debe formatear los usuarios para que se vean en el select este error se debe a que el select espera un array de objetos con value y label
                            options={formatUsers(users)}
                        />
                    )}
                />
                {formState.errors.users && <Label className='text-danger'>{formState.errors.users.message}</Label>}
                {/* <SelectSearch
                    isMulti
                    className={{
                        container: "flex flex-col py-2",
                        label: "text-muted",
                    }}
                    options={formatUsers(users)
                    }
                    label="Usuarios"
                /> */}
                <div className='d-flex justify-content-center mt-3'>
                    <button
                        type='submit'
                        className='btn btn-primary  w-100 py-2'
                        disabled={isLoading}
                        style={{ fontSize: "1.1rem", fontWeight: "500" }}
                    >
                        {isLoadingTask ? "Cargando..." : "Añadir"}
                    </button>
                </div>
            </form>

        </div>
    )
}

export default TaskForm

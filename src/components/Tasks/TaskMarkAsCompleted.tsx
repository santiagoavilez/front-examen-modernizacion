import { useState } from 'react'
import {
    Dialog,

    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose, DialogDescription } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '@/utils/axios'


const markTask = async ({ taskId, userHasMarkedTaskAsCompleted, userId }: Props) => {
    const response = await axios().post(`/tasks/${taskId}/toggle-completion`, {
        userId,
        isCompleted: !userHasMarkedTaskAsCompleted,
    });
    return response.data;
}

interface Props {
    taskId: number
    userId: number
    userHasMarkedTaskAsCompleted: boolean
}

export default function TaskMarkAsCompleted({ taskId, userId, userHasMarkedTaskAsCompleted }: Props) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const { mutate, isPending } = useMutation({
        mutationFn: () => markTask({ taskId, userHasMarkedTaskAsCompleted, userId }),
        onSuccess: () => {
            queryClient.fetchQuery({ queryKey: ["task_list"] })
            setOpen(false)
        }
    })
    const handleTaskCompletionToggle = () => {
        mutate();
    };
    console.log('userHasMarkedTaskAsCompleted', userHasMarkedTaskAsCompleted)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {userHasMarkedTaskAsCompleted ? <Button> Desmarcar como completada </Button> : <Button> Marcar como completada </Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {userHasMarkedTaskAsCompleted
                            ? "Desmarcar tarea como completada"
                            : "Marcar tarea como completada"}
                    </DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de {userHasMarkedTaskAsCompleted ? "desmarcar" : "marcar"} tu parte como completada?
                    </DialogDescription>
                </DialogHeader>
                {/* Botón dentro del diálogo */}
                <Button
                    onClick={handleTaskCompletionToggle}
                    disabled={isPending}
                    className="w-full"
                >
                    {isPending
                        ? "Enviando..."
                        : userHasMarkedTaskAsCompleted
                            ? "Desmarcar parte como completada"
                            : "Marcar parte como completada"}
                </Button>
                <DialogClose asChild>

                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

import { useState } from 'react'
import {
    Dialog,

    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from 'lucide-react'
import { DialogClose, DialogDescription } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '@/utils/axios'


const destroyTask = async ({ taskId }: { taskId: number }) => {
    const response = await axios().delete(`/tasks/${taskId}`)
    return response.data
}

export default function DeleteTaskButton({ taskId }: { taskId: number }) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const { mutate, isPending } = useMutation({
        mutationFn: () => destroyTask({ taskId }),
        onSuccess: () => {
            queryClient.fetchQuery({ queryKey: ["task_list"] })

            setOpen(false)
        }
    })
    const handleDelete = () => {
        console.log("Deleting task")
        mutate()
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Trash2 />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Eliminar tarea</DialogTitle>
                    <DialogDescription>Esta accion es permanente e irreversible</DialogDescription>
                </DialogHeader>
                <DialogClose asChild onClick={() => handleDelete()} >
                    <Button variant="destructive">{isPending ? 'Eliminando...' : 'Eliminar Tarea '}</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

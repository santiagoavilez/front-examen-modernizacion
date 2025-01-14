import { useState } from 'react'
import {
    Dialog,

    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from 'lucide-react'
import EditTaskForm from './EditTaskForm'
import { Task } from '@/interface/Task'
export default function TaskEditButton({ task }: { task: Task }) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Pencil className='hover:fill-black' />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Editar tarea</DialogTitle>

                </DialogHeader>
                <EditTaskForm task={task} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}

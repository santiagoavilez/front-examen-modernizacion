
import { Button } from "@/components/ui/button"
import {
    Dialog,

    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TaskForm from "./TaskForm"
import { useState } from "react"

export function NewTaskButton() {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Añadir tarea</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Añadir tarea</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <TaskForm setOpen={setOpen} ></TaskForm>

            </DialogContent>
        </Dialog>
    )
}

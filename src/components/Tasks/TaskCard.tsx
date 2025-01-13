import { Task } from "@/interface/Task";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Pencil } from "lucide-react";
import TaskEditButton from "./TaskEditButton";

const TaskCard = ({ task }: { task: Task }) => {

    const getNameInitials = (name: string) => {
        return name.split(" ").map(word => word[0]).join("");
    }
    return (
        <div className="bg-white shadow-md p-3 flex flex-col gap-2 rounded-md relative">
            <div className="flex justify-end absolute top-2 right-2 cursor-pointer">
                <TaskEditButton task={task} />
            </div>
            <h3 className="font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            {/* <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{task.priority.name}</span> */}
            <TaskPriorityBadge {...task.priority} />
            <div className="flex space-x-2 flex-wrap items-start">
                {task.users.map(user => (
                    <div key={user.id} className="flex items-center space-x-2">
                        {/* <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" /> */}

                        <Avatar>
                            <AvatarFallback>{getNameInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskCard;



const TaskPriorityBadge = (priority: { name: string, id: number }) => {

    const priorityColors: { [key in 1 | 2 | 3]: string } = {
        1: "bg-green-100 text-green-800",
        2: "bg-yellow-100 text-yellow-800",
        3: "bg-red-100 text-red-800"
    }

    return (
        <span className={`w-fit text-xs px-2 py-1 rounded-full  ${priorityColors[priority.id as 1 | 2 | 3]}`}>{priority.name}</span>
    )

}
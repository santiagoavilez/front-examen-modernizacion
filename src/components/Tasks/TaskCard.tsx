import { Task } from "@/interface/Task";
import { Avatar, AvatarFallback } from "../ui/avatar";
import TaskEditButton from "./TaskEditButton";
import DeleteTaskButton from "./DeleteTaskButton";
import { getStorage } from "@/utils/localStorage";
import TaskMarkAsCompleted from "./TaskMarkAsCompleted";

const TaskCard = ({ task }: { task: Task }) => {
    const storage = getStorage()
    const user = storage?.user

    const userIsAdmin = user?.role[0].name === 'Admin'
    const getNameInitials = (name: string) => {
        return name.split(" ").map(word => word[0]).join("");
    }

    const userIsAsingnedtoTask = task.users.some(user => user.id === storage?.user?.id)
    console.log("userIsAsingnedtoTask", userIsAsingnedtoTask)
    const userHasMarkedTaskAsCompleted = task.users.some(user => user.id === storage?.user?.id && user.is_completed)
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
                        {user.is_completed ? (
                            <span className="text-green-500">✔</span>
                        ) : (
                            <span className="text-red-500">✘</span>
                        )}
                    </div>
                ))}
            </div>
            {userIsAdmin && <div className="absolute bottom-2 right-2 flex gap-2 cursor-pointer text-red-600">

                <DeleteTaskButton taskId={task.id} />
            </div>}

            {userIsAsingnedtoTask && <div>
                {user?.id && (
                    <TaskMarkAsCompleted taskId={task.id} userId={user.id} userHasMarkedTaskAsCompleted={userHasMarkedTaskAsCompleted} />
                )}

            </div>}

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
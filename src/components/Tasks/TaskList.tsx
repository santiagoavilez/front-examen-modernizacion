import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Task } from "@/interface/Task";
import { axios } from "@/utils/axios";
import TaskCard from "./TaskCard";

const fetchTasks = async ({ userRoleId, userId }: TaskBoardProps) => {
    const response = await axios().get("/tasks", {
        params: { userRoleId, userId }
    });
    return response.data;
};

interface TaskBoardProps {
    userRoleId: number;
    userId: number
}

const TaskBoard = ({ userRoleId, userId }: TaskBoardProps) => {
    console.log("userRoleId", userRoleId);
    const taskquery = useQuery({ queryKey: ["task_list"], queryFn: () => fetchTasks({ userRoleId, userId }) });
    const { data: dataTasks, isLoading, isError } = taskquery;
    const tasks: Task[] = dataTasks;
    console.log(tasks);

    if (isLoading) return <p className="text-center">Cargando tareas...</p>;
    if (isError) return <p className="text-center text-red-500">Error al cargar las tareas.</p>;
    if (!tasks && !isLoading && !isError) return <p>no hay tareas aun</p>;
    const tasksByStatus: { [key: string]: Task[] } = {
        "pendiente": tasks?.filter(task => task.status.name === "Pendiente"),
        "enProgreso": tasks?.filter(task => task.status.name === "En Progreso"),
        "completada": tasks?.filter(task => task.status.name === "Completado"),
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {(["pendiente", "enProgreso", "completada"] as const).map((statusKey, index) => (
                <TaskColumn key={index} title={statusKey} tasks={tasksByStatus[statusKey]} />
            ))}
        </div>
    );
};

const TaskColumn = ({ title, tasks }: { title: "pendiente" | "enProgreso" | "completada"; tasks: Task[] }) => {
    const columnColors = {
        pendiente: "bg-yellow-100 border-yellow-300",
        enProgreso: "bg-blue-100 border-blue-300",
        completada: "bg-green-100 border-green-300",
    };

    return (
        <div className={`border rounded-lg ${columnColors[title]} p-4`}>
            <h2 className="text-lg font-bold mb-4 capitalize">{title.replace(/enProgreso/, "En Progreso")}</h2>
            <div className="space-y-2">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

// const TaskCard = ({ task }: { task: Task }) => (
//     <div className="bg-white shadow-md p-3 rounded-md">
//         <h3 className="font-semibold text-gray-800">{task.title}</h3>
//         <p className="text-sm text-gray-600">{task.description}</p>
//         <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{task.priority.name}</span>
//         {task.users.map(user => (
//             <div key={user.id} className="flex items-center space-x-2">
//                 {/* <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" /> */}
//                 <span className="text-sm">{user.name}</span>

//             </div>
//         ))}

//     </div>
// );

export default TaskBoard;

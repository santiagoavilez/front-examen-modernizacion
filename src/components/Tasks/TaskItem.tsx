import React from "react";

const TaskItem = ({ task, onDelete }) => {
    return (
        <li className="border p-4 rounded shadow-md bg-white flex justify-between items-center">
            <div>
                <h2 className="text-lg font-bold">{task.title}</h2>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm">
                    <span className="font-semibold">Status:</span> {task.status.name}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Priority:</span> {task.priority.name}
                </p>
            </div>
            <div className="space-x-2">
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => alert("Edit not implemented")}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TaskItem;

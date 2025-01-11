import React, { useState } from "react";

const TaskForm = ({ onSave }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [statusId, setStatusId] = useState(1);
    const [priorityId, setPriorityId] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = { title, description, status_id: statusId, priority_id: priorityId };

        fetch("http://localhost:8000/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((data) => {
                onSave(data);
                setTitle("");
                setDescription("");
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <form className="p-4 border rounded shadow-md bg-white space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold">Add Task</h2>
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1"
                ></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                    value={statusId}
                    onChange={(e) => setStatusId(e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1"
                >
                    <option value="1">Pending</option>
                    <option value="2">In Progress</option>
                    <option value="3">Completed</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">Priority</label>
                <select
                    value={priorityId}
                    onChange={(e) => setPriorityId(e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1"
                >
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                </select>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
        </form>
    );
};

export default TaskForm;

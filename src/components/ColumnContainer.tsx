import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";

import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities"
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    
    tasks: Task[];
    createTask: (columnId: Id) => void;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask } = props;
    const [editMode, setEditMode] = useState(false);
    const taskIds = useMemo(() => {
        return tasks.map((task) => task.id)
    }, [tasks])

    const {setNodeRef, attributes, listeners, transform, transition, isDragging} =useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        },
        disabled: editMode
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div 
        ref={setNodeRef} 
        style={style}
        className="
            bg-columnBackgroundColor
            opacity-60
            border-2
            border-cyan-400
            w-[350px]
            h-[500px]
            max-h-[500px]
            rounded-md
            flex
            flex-col
        "></div>
        )
    }


    return (
        <div 
        ref={setNodeRef} 
        style={style}
        className="
            bg-columnBackgroundColor
            w-[350px]
            h-[500px]
            max-h-[500px]
            rounded-md
            flex
            flex-col
        ">
            {/* column title */}
            <div
                {...attributes}
                {...listeners} 
                onClick={() => {
                    setEditMode(true);
                }}
                className="
                bg-mainBackgroundColor
                text-md
                h-[60px]
                cursor-grab
                rounded-md
                rounded-b-none
                p-3
                font-bold
                border-columnBackgroundColor
                border-4
                flex
                items-center
                justify-between
            ">
                <div className="flex gap-2">
                    <div className="
                        flex
                        justify-center
                        items-center
                        bg-columnBackgroundColor
                        px-2
                        px-1
                        text-sm
                        rounded-full
                    ">o
                        </div>
                        {!editMode && column.title}
                        {editMode && (
                            <input
                            className="
                                bg-black
                                focus:border-yellow-500
                                border
                                rounded
                                outline-none
                                px-2
                            "
                            value={column.title}
                             autoFocus
                             onChange={(e) => {
                                updateColumn(column.id, e.target.value);
                             }}
                             onBlur={() => {
                                setEditMode(false);
                             }}
                             onKeyDown={(e) => {
                                if (e.key !== 'Enter') return
                                setEditMode(false);
                             }}
                              />
                        )}
                        </div>
                        <button className="
                            stroke-gray-500
                            transition
                            ease-in-out
                            delay-100
                            hover:stroke-rose-500
                            hover:-translate-y-1 hover:scale-110
                            hover:bg-columnBackgroundColor
                            hover:
                        " onClick={() => {
                            deleteColumn(column.id);
                        }}><TrashIcon /></button>
                </div>
            {/* column task container */}
            <div className="flex flex-grow flex-col
                gap-4 p-2 overflow-x-hidden overflow-y-auto
            ">
                <SortableContext items={taskIds}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>
                ))}
                </SortableContext>
            </div>
            {/* column footer */}
            <button className="
                flex gap-2 items-center
                border-columnBackgroundColor border-2
                rounded-md p-4 border-x-columnBackgroundColor
                hover:bg-mainBackgroundColor hover:text-cyan-300
                active:bg-black 
            "
            onClick={() => {
                createTask(column.id);
            }}
            ><PlusIcon /> Add Transaction</button>
        </div>
    )
}

export default ColumnContainer

import PlusIcon from '../icons/PlusIcon';
import {useMemo, useState} from 'react';
import { Column, Id, Task } from '../types'
import ColumnContainer from './ColumnContainer';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'; 
import { SortableContext, arrayMove } from '@dnd-kit/sortable'; 
import { createPortal } from 'react-dom';
function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
    
    const generateId = () => {
         return Math.floor((Math.random()*10001));
    }
    
    const createNewColumn = () => {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Staff ${columns.length + 1}`
        };

        setColumns([...columns, columnToAdd]);

    } 
    
    const deleteColumn = (id: Id) => {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);
    }


    const updateColumn = (id: Id, title: string) => {
        const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return { ...col, title };
        })

        setColumns(newColumns);
    }

    const createTask = (columnId: Id) => {
        const newTask: Task =  {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`
        }
        setTasks([...tasks, newTask]);
    }

    const onDragStart = (event: DragStartEvent) => {
        // console.log("Dragging started...", event)
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }
    }
    const onDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) return;

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeColumnId
            );
            const overColumnIndex = columns.findIndex(
                (col) => col.id === overColumnId
            );

            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        });
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        })
    )
    return (
        
        <div className='
            m-auto
            flex
            min-h-screen
            w-full
            items-center
            overflow-x-auto
            overflow-y-hidden
            px-[40px]
        '>
            
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className='m-auto flex gap-4'>
                <div className='flex gap-4'>
                    <SortableContext items={columnsId}>
                    {columns.map((col) => (
                        <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask} />
                    ))}
                    </SortableContext>
                    </div>
                <button className='
                h-[60px] w-[350px] min-w-[350px] 
                cursor-pointer rounded-2xl
                bg-mainBackgroundColor
                border-2
                border-none
                p-4 
                ring-cyan-300 hover:ring-2 sky-300
                flex gap-2
                ' onClick={() => {
                    createNewColumn()
                }}><PlusIcon/>Add Staff</button>
            </div>
            {createPortal(
                <DragOverlay>
                    {activeColumn && (<ColumnContainer column={activeColumn} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask}/>)}
                </DragOverlay>,
                document.body // Add the missing second argument
            )}
            </DndContext>
            
        </div>
    );
}

export default KanbanBoard;

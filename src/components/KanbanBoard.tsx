import PlusIcon from '../icons/PlusIcon';
import {useState} from 'react';
import { Column } from '../types'


function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);
    const generateId = () => {
         return Math.floor((Math.random()*10001));
    }
    console.log(columns);
    const createNewColumn = () => {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`
        };

        setColumns([...columns, columnToAdd]);

    }
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
            <div className='m-auto flex gap-4'>
                <div className='flex gap-2'>{columns.map((col) => (
                    <div>{col.title}</div>
                ))}</div>
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
                }}><PlusIcon/>Add Column</button>
            </div>
        </div>
    );
}

export default KanbanBoard;

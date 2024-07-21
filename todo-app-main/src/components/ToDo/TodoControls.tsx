import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import clsx from 'clsx'
import s from '@/components/ToDo/controls.module.css'

interface TodoControlsProps {
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
}

const TodoControls: React.FC<TodoControlsProps> = ({ onEdit, onDelete }) => {
    const controlStyles = [
        s.todoControl,
        'mx-1'
    ]
    return (
        <ButtonGroup className="mx-2">
            <EditNoteIcon className={clsx(controlStyles)} color='primary' onClick={(e)=>onEdit(e)} />
            <DeleteForeverIcon className={clsx(controlStyles)} color="error" onClick={(e)=>onDelete(e)} />
        </ButtonGroup>
    );
};

export default TodoControls;

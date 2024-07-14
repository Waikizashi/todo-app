import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import clsx from 'clsx'
import s from '@/components/controls.module.css'

interface TodoControlsProps {
    onEdit: () => void;
    onDelete: () => void;
}

const TodoControls: React.FC<TodoControlsProps> = ({ onEdit, onDelete }) => {
    const controlStyles = [
        s.todoControl,
        'mx-1'
    ]
    return (
        <ButtonGroup className="mx-2">
            <EditNoteIcon className={clsx(controlStyles)} color='primary' onClick={onEdit} />
            <DeleteForeverIcon className={clsx(controlStyles)} color="error" onClick={onDelete} />
        </ButtonGroup>
    );
};

export default TodoControls;

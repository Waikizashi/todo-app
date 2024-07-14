import React from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Fab } from '@mui/material';

interface TodoAddFormProps {
    onAddClick: () => void;
    onSortChange: (sortBy: string | null) => void;
    listName: string;
}

const TodoAddForm: React.FC<TodoAddFormProps> = ({ onAddClick, onSortChange, listName }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>{listName}</h3>
            <div className="d-flex align-items-center">
                <Fab color='primary' size='small'>
                    <AddIcon onClick={onAddClick} className="mx-2" />
                </Fab>
                <DropdownButton
                    title={<FilterAltIcon />}
                    onSelect={(sortBy: string | null) => onSortChange(sortBy)}
                    className="mx-2"
                >
                    <Dropdown.Item eventKey="text">By Text</Dropdown.Item>
                    <Dropdown.Item eventKey="completed">By Completed</Dropdown.Item>
                    <Dropdown.Item eventKey="priority">By Priority</Dropdown.Item>
                    <Dropdown.Item eventKey="dueDate">By Due Date</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    );
};

export default TodoAddForm;

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {TodoListResponseDto} from "@/types/dtos";

interface EditListItemFormProps {
    show: boolean;
    onHide: () => void;
    list: TodoListResponseDto;
    onUpdate: (updatedList: TodoListResponseDto) => void;
}

const EditListItemForm: React.FC<EditListItemFormProps> = ({ show, onHide, list, onUpdate }) => {
    const [listName, setListName] = useState(list.listName);

    useEffect(() => {
        setListName(list.listName);
    }, [list]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onUpdate({
            ...list,
            listName: listName,
        });
        onHide();
    };


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTodoText">
                        <Form.Label>List name</Form.Label>
                        <Form.Control
                            type="text"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditListItemForm;

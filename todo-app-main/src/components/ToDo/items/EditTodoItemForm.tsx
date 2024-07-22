import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {TodoRequestDto, TodoResponseDto} from "@/types/dtos";

interface EditTodoItemFormProps {
    show: boolean;
    onHide: () => void;
    todo: TodoResponseDto;
    onSave: (newTodo: TodoResponseDto) => void;
    onUpdate: (updatedTodo: TodoResponseDto) => void;
}

const EditTodoItemForm: React.FC<EditTodoItemFormProps> = ({ show, onHide, todo, onSave }) => {
    const [text, setText] = useState(todo.text);
    const [completed, setCompleted] = useState(todo.completed);
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(todo.priority);
    const [dueDate, setDueDate] = useState(todo.dueDate || '');
    const [tags, setTags] = useState(todo.tags ? todo.tags.join(', ') : '');

    useEffect(() => {
        setText(todo.text);
        setCompleted(todo.completed);
        setPriority(todo.priority);
        setDueDate(todo.dueDate || '');
        setTags(todo.tags ? todo.tags.join(', ') : '');
    }, [todo]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave({
            ...todo,
            text,
            completed,
            priority,
            dueDate,
            tags: tags.split(',').map(tag => tag.trim())
        });
        onHide();
    };

    const handlePriorityChange = (value: string) => {
        setPriority(value as 'low' | 'medium' | 'high');
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTodoText">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTodoCompleted" className="mt-3">
                        <Form.Check
                            type="checkbox"
                            label="Completed"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTodoPriority" className="mt-3">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control
                            as="select"
                            value={priority}
                            onChange={(e) => handlePriorityChange(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formTodoDueDate" className="mt-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTodoTags" className="mt-3">
                        <Form.Label>Tags (comma separated)</Form.Label>
                        <Form.Control
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
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

export default EditTodoItemForm;

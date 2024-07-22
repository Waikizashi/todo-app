import React, { useState, useEffect, FormEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TodoCreateRequestDto, TodoRequestDto, TodoResponseDto } from "@/types/dtos";
import { SelectedList } from "@/types/store_types";

interface EditTodoItemFormProps {
    show: boolean;
    onHide: () => void;
    todo: TodoResponseDto | null;
    onSave: (newTodo: TodoCreateRequestDto) => void;
    onUpdate: (updatedTodo: TodoResponseDto) => void;
    selectedList?: SelectedList;
}

const EditTodoItemForm: React.FC<EditTodoItemFormProps> = ({ selectedList, show, onHide, todo, onSave, onUpdate }) => {
    const [text, setText] = useState<string>(todo?.text || '');
    const [completed, setCompleted] = useState<boolean>(todo?.completed || false);
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(todo?.priority || 'low');
    const [dueDate, setDueDate] = useState<string>(todo?.dueDate || '');
    const [tags, setTags] = useState<string>(todo?.tags ? todo.tags.join(', ') : '');

    useEffect(() => {
        if (todo) {
            setText(todo.text || '');
            setCompleted(todo.completed || false);
            setPriority(todo.priority || 'low');
            setDueDate(todo.dueDate || '');
            setTags(todo.tags ? todo.tags.join(', ') : '');
        } else {
            setText('');
            setCompleted(false);
            setPriority('low');
            setDueDate('');
            setTags('');
        }
    }, [todo]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const todoData: TodoRequestDto = {
            text,
            completed,
            priority,
            dueDate,
            tags: tags.split(',').map(tag => tag.trim())
        };

        if (todo) {
            onUpdate({
                ...todo,
                ...todoData
            });
        } else if (selectedList) {
            onSave({
                todo: {
                    ...todoData
                },
                listId: selectedList.listId
            });
        }
        onHide();
    };

    const handlePriorityChange = (value: string) => {
        setPriority(value as 'low' | 'medium' | 'high');
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{todo ? 'Edit Todo Item' : 'Add Todo Item'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTodoText">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            required
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

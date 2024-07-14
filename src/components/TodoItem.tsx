import React, { useState } from 'react';
import { Todo } from '../services/TodoService';
import { ListGroup, Form, Row, Col } from 'react-bootstrap';
import TodoControls from './TodoControls';
import PriorityMarker from './PriorityMarker';
import clsx from 'clsx'

interface TodoItemProps {
    item: Todo;
    onUpdate: (todo: Todo) => void;
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onUpdate, onDelete, onEdit }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ListGroup.Item
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx("d-flex justify-content-start align-items-center position-relative", { ' bg-body-tertiary': isHovered })}
        >
            <Row className="w-100 align-items-center">
                <Col xs={2} className="text-center">
                    <PriorityMarker priority={item.priority} />
                </Col>
                <Col xs={6}>
                    <Form.Check
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => onUpdate({ ...item, completed: !item.completed })}
                        label={item.text}
                    />
                </Col>
                <Col xs={4} className="text-end">
                    {isHovered && (
                        <TodoControls
                            onEdit={() => onEdit(item)}
                            onDelete={() => onDelete(item.id)}
                        />
                    )}
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default TodoItem;

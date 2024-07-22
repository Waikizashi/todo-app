import React, { useState } from 'react';
import { ListGroup, Form, Row, Col } from 'react-bootstrap';
import TodoControls from '../share/TodoControls';
import PriorityMarker from '../share/PriorityMarker';
import clsx from 'clsx'
import {TodoResponseDto} from "@/types/dtos";
import {calculateDaysLeft, isOverdue} from "@/utils/utils";

interface TodoItemProps {
    item: TodoResponseDto;
    onUpdate: (todo: TodoResponseDto) => void;
    onDelete: (id: string) => void;
    onEdit: (todo: TodoResponseDto) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onUpdate, onDelete, onEdit }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ListGroup.Item
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx("card d-flex justify-content-start align-items-center position-relative my-2 item-shadow", { 'hovered-item': isHovered })}
        >
            <Row className="w-100 align-items-center">
                <Col xs={1} className="text-center">
                    <PriorityMarker priority={item.priority} />
                </Col>
                <Col xs={4}>
                    <Form.Check
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => onUpdate({ ...item, completed: !item.completed })}
                        label={<span className={clsx({'text-decoration-line-through text-secondary': item.completed})} >{item.text}</span>}
                        className='my-1'

                    />
                </Col>
                <Col xs={4}><span>{item?.dueDate && isOverdue(item.dueDate)}</span></Col>
                <Col xs={3} className="text-end">
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

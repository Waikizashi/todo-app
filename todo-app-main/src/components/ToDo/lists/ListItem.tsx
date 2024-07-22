import React, { useState } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import TodoControls from '../share/TodoControls';
import clsx from 'clsx'
import {SelectedList} from "@/types/store_types";

interface ListItemProps {
    item: SelectedList;
    onListDelete: (id: string) => void;
    onListEdit: (list: SelectedList) => void;
    onListEnter: (list: SelectedList) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, onListDelete, onListEdit, onListEnter }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ListGroup.Item
            onClick={() => onListEnter(item)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx("card d-flex justify-content-start align-items-center position-relative my-2 item-shadow", { 'hovered-item': isHovered })}
        >
            <Row className="w-100 align-items-center">
                <Col
                    xs={8}
                    className="my-1"
                >
                    {item.listName}
                </Col>
                <Col xs={4} className="text-end">
                    {isHovered && (
                        <TodoControls
                            onEdit={(e) => {
                                e.stopPropagation()
                                onListEdit(item)
                            }}
                            onDelete={(e) => {
                                e.stopPropagation()
                                onListDelete(item.listId)
                            }}
                        />
                    )}
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default ListItem;

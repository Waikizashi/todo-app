import { TodoList } from '@/services/TodoService';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface TodoListsProps {
    lists: TodoList[];
    onSelectList: (listName: string) => void;
}

const TodoLists: React.FC<TodoListsProps> = ({ lists, onSelectList }) => {
    return (
        <ListGroup className='m-4'>
            {lists.map((list, index) => (
                <ListGroup.Item
                    key={index}
                    action
                    onClick={() => onSelectList(list.id)}
                >
                    {list.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TodoLists;

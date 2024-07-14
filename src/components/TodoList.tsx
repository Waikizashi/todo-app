import React, { useState, useEffect } from 'react';
import { ListGroup, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { updateTodo, deleteTodo, addTodo } from '../store/todoSlice';
import TodoItem from './TodoItem';
import { Todo } from '@/services/TodoService';
import EditTodoItemForm from './EditTodoItemForm';
import TodoAddForm from './TodoAddForm';

interface TodoListProps {
    listName: string;
    onAddTodo: (todo: Todo) => void;
    onUpdateTodo: (todo: Todo) => void;
    onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ listName, onAddTodo, onUpdateTodo, onDeleteTodo }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, loading, error } = useSelector((state: RootState) => state.todos);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
    const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

    useEffect(() => {
        setSortedTodos(todos);
    }, [todos]);

    const handleAddTodo = (newTodo: Todo) => {
        onAddTodo(newTodo);
    };

    const handleUpdateTodo = (updatedTodo: Todo) => {
        onUpdateTodo(updatedTodo);
    };

    const handleDeleteTodo = (id: number) => {
        onDeleteTodo(id);
    };

    const handleEditTodo = (todo: Todo) => {
        setCurrentTodo(todo);
        setShowEditForm(true);
    };

    const handleSaveTodo = (updatedTodo: Todo) => {
        handleUpdateTodo(updatedTodo);
        setShowEditForm(false);
    };

    const handleAddClick = () => {
        setCurrentTodo({ id: 0, text: '', completed: false, priority: 'low', dueDate: '', tags: [] });
        setShowEditForm(true);
    };

    const handleSortChange = (sortBy: string | null) => {
        const sorted = [...sortedTodos].sort((a, b) => {
            if (sortBy === 'text') return a.text.localeCompare(b.text);
            if (sortBy === 'completed') return Number(a.completed) - Number(b.completed);
            if (sortBy === 'priority') return (a.priority || '').localeCompare(b.priority || '');
            if (sortBy === 'dueDate') return (a.dueDate || '').localeCompare(b.dueDate || '');
            return 0;
        });
        setSortedTodos(sorted);
    };

    return (
        <div className="m-2">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card.Body>
                        <TodoAddForm onAddClick={handleAddClick} onSortChange={handleSortChange} listName={listName} />
                        {loading && <Spinner animation="border" />}
                        {error && <Alert variant="danger">{error}</Alert>}
                        <ListGroup>
                            {sortedTodos.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    item={todo}
                                    onUpdate={handleUpdateTodo}
                                    onDelete={handleDeleteTodo}
                                    onEdit={handleEditTodo}
                                />
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Col>
            </Row>
            {currentTodo && (
                <EditTodoItemForm
                    show={showEditForm}
                    onHide={() => setShowEditForm(false)}
                    todo={currentTodo}
                    onSave={handleSaveTodo}
                />
            )}
        </div>
    );
};

export default TodoList;

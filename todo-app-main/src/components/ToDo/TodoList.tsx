import React, { useState, useEffect } from 'react';
import { ListGroup, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import TodoItem from './items/TodoItem';
import EditTodoItemForm from './items/EditTodoItemForm';
import TodoItemForm from './items/TodoItemForm';
import {TodoRequestDto, TodoResponseDto} from "@/types/dtos";
import {priorityToEnum, Sorting, SortingType} from '@/types/sorting';
import {SelectedList} from "@/types/store_types";

interface TodoListProps {
    list: SelectedList;
    onAddTodo: (newTodo: TodoRequestDto) => void;
    onUpdateTodo: (todo: TodoResponseDto) => void;
    onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ list, onAddTodo, onUpdateTodo, onDeleteTodo }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, loading, error, selectedList } = useSelector((state: RootState) => state.todos);
    const {COMPLETED, PRIORITY, DUEDATE} = SortingType;
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<TodoResponseDto | null>(null);
    const [sortedTodos, setSortedTodos] = useState<TodoResponseDto[]>([]);
    const [sorting, setSorting] = useState<Sorting>({type: null, desc: true});

    useEffect(() => {
        setSortedTodos(todos);
    }, [todos]);

    useEffect(() => {
        sort(sorting);
    }, [sorting, todos])

    const handleAddTodo = (newTodo: TodoResponseDto) => {
        onAddTodo({todo: newTodo, listId: list.listId});
    };

    const handleUpdateTodo = (updatedTodo: TodoResponseDto) => {
        onUpdateTodo(updatedTodo);
    };

    const handleDeleteTodo = (id: string) => {
        onDeleteTodo(id);
    };

    const handleEditTodo = (todo: TodoResponseDto) => {
        setCurrentTodo(todo);
        setShowEditForm(true);
    };

    const handleSaveTodo = (newTodo: TodoResponseDto) => {
        handleUpdateTodo(newTodo);
        setShowEditForm(false);
    };

    const handleAddClick = () => {
        setCurrentTodo({ id: '0', text: '', completed: false, priority: 'low', dueDate: '', tags: [] });
        setShowEditForm(true);
    };

    const handleSortChange = (sortingType: SortingType | null) => {
        if (sorting.type === sortingType){
            setSorting({type: sortingType, desc: !sorting.desc})
        } else{
            setSorting({type: sortingType, desc: true})
        }
        sort(sorting)
    };

    const sort = (sorting: Sorting) => {
        if (sorting.type !== null) {
            const sorted = [...sortedTodos].sort((a, b) => {
                let comparison = 0;
                if (sorting.type === COMPLETED) {
                    comparison = Number(a.completed) - Number(b.completed);
                } else if (sorting.type === PRIORITY) {
                    comparison = priorityToEnum(a.priority) - priorityToEnum(b.priority);
                } else if (sorting.type === DUEDATE) {
                    comparison = (a.dueDate || '').localeCompare(b.dueDate || '');
                }

                return sorting.desc ? -comparison : comparison;
            });
            setSortedTodos(sorted);
        }
    };


    return (
        <Card.Body className="mx-2" style={{ overflowY: 'auto' }}>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <TodoItemForm sortDESC={sorting.desc} onAddClick={handleAddClick} onSortChange={handleSortChange} listName={list.listName} />
                    <Card.Body className='p-0'>
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
                    onUpdate={handleUpdateTodo}
                />
            )}
        </Card.Body>
    );
};

export default TodoList;

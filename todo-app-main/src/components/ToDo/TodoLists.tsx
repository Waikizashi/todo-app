import React, {useEffect, useState} from 'react';
import {ListGroup, Row, Col, Card} from 'react-bootstrap';
import {SelectedList} from "@/types/store_types";
import {TodoListRequestDto, TodoListResponseDto} from "@/types/dtos";
import TodoListForm from "@/components/ToDo/lists/TodoListForm";
import {addTodoList, deleteTodoList, updateTodoList} from "@/store/todoSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import ListItem from "@/components/ToDo/lists/ListItem";
import EditListItemForm from "@/components/ToDo/lists/EditListItemForm";

interface TodoListsProps {
    onSelectList: (selectedList: SelectedList) => void;
}

const TodoLists: React.FC<TodoListsProps> = ({ onSelectList }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {todoLists} = useSelector((state: RootState) => state.todos);
    const [currentList, setCurrentList] = useState<TodoListResponseDto | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(()=>{

    }, [todoLists])

    const handleAddTodoList = (newTodoList: TodoListRequestDto) => {
        dispatch(addTodoList(newTodoList));
    };
    const handleDeleteTodoList = (listId: string) => {
        dispatch(deleteTodoList(listId));
    };
    const handleUpdateTodoList = (newTodoList: TodoListRequestDto) => {
        dispatch(updateTodoList(newTodoList));
    };
    const handleEditTodoList = (todoList: SelectedList) => {
        setCurrentList(todoList);
        setShowEditForm(true);
    };
    const handleSaveList = (updatedList: TodoListResponseDto) => {
        handleUpdateTodoList(updatedList);
        setShowEditForm(false);
    };
    return (
        <Card.Body className="mx-2" style={{overflowY: "auto"}}>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <TodoListForm onAdd={handleAddTodoList}/>
                    <ListGroup>
                        {todoLists.map((list, index) => (
                            <ListItem
                                item={list}
                                onListDelete={handleDeleteTodoList}
                                onListEdit={handleEditTodoList}
                                onListEnter={onSelectList}
                                key={index}
                            />
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            {currentList && (
                <EditListItemForm
                    show={showEditForm}
                    onHide={() => setShowEditForm(false)}
                    list={currentList}
                    onUpdate={handleSaveList}
                />
            )}
        </Card.Body>
    );
};

export default TodoLists;

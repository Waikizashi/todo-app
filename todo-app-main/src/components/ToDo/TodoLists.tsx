import React from 'react';
import {ListGroup, Row, Col, Card} from 'react-bootstrap';
import {SelectedList} from "@/types/store_types";
import {TodoListRequestDto, TodoListResponseDto} from "@/types/dtos";
import TodoListForm from "@/components/ToDo/TodoListForm";
import {addTodoList} from "@/store/todoSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import TodoControls from "@/components/ToDo/TodoControls";
import ListItem from "@/components/ToDo/ListItem";

interface TodoListsProps {
    lists: TodoListResponseDto[];
    onSelectList: (selectedList: SelectedList) => void;
}

const TodoLists: React.FC<TodoListsProps> = ({ lists, onSelectList }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedList, todos, todoLists, loading, error } = useSelector((state: RootState) => state.todos);


    const handleAddTodoList = (newTodoList: TodoListRequestDto) => {
        dispatch(addTodoList(newTodoList));
    };
    const handleDeleteTodoList = (listId: string) => {
        // dispatch(deleteTodoList(listId));
    };
    const handleEditTodoList = (newTodoList: TodoListRequestDto) => {
        // dispatch(addTodoList(newTodoList));
    };
    return (
        <Card.Body className="mx-2" style={{overflowY: "auto"}}>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <TodoListForm onAdd={handleAddTodoList}/>
                    <ListGroup>
                        {lists.map((list, index) => (
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
        </Card.Body>
    );
};

export default TodoLists;

'use client';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./page.module.css";
import TodoList from "@/components/TodoList";
import TodoLists from "@/components/TodoLists";
import { RootState, AppDispatch } from '@/store/store';
import { fetchTodosByListId, fetchTodoLists, addTodo, updateTodo, deleteTodo, selectList, clearSelectedList } from '@/store/todoSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Todo, TodoListRequestDto} from '@/services/TodoService';
import TodoListForm from "@/components/TodoListForm";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedList, todos, todoLists, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch]);

  useEffect(() => {
    if (selectedList) {
      dispatch(fetchTodosByListId(selectedList));
    }
  }, [selectedList, dispatch]);

  const handleSelectList = (listId: string) => {
    dispatch(selectList(listId));
  };

  const handleAddTodoList = (newTodoList: TodoListRequestDto) => {
    dispatch(addTodoList(newTodoList));
  };
  const handleAddTodo = (newTodo: Todo) => {
    dispatch(addTodo(newTodo));
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    dispatch(updateTodo(updatedTodo));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleBack = () => {
    dispatch(clearSelectedList());
  };

  return (
    <main className={styles.main}>
      <Card>
        {selectedList ? (
          <>
            <Card.Header>
              <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={handleBack} />
            </Card.Header>
            <TodoList
              listName={selectedList}
              onAddTodo={handleAddTodo}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          </>
        ) : (
            <>
              <TodoListForm onAdd={handleAddTodoList}/>
              <TodoLists lists={todoLists} onSelectList={handleSelectList} />
            </>
        )}
      </Card>
    </main>
  );
}

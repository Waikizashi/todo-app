'use client';
import React, {useEffect, useState} from 'react';
import {Card, CardBody} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./page.module.css";
import TodoList from "@/components/ToDo/TodoList";
import TodoLists from "@/components/ToDo/TodoLists";
import { RootState, AppDispatch } from '@/store/store';
import {
  fetchTodosByListId,
  fetchTodoLists,
  addTodo,
  updateTodo,
  deleteTodo,
  selectList,
  clearSelectedList,
  addTodoList
} from '@/store/todoSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import {SelectedList} from "@/types/store_types";
import {TodoListRequestDto, TodoResponseDto} from "@/types/dtos";
import DateTimeDisplay from "@/components/clocks/DateTimeDisplay";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedList, todos, todoLists, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch]);

  useEffect(() => {
    if (selectedList) {
      dispatch(fetchTodosByListId(selectedList.listId));
    }
  }, [selectedList, dispatch]);

  const handleSelectList = (list: SelectedList) => {
    dispatch(selectList(list));
  };

  const handleAddTodoList = (newTodoList: TodoListRequestDto) => {
    dispatch(addTodoList(newTodoList));
  };
  const handleAddTodo = (newTodo: TodoResponseDto, listId: number) => {

    dispatch(addTodo({todo: newTodo, listId: listId}));
  };

  const handleUpdateTodo = (updatedTodo: TodoResponseDto) => {
    dispatch(updateTodo(updatedTodo));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleBack = () => {
    dispatch(clearSelectedList());
  };

  return (
    <main className={styles.main}>

      <Card className="border-0">
        <Card.Header className="d-flex justify-content-between">
          {selectedList ? <ArrowBackIcon style={{cursor: 'pointer'}} onClick={handleBack}/> : <FeaturedPlayListIcon/>}
          <DateTimeDisplay></DateTimeDisplay>
        </Card.Header>
        {selectedList ? (
              <TodoList
                  listName={selectedList.listName}
                  onAddTodo={handleAddTodo}
                  onUpdateTodo={handleUpdateTodo}
                  onDeleteTodo={handleDeleteTodo}
              />
        ) : (
              <TodoLists
                    lists={todoLists}
                    onSelectList={handleSelectList}
              />
        )}
      </Card>
    </main>
  );
}

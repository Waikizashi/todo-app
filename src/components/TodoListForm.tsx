import React, { useState, FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import {Todo, TodoListRequestDto,} from '../services/TodoService';

interface TodoListFormProps {
  onAdd: (list: TodoListRequestDto) => void;
}

const TodoListForm: React.FC<TodoListFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd({listName: text});
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group controlId="formTodoText">
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Add
      </Button>
    </Form>
  );
};

export default TodoListForm;

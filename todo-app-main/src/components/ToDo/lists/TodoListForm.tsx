import React, { useState, FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import {TodoListRequestDto} from "@/types/dtos";

import QueueIcon from '@mui/icons-material/Queue';

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
    <Form onSubmit={handleSubmit} className="mb-2 d-flex justify-content-between align-items-center">
      <Form.Group controlId="formTodoText" className="w-100">
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new toto list"
          required={true}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="ms-2">
        <QueueIcon/>
      </Button>
    </Form>
  );
};

export default TodoListForm;

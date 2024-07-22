import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    tags?: string[];
}

interface TodoList {
    listId: string;
    listName: string;
}

const router = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const todoItemsPath = join(__dirname, '../mock-data/todo-items-mock-response.json');
const todos: Todo[] = JSON.parse(readFileSync(todoItemsPath, 'utf-8'));

const todoListsPath = join(__dirname, '../mock-data/todo-lists-mock-response.json');
const todoLists: TodoList[] = JSON.parse(readFileSync(todoListsPath, 'utf-8'));

router.get('/lists', (req, res) => {
    res.json(todoLists);
});

router.post('/lists', (req, res) => {
    const newList: TodoList = {
        listId: todoLists.length ? (parseInt(todoLists[todoLists.length - 1].listId) + 1).toString() : '1',
        ...req.body
    };
    todoLists.push(newList);
    writeFileSync(todoListsPath, JSON.stringify(todoLists, null, 2));
    res.status(201).json(newList);
});

router.put('/lists/:listId', (req, res) => {
    const listId = req.params.listId;
    const listIndex = todoLists.findIndex(list => list.listId === listId);
    if (listIndex !== -1) {
        todoLists[listIndex] = { ...todoLists[listIndex], ...req.body };
        writeFileSync(todoListsPath, JSON.stringify(todoLists, null, 2));
        res.json(todoLists[listIndex]);
    } else {
        res.status(404).send('List not found');
    }
});

router.delete('/lists/:listId', (req, res) => {
    const listId = req.params.listId;
    const listIndex = todoLists.findIndex(list => list.listId === listId);
    if (listIndex !== -1) {
        todoLists.splice(listIndex, 1);
        writeFileSync(todoListsPath, JSON.stringify(todoLists, null, 2));
        res.status(200).json({ deletedListId: listId });
    } else {
        res.status(404).send('List not found');
    }
});


router.get('/lists/:listId', (req, res) => {
    const listId = req.params.listId;
    res.json(todos);
});

router.post('/lists/:listId', (req, res) => {
    const listId = req.params.listId;
    const newTodo: Todo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        ...req.body
    };
    todos.push(newTodo);
    writeFileSync(todoItemsPath, JSON.stringify(todos, null, 2));
    res.status(201).json(newTodo);
});

router.put('/item/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        todos[index] = { ...todos[index], ...req.body };
        writeFileSync(todoItemsPath, JSON.stringify(todos, null, 2));
        res.json(todos[index]);
    } else {
        res.status(404).send('Todo not found');
    }
});

router.delete('/item/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        todos.splice(index, 1);
        writeFileSync(todoItemsPath, JSON.stringify(todos, null, 2));
        res.status(204).send();
    } else {
        res.status(404).send('Todo not found');
    }
});

export default router;

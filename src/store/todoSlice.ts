import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import TodoService, { Todo, TodoList } from '../services/TodoService';

interface TodoState {
    todos: Todo[];
    todoLists: TodoList[];
    selectedList: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    todoLists: [],
    selectedList: null,
    loading: false,
    error: null,
};

export const fetchTodosByListId = createAsyncThunk<Todo[], string>('todos/fetchTodosByListId', async (listId) => {
    const todos = await TodoService.getTodosByListId(listId);
    return todos;
});

export const fetchTodoLists = createAsyncThunk<TodoList[]>('todolists/fetchTodoLists', async () => {
    const todoLists = await TodoService.getTodoLists();
    return todoLists;
});

export const addTodo = createAsyncThunk<Todo, Todo>('todos/addTodo', async (todo) => {
    const newTodo = await TodoService.addTodo(todo);
    return newTodo;
});

export const updateTodo = createAsyncThunk<Todo, Todo>('todos/updateTodo', async (todo) => {
    const updatedTodo = await TodoService.updateTodo(todo);
    return updatedTodo;
});

export const deleteTodo = createAsyncThunk<number, number>('todos/deleteTodo', async (id) => {
    await TodoService.deleteTodo(id);
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        selectList(state, action: PayloadAction<string>) {
            state.selectedList = action.payload;
        },
        clearSelectedList(state) {
            state.selectedList = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosByListId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodosByListId.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodosByListId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch todos for the selected list';
            })
            .addCase(fetchTodoLists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodoLists.fulfilled, (state, action: PayloadAction<TodoList[]>) => {
                state.loading = false;
                state.todoLists = action.payload;
            })
            .addCase(fetchTodoLists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch todo lists';
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    },
});

export const { selectList, clearSelectedList } = todoSlice.actions;

export default todoSlice.reducer;

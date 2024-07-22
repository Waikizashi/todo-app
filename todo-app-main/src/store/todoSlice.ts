import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import TodoService from '../services/TodoService';
import {SelectedList} from "@/types/store_types";
import {
    TodoListRequestDto,
    TodoListResponseDto,
    TodoCreateRequestDto,
    TodoResponseDto,
    TodoListDeleteResponseDto
} from "@/types/dtos";

interface TodoState {
    todos: TodoResponseDto[];
    todoLists: TodoListResponseDto[];
    selectedList?: SelectedList;
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    todoLists: [],
    selectedList: undefined,
    loading: false,
    error: null,
};

export const fetchTodosByListId = createAsyncThunk<TodoResponseDto[], string>('todos/fetchTodosByListId', async (listId) => {
    return await TodoService.getTodosByListId(listId);
});

export const fetchTodoLists = createAsyncThunk<TodoListResponseDto[]>('todoLists/fetchTodoLists', async () => {
    return await TodoService.getTodoLists();
});

export const addTodoList = createAsyncThunk<TodoListResponseDto, TodoListRequestDto>('todoLists/addTodoList', async (list) => {
    return await TodoService.addTodoList(list);
});
export const updateTodoList = createAsyncThunk<TodoListResponseDto, TodoListRequestDto>('todoLists/updateTodoList', async (list) => {
    return await TodoService.updateTodoList(list);
});
export const deleteTodoList = createAsyncThunk<TodoListDeleteResponseDto, string>('todoLists/deleteTodoList', async (listId) => {
    return await TodoService.deleteTodoList(listId);
});

export const addTodo = createAsyncThunk<TodoResponseDto, TodoCreateRequestDto>('todos/addTodo', async (todo) => {
    return await TodoService.addTodo(todo);
});

export const updateTodo = createAsyncThunk<TodoResponseDto, TodoResponseDto>('todos/updateTodo', async (todo) => {
    return await TodoService.updateTodo(todo);
});

export const deleteTodo = createAsyncThunk<string, string>('todos/deleteTodo', async (id) => {
    await TodoService.deleteTodo(id);
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        selectList(state, action: PayloadAction<SelectedList>) {
            state.selectedList = action.payload;
        },
        clearSelectedList(state) {
            state.selectedList = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchTodosByListId
            .addCase(fetchTodosByListId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodosByListId.fulfilled, (state, action: PayloadAction<TodoResponseDto[]>) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodosByListId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch todos for the selected list';
            })
            // fetchTodoLists
            .addCase(fetchTodoLists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodoLists.fulfilled, (state, action: PayloadAction<TodoListResponseDto[]>) => {
                state.loading = false;
                state.todoLists = action.payload;
            })
            .addCase(fetchTodoLists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch todo lists';
            })
            // addTodoList
            .addCase(addTodoList.pending, (state) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodoList.fulfilled, (state, action: PayloadAction<TodoListResponseDto>) =>{
                state.loading = false;
                state.todoLists.push(action.payload)
            })
            .addCase(addTodoList.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.error.message || 'Failed to add todo list';
            })
            // updateTodoList
            .addCase(updateTodoList.pending, (state) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodoList.fulfilled, (state, action: PayloadAction<TodoListResponseDto>) =>{
                state.loading = false;
                state.todoLists = state.todoLists.filter((list) => list.listId !== action.payload.listId)
                state.todoLists.push(action.payload)
            })
            .addCase(updateTodoList.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.error.message || 'Failed to update todo list';
            })
            // deleteTodoList
            .addCase(deleteTodoList.pending, (state) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodoList.fulfilled, (state, action: PayloadAction<TodoListDeleteResponseDto>) =>{
                state.loading = false;
                state.todoLists = state.todoLists.filter(list => list.listId !== action.payload.deletedListId)
            })
            .addCase(deleteTodoList.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.error.message || 'Failed to delete todo list';
            })
            // addTodo
            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoResponseDto>) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add todo';
            })
            // updateTodo
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<TodoResponseDto>) => {
                state.loading = false;
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update todo';
            })
            // deleteTodo
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete todo';
            });
    },
});

export const { selectList, clearSelectedList } = todoSlice.actions;

export default todoSlice.reducer;

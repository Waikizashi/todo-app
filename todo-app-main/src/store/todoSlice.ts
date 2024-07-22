import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import TodoService from '../services/TodoService';
import {SelectedList} from "@/types/store_types";
import {TodoListRequestDto, TodoListResponseDto, TodoRequestDto, TodoResponseDto} from "@/types/dtos";

interface TodoState {
    todos: TodoResponseDto[];
    todoLists: TodoListResponseDto[];
    selectedList?: { listName: string, listId: string};
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

export const addTodoList = createAsyncThunk<TodoListResponseDto, TodoListRequestDto>('todoLists/addTodoLists', async (list) => {
    return await TodoService.addTodoList(list);
});
export const updateTodoList = createAsyncThunk<TodoListResponseDto[], TodoListRequestDto>('todoLists/updateTodoLists', async (list) => {
    return await TodoService.updateTodoList(list);
});
export const deleteTodoList = createAsyncThunk<TodoListResponseDto, number>('todoLists/deleteTodoLists', async (listId) => {
    return await TodoService.deleteTodoList(listId);
});

export const addTodo = createAsyncThunk<TodoResponseDto, TodoRequestDto>('todos/addTodo', async ({todo, listId}) => {
    return await TodoService.addTodo(todo, listId);
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
            .addCase(addTodoList.pending, (state) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodoList.fulfilled, (state, action: PayloadAction<TodoListResponseDto>) =>{
                state.loading = false;
                state.todoLists.push(action.payload)
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoResponseDto>) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<TodoResponseDto>) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    },
});

export const { selectList, clearSelectedList } = todoSlice.actions;

export default todoSlice.reducer;

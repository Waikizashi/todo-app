import axios, { AxiosInstance } from 'axios';
import {
    TodoCreateRequestDto,
    TodoListDeleteResponseDto,
    TodoListRequestDto,
    TodoListResponseDto,
    TodoResponseDto
} from "@/types/dtos";

class TodoService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5443/api/todo',
        });
    }
    getTodoLists = async (): Promise<TodoListResponseDto[]> => {
        try {
            const response = await this.api.get<TodoListResponseDto[]>('/lists');
            return response.data;
        } catch (error) {
            console.error('Error fetching todo lists:', error);
            throw error;
        }
    }

    getTodosByListId = async (listId: string): Promise<TodoResponseDto[]> => {
        try {
            const response = await this.api.get<TodoResponseDto[]>(`/lists/${listId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching todo:', error);
            throw error;
        }
    }

    addTodoList = async (list: TodoListRequestDto): Promise<TodoListResponseDto> => {
        try {
            const response = await this.api.post<TodoListResponseDto>('/lists', list);
            return response.data;
        } catch (error) {
            console.error('Error adding todo list:', error);
            throw error;
        }
    }
    updateTodoList = async (list: TodoListRequestDto): Promise<TodoListResponseDto> => {
        try {
            const response = await this.api.put<TodoListResponseDto>(`/lists/${list.listId}`, list);
            return response.data;
        } catch (error) {
            console.error('Error adding todo list:', error);
            throw error;
        }
    }
    deleteTodoList = async (listId: string): Promise<TodoListDeleteResponseDto> => {
        try {
            const response = await this.api.delete<TodoListDeleteResponseDto>(`/lists/${listId}`);
            return response.data;
        } catch (error) {
            console.error('Error adding todo list:', error);
            throw error;
        }
    }
    addTodo = async (newTodo: TodoCreateRequestDto): Promise<TodoResponseDto> => {
        try {
            const response = await this.api.post<TodoResponseDto>(`/lists/${newTodo.listId}`, newTodo.todo);
            return response.data;
        } catch (error) {
            console.error('Error adding todo:', error);
            throw error;
        }
    }

    updateTodo = async (todo: TodoResponseDto): Promise<TodoResponseDto> => {
        try {
            const response = await this.api.put<TodoResponseDto>(`/item/${todo.id}`, todo);
            return response.data;
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    }

    deleteTodo = async (id: string): Promise<TodoListDeleteResponseDto> => {
        try {
            const response = await this.api.delete<TodoListDeleteResponseDto>(`/item/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    }
}

export default new TodoService();

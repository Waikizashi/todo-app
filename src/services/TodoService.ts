import axios, { AxiosInstance } from 'axios';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    tags?: string[];
};

export interface TodoList {
    id: string;
    listName: string;
};

class TodoService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'https://66903fe0c0a7969efd9b8f8b.mockapi.io/api/todo',
        });
    }
    getTodoLists = async (): Promise<TodoList[]> => {
        try {
            const response = await this.api.get<TodoList[]>('/lists');
            return response.data;
        } catch (error) {
            console.error('Error fetching todo lists:', error);
            throw error;
        }
    }

    getTodosByListId = async (id: string): Promise<Todo[]> => {
        try {
            const response = await this.api.get<Todo[]>(`/lists/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching todos:', error);
            throw error;
        }
    }

    addList = async (list: TodoList): Promise<TodoList> => {
        try {
            const response = await this.api.post<TodoList>('/item', list);
            return response.data;
        } catch (error) {
            console.error('Error adding todo:', error);
            throw error;
        }
    }
    addTodo = async (todo: Todo): Promise<Todo> => {
        try {
            const response = await this.api.post<Todo>('/item', todo);
            return response.data;
        } catch (error) {
            console.error('Error adding todo:', error);
            throw error;
        }
    }

    updateTodo = async (todo: Todo): Promise<Todo> => {
        try {
            const response = await this.api.put<Todo>(`/item/${todo.id}`, todo);
            return response.data;
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    }

    deleteTodo = async (id: number): Promise<void> => {
        try {
            await this.api.delete(`/item/${id}`);
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    }
}

export default new TodoService();

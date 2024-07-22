export interface TodoResponseDto {
    id: string;
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    tags?: string[];
};

export interface TodoListResponseDto {
    listId: string;
    listName: string;
};
export interface TodoListRequestDto {
    listId: string;
    listName: string;
};

export interface TodoRequestDto {
    todo: TodoResponseDto,
    listId: string
}

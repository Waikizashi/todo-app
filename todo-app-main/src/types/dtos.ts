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
export interface TodoListDeleteResponseDto {
    deletedListId: string;
};
export interface TodoListRequestDto {
    listId: string;
    listName: string;
};

export interface TodoCreateRequestDto {
    todo: TodoRequestDto,
    listId: string
}

export interface TodoRequestDto {
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    tags?: string[];
};

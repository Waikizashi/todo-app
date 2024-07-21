export enum SortingPriority {
    LOW,
    MEDIUM,
    HIGH
}
export enum SortingType {
    COMPLETED,
    PRIORITY,
    DUEDATE
}

export const priorityToEnum = (priority: string): SortingPriority => {
    switch (priority) {
        case 'low':
            return SortingPriority.LOW;
        case 'medium':
            return SortingPriority.MEDIUM;
        case 'high':
            return SortingPriority.HIGH;
        default:
            return SortingPriority.LOW;
    }
};

export interface Sorting {
    type: SortingType | null;
    desc: boolean;
}

export function stringToSortingType(sortingType : string | null) {
    switch (sortingType) {
        case 'completed':
            return SortingType.COMPLETED;
        case 'priority':
            return SortingType.PRIORITY;
        case 'dueDate':
            return SortingType.DUEDATE;
        default:
            return null;
    }
}

export function sortDirectionChange (desc: boolean) {
    return !desc;
}


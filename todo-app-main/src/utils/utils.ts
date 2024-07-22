import {retry} from "@reduxjs/toolkit/query";

export const calculateDaysLeft = (dueDate: string): number => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = dueDateObj.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
};

export const isOverdue = (dueDate: string): string => {
    const daysLeft = calculateDaysLeft(dueDate);
    return daysLeft > 0 ? daysLeft + " d. left" : "overdue";
}
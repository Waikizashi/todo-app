import React, {useState} from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {SortingType, stringToSortingType} from "@/types/sorting";
import clsx from "clsx";
import ArrowDropUpDownIcon from "@/components/custom_icons/ArrowDropUpDownIcon";

interface TodoAddFormProps {
    onAddClick: () => void;
    onSortChange: (sorting: SortingType | null) => void;
    listName: string;
    sortDESC: boolean;
}

const TodoItemForm: React.FC<TodoAddFormProps> = ({ sortDESC, onAddClick, onSortChange, listName }) => {
    const [currentSort, setCurrentSort] = useState<SortingType | null>(null);
    const {DUEDATE, COMPLETED, PRIORITY} = SortingType;
    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className=''>{listName}</h3>
            <div className="d-flex align-items-center justify-content-between">
                <Button onClick={onAddClick} color='primary' className="rounded-3 px-2 mx-2">
                    <AddIcon className=''/>
                </Button>
                <DropdownButton
                    title={<FilterAltIcon />}
                    onSelect={(sortingType: string | null) => {
                        onSortChange(stringToSortingType(sortingType))
                    }}
                >
                    <Dropdown.Item className={clsx({'bg-primary-subtle': currentSort === COMPLETED})}
                                   onClick={() => {
                                       setCurrentSort(COMPLETED)
                                   }}
                                   eventKey="completed">
                        By Completed
                        {<ArrowDropUpDownIcon direction={sortDESC} isActive={currentSort === COMPLETED}/>}
                    </Dropdown.Item>
                    <Dropdown.Item className={clsx({'bg-primary-subtle': currentSort === PRIORITY})}
                                   onClick={() => {
                                       setCurrentSort(PRIORITY)
                                   }}
                                   eventKey="priority">
                        By Priority
                        {<ArrowDropUpDownIcon direction={sortDESC} isActive={currentSort === PRIORITY}/>}
                    </Dropdown.Item>
                    <Dropdown.Item className={clsx({'bg-primary-subtle': currentSort === DUEDATE})}
                                   onClick={() => {
                                       setCurrentSort(DUEDATE)
                                   }}
                                   eventKey="dueDate">
                        By Due Date
                        {<ArrowDropUpDownIcon direction={sortDESC} isActive={currentSort === DUEDATE}/>}
                    </Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    );
};

export default TodoItemForm;

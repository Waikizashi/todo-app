import React, {useEffect} from 'react';
import {Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./page.module.css";
import TodoList from "@/components/ToDo/TodoList";
import TodoLists from "@/components/ToDo/TodoLists";
import { RootState, AppDispatch } from '@/store/store';
import {
    fetchTodosByListId,
    fetchTodoLists,
    selectList,
    clearSelectedList
} from '@/store/todoSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import {SelectedList} from "@/types/store_types";
import DateTimeDisplay from "@/components/clocks/DateTimeDisplay";
import ThemeSwitcher from "@/components/themeSwitcher/ThemeSwitcher";
import {ThemeProvider, useTheme} from "@/app/context/ThemeContext";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedList} = useSelector((state: RootState) => state.todos);

    const { theme } = useTheme();

    useEffect(() => {
        console.log(theme)
        document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
    }, [theme]);

    useEffect(() => {
        dispatch(fetchTodoLists());
    }, [dispatch]);

    useEffect(() => {
        if (selectedList) {
            dispatch(fetchTodosByListId(selectedList.listId));
        }
    }, [selectedList, dispatch]);

    const handleSelectList = (list: SelectedList) => {
        dispatch(selectList(list));
    };
    const handleBack = () => {
        dispatch(clearSelectedList());
    };

    return (
            <main className={styles.main}>

                <Card className="border-0">
                    <Card.Header className="d-flex justify-content-between">
                        {selectedList ? <ArrowBackIcon style={{cursor: 'pointer'}} onClick={handleBack}/> : <FeaturedPlayListIcon/>}
                        <DateTimeDisplay></DateTimeDisplay>
                        <ThemeSwitcher/>
                    </Card.Header>
                    {selectedList ? (
                        <TodoList
                            list={selectedList}
                        />
                    ) : (
                        <TodoLists
                            onSelectList={handleSelectList}
                        />
                    )}
                </Card>
            </main>
    );
}

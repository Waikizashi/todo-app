import React, {useState} from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import clsx from "clsx";
import {SortingType} from "@/types/sorting";

interface ArrowDropUpDownIconProps {
    direction: boolean;
    isActive: boolean;
}


const ArrowDropUpDownIcon: React.FC<ArrowDropUpDownIconProps> = ({direction, isActive}) =>{
    return(
            direction ?  <ArrowDropDownIcon color={isActive ? 'primary' : "disabled"}/> : <ArrowDropUpIcon color={isActive ? 'primary' : "disabled"}/>
    )
}

export default ArrowDropUpDownIcon;
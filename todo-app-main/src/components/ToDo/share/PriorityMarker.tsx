import React from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export interface Priority {
    priority: 'low' | 'medium' | 'high';
}

const PriorityMarker: React.FC<Priority> = ({ priority }) => {
    const getPriorityIcons = () => {
        if (priority === 'medium') {
            return <PriorityHighIcon  fontSize='small' color='warning' />;
        } else if (priority === 'high') {
            return (
                <div className='d-flex'>
                    <PriorityHighIcon style={{marginRight:'-0.5em'}} fontSize='small' color='error' />
                    <PriorityHighIcon fontSize='small' color='error' />
                </div>
            );
        }
        return null;
    };

    return (
        <div className="priority-marker mx-1 d-flex justify-content-center">
            {getPriorityIcons()}
        </div>
    );
};

export default PriorityMarker;

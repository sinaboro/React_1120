import React from 'react';
import { useParams } from 'react-router-dom';

const Diary = () => {
    const {id} = useParams();
    
    return (
        <div>
            Diary 페이지입니다.
            {id}
        </div>
    );
};

export default Diary;
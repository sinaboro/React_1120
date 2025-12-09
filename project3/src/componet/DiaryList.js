import React from 'react';
import Button from './Button';

const DiaryList = ({data}) => {
    return (
        <div className='DirayList'>
            <div className='menu_wrapper'>
                <div className='left_col'>
                    <select></select>
                </div>
                <div className='right_col'>
                    <Button type={"positive"} text={"새 일기 쓰기"} />
                </div>
            </div>
        </div>
    );
};

export default DiaryList;
import classNames from 'classnames';
import React from 'react';
import ImagesDropZone from './ImagesDropZone/ImagesDropZone';

import './MainView.scss';

const MainView: React.FC = () => {
        
    const getClassName = () => {
        return classNames(
            'MainView', 
            'InProgress'
        );
    };

    return (
        <div className={getClassName()}>
            <div className='RightColumn'>
                <div />
                <ImagesDropZone />
                <div />
            </div>
        </div>
    );
};

export default MainView;

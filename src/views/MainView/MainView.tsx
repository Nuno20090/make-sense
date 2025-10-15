import classNames from 'classnames';
import React, { useState } from 'react';
import { TextButton } from '../Common/TextButton/TextButton';
import ImagesDropZone from './ImagesDropZone/ImagesDropZone';
import './MainView.scss';

const MainView: React.FC = () => {
    const [projectInProgress, setProjectInProgress] = useState(false);
    const [projectCanceled, setProjectCanceled] = useState(false);

    const startProject = () => {
        setProjectInProgress(true);
    };

    const endProject = () => {
        setProjectInProgress(false);
        setProjectCanceled(true);
    };

    const getClassName = () => {
        return classNames(
            'MainView', {
            'InProgress': projectInProgress,
            'Canceled': !projectInProgress && projectCanceled
        }
        );
    };

    const getSocialMediaButtons = () => {
        return <div></div>;
    };

    const getEditorFeatureTiles = () => {
        return <div></div>;
    };

    return (
        <div className={getClassName()}>
            <div className='Slider' id='lower'>
                <div className='TriangleVertical'>
                    <div className='TriangleVerticalContent' />
                </div>
            </div>

            <div className='Slider' id='upper'>
                <div className='TriangleVertical'>
                    <div className='TriangleVerticalContent' />
                </div>
            </div>

            <div className='LeftColumn'>
                <div className={'LogoWrapper'}>
                   
                </div>
                <div className='EditorFeaturesWrapper'>
                    {getEditorFeatureTiles()}
                </div>
                <div className='TriangleVertical'>
                    <div className='TriangleVerticalContent' />
                </div>
                {projectInProgress && <TextButton
                    label={'Go Back'}
                    onClick={endProject}
                />}
            </div>
            <div className='RightColumn'>
                <div />
                <ImagesDropZone />
                <div className='SocialMediaWrapper'>
                    {getSocialMediaButtons()}
                </div>
                {!projectInProgress && <TextButton
                    label={'Get Started'}
                    onClick={startProject}
                    externalClassName={'get-started-button'}
                />}
            </div>
        </div>
    );
};

export default MainView;

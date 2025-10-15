import React from 'react';
import { connect } from 'react-redux';
import { PopupWindowType } from '../../../data/enums/PopupWindowType';
import { AppState } from '../../../store';
import { updateActivePopupType, updateProjectData } from '../../../store/general/actionCreators';
import { ProjectData } from '../../../store/general/types';
import StateBar from '../StateBar/StateBar';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import './TopNavigationBar.scss';

interface IProps {
    updateActivePopupTypeAction: (activePopupType: PopupWindowType) => any;
    updateProjectDataAction: (projectData: ProjectData) => any;
    projectData: ProjectData;
}

const TopNavigationBar: React.FC<IProps> = (props) => {
    
    return (
        <div className='TopNavigationBar'>
            <StateBar/>
            <div className='TopNavigationBarWrapper'>
                <div className='NavigationBarGroupWrapper'>
                    <DropDownMenu/>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    updateActivePopupTypeAction: updateActivePopupType,
    updateProjectDataAction: updateProjectData
};

const mapStateToProps = (state: AppState) => ({
    projectData: state.general.projectData
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNavigationBar);

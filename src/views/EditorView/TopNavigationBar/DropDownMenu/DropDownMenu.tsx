import React from 'react';
import classNames from 'classnames'
import './DropDownMenu.scss';
import {DropDownMenuData, DropDownMenuNode} from '../../../../data/info/DropDownMenuData';
import {updatePreventCustomCursorStatus} from '../../../../store/general/actionCreators';
import {connect} from 'react-redux';

interface IProps {
    updatePreventCustomCursorStatusAction: (preventCustomCursor: boolean) => void;
}

const DropDownMenu: React.FC<IProps> = ({updatePreventCustomCursorStatusAction}) => {
    // (no dropdown anchor needed)

    // No dropdown window — static tabs with inline action buttons. Maintain cursor status while hovering.
    const onMouseEnterWindow = () => updatePreventCustomCursorStatusAction(true);
    const onMouseLeaveWindow = () => updatePreventCustomCursorStatusAction(false);

    const getDropDownMenuTabClassName = () => classNames('DropDownMenuTab');

    const getDropDownMenuContentOption = (disabled: boolean) => {
        return classNames(
            'DropDownMenuContentOption',
            {'active': !disabled}
        );
    }

    const getDropDownTab = (data: DropDownMenuNode, index: number) => {
        return <div
            className={getDropDownMenuTabClassName()}
            key={index}
            onMouseEnter={onMouseEnterWindow}
            onMouseLeave={onMouseLeaveWindow}
        >
            {/* Render inline action buttons for the Actions tab (keep dropdown intact) */}
            {data.children && data.children.length > 0 && index === 0 ? (
                <div className='DropDownInlineActions'>
                    {data.children.map((child, idx) => {
                        const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            if (!child.disabled && child.onClick) child.onClick();
                        };

                        return (
                            <button
                                key={idx}
                                className={getDropDownMenuContentOption(child.disabled)}
                                onClick={onClick}
                                title={child.description || child.name}
                            >
                                <img src={child.imageSrc} alt={child.imageAlt} />
                                <span className='InlineActionLabel'>{child.name}</span>
                            </button>
                        );
                    })}
                </div>
            ) : null}
        </div>
    }

    const getDropDownContent = () => DropDownMenuData.map((data: DropDownMenuNode, index: number) => getDropDownTab(data, index));

    return (
        <div className='DropDownMenuWrapper'>
            <>{getDropDownContent()}</>
        </div>
    );
}

const mapDispatchToProps = {
    updatePreventCustomCursorStatusAction: updatePreventCustomCursorStatus,
};

const mapStateToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropDownMenu);

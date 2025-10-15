import React, {useState} from 'react';
import classNames from 'classnames'
import './DropDownMenu.scss';
import {DropDownMenuData, DropDownMenuNode} from '../../../../data/info/DropDownMenuData';
import {EventType} from '../../../../data/enums/EventType';
import {updatePreventCustomCursorStatus} from '../../../../store/general/actionCreators';
import {connect} from 'react-redux';

interface IProps {
    updatePreventCustomCursorStatusAction: (preventCustomCursor: boolean) => void;
}

const DropDownMenu: React.FC<IProps> = ({updatePreventCustomCursorStatusAction}) => {
    const topAnchor = 35;

    const [activeTabIdx, setActiveTabIdx] = useState(null);
    const [activeDropDownAnchor, setDropDownAnchor] = useState(null);

    const onMouseDownBeyondDropDown = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (target && (target.classList.contains('DropDownMenuTab') || target.classList.contains('DropDownMenuContentOption'))) {
            return;
        }
        setActiveTabIdx(null);
        document.removeEventListener(EventType.MOUSE_DOWN, onMouseDownBeyondDropDown);
    }

    const onTabClick = (tabIdx: number, event: React.MouseEvent<HTMLDivElement>) => {
        if (activeTabIdx === null) {
            document.addEventListener(EventType.MOUSE_DOWN, onMouseDownBeyondDropDown);
        }

        if (activeTabIdx === tabIdx) {
            setActiveTabIdx(null);
            setDropDownAnchor(null);
        } else {
            setActiveTabIdx(tabIdx);
            const target = event.currentTarget as HTMLElement;
            setDropDownAnchor({x: target.offsetLeft, y: topAnchor});
        }
    }

    const onMouseEnterWindow = () => {
        updatePreventCustomCursorStatusAction(true);
    }

    const onMouseLeaveWindow = () => {
        updatePreventCustomCursorStatusAction(false);
    }

    const onMouseEnterTab = (tabIdx: number, event: React.MouseEvent<HTMLDivElement>) => {
        if (activeTabIdx !== null && activeTabIdx !== tabIdx) {
            setActiveTabIdx(tabIdx);
            const target = event.currentTarget as HTMLElement;
            setDropDownAnchor({x: target.offsetLeft, y: topAnchor});
        }
    }

    const getDropDownMenuTabClassName = (tabIdx: number) => {
        return classNames(
            'DropDownMenuTab',
            {'active': tabIdx === activeTabIdx}
        );
    };

    const getDropDownMenuContentOption = (disabled: boolean) => {
        return classNames(
            'DropDownMenuContentOption',
            {'active': !disabled}
        );
    }

    const getDropDownTab = (data: DropDownMenuNode, index: number) => {
        return <div
            className={getDropDownMenuTabClassName(index)}
            key={index}
            onClick={(event) => onTabClick(index, event)}
            onMouseEnter={(event) => onMouseEnterTab(index, event)}
        >
            <img
                draggable={false}
                src={data.imageSrc}
                alt={data.imageAlt}
            />
            {data.name}
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

    const getDropDownContent = () => {
        return DropDownMenuData.map((data: DropDownMenuNode, index: number) => getDropDownTab(data, index))
    }

    const wrapOnClick = (onClick?: () => void, disabled?: boolean): () => void => {
        return () => {
            if (disabled) return;
            if (onClick) onClick();
            setActiveTabIdx(null);
            updatePreventCustomCursorStatusAction(false);
            document.removeEventListener(EventType.MOUSE_DOWN, onMouseDownBeyondDropDown);
        }
    }

    

    const getDropDownWindow = (data: DropDownMenuNode) => {
        if (activeTabIdx !== null) {
            const style: React.CSSProperties = {
                top: 35,
                left: activeDropDownAnchor.x,
                height: 40 * data.children.length + 10
            }
            return <div
                className={'DropDownMenuContent'}
                style={style}
                onMouseEnter={onMouseEnterWindow}
                onMouseLeave={onMouseLeaveWindow}
            >
                {data.children.map((element: DropDownMenuNode, index: number) => {
                    return <div className={getDropDownMenuContentOption(element.disabled)}
                        onClick={wrapOnClick(element.onClick, element.disabled)}
                        key={index}
                    >
                        <div className='Marker'/>
                        <img src={element.imageSrc} alt={element.imageAlt}/>
                        {element.name}
                    </div>})}
            </div>
        } else {
            return null;
        }
    }

    return(<div className='DropDownMenuWrapper'>
        <>
            {getDropDownContent()}
            {getDropDownWindow(DropDownMenuData[activeTabIdx])}
        </>
    </div>)
}

const mapDispatchToProps = {
    updatePreventCustomCursorStatusAction: updatePreventCustomCursorStatus,
};

const mapStateToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropDownMenu);

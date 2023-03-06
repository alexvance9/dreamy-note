import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './TagsMenu.css';

const TagsMenuContext = React.createContext();

export function TagsMenuProvider({ children }) {
    const tagsMenuRef = useRef();
    const [value, setValue] = useState();
    

    useEffect(() => {
        setValue(tagsMenuRef.current);
    }, [])

    return (
        <>
            <TagsMenuContext.Provider value={value}>
                {children}
            </TagsMenuContext.Provider>
            <div ref={tagsMenuRef} />
        </>
    );
}

export function TagsMenu({ onClose, children }) {
    const tagsMenuNode = useContext(TagsMenuContext);
    if (!tagsMenuNode) return null;

    return ReactDOM.createPortal(
        <div id="tags-menu">
            <div id="tags-menu-background" onClick={onClose} />
            <div id="tags-menu-content">
                {children}
            </div>
        </div>,
        tagsMenuNode
    );
}
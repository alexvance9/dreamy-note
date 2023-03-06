import { useState, useEffect, useRef } from 'react';
import OpenModalButton from '../OpenModalButton'
import DeleteTagModal from './DeleteTagModal';
import UpdateTagModal from './UpdateTagModal';
const TagsActionMenu = ({tag}) => {
    const [showActions, setShowActions] = useState(false);
    const actionsRef = useRef();

    // open and close action menu for each tag i.e. rename & delete
    const openActions = (e) => {
        
        if (showActions) return setShowActions(false);
        return setShowActions(true);
        
    }
    useEffect(() => {
        if (!showActions) return;

        const closeActions = (e) => {
            // e.stopPropagation()
            if (!actionsRef.current.contains(e.target)) {
                setShowActions(false);
            }
        };

        document.addEventListener('click', closeActions);

        return () => {
            return document.removeEventListener("click", closeActions)
        };
    }, [showActions]);

    const actionClassName = "tag-actions " + (showActions ? "" : "hidden")

    return (
        <div className='tag-actions-menu'>
            <button className="tag-action-button" ref={actionsRef} onClick={openActions}><i className="fa-solid fa-ellipsis"></i></button>
                                <div className='drop-container'>
                                    <div className={actionClassName} >
                                        <OpenModalButton
                                            buttonText="Rename"
                                            modalComponent={<UpdateTagModal tagId={tag.id} tagName={tag.name} />}
                                            />
                                        <OpenModalButton
                                            buttonText="Delete"
                                            modalComponent={<DeleteTagModal tagId={tag.id} />}
                                            />
                                    </div>
                                </div>
        </div>
    )
}

export default TagsActionMenu;
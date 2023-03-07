import { useState } from 'react';
import TagsActionMenu from './TagsActionMenu';

const TagRow = ({tag}) => {
    const [showActions, setShowActions] = useState(false)
    return (
        <div className='tag' key={tag.id} onMouseEnter={() => {
            setShowActions(true);
        }}
            onMouseLeave={() => {
                setShowActions(false);
            }}>
            {tag.name}
            <span>{`(${tag.refsCount})`}</span>
            {showActions && <TagsActionMenu tag={tag} />}
        </div>
    )
}

export default TagRow;
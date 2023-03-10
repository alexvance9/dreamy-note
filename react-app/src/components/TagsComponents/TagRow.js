import { useState } from 'react';
import TagsActionMenu from './TagsActionMenu';
import { useFilter } from '../../context/Filter';

const TagRow = ({tag, setShowMenu}) => {
    const [showActions, setShowActions] = useState(false)
    const { setCurrentFilters } = useFilter()

    const handleFilterClick = async (e) => {
        e.preventDefault()
        await setCurrentFilters([tag])
        return setShowMenu(e)
    }

    return (
        <div className='tag' key={tag.id} onMouseEnter={() => {
            setShowActions(true);
            }}
            onMouseLeave={() => {
                setShowActions(false);
            }}>
            <button onClick={handleFilterClick}>{tag.name}</button>
            <span>{`(${tag.refsCount})`}</span>
            {showActions && <TagsActionMenu tag={tag} />}
        </div>
    )
}

export default TagRow;
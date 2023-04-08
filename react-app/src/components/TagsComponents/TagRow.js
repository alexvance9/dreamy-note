import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TagsActionMenu from './TagsActionMenu';
import { useFilter } from '../../context/Filter';

const TagRow = ({tag, setShowMenu}) => {
    const [showActions, setShowActions] = useState(false)
    const { setCurrentFilters } = useFilter()
    const history = useHistory()

    const handleFilterClick = async (e) => {
        e.preventDefault()
        await setCurrentFilters(filters => {
            return {
                ...filters,
                tags: [tag]
            }
        })
        await history.push('/dreams')
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
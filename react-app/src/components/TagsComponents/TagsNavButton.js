/*
needs: 
    - clicking on tags opens popout menu
    - popout menu opens to the side of the main nav
    - tags are displayed alphabetically
        - when clicked each tag opens dream page, with just dreams with those tags
        - essentially filter/ search.
    - there is a create new tag button
        -opens modal to create a new tag
    - each tag has action menu that allows you to rename or delete
*/
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadTags } from "../../store/tags";
import { TagsMenu } from "../../context/TagMenu";
import TagsPopOut from "./TagsPopOut";
import './Tags.css'

const TagsNavButton = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()

    const tags = useSelector(state => state.tags.tags)
    // console.log(tags)
    useEffect(() => {
        (async () => {
            await dispatch(thunkLoadTags());
            setIsLoaded(true)
        })();
    }, [dispatch]);

    if (!isLoaded) return null;

    const showTags = (e) => {
        e.preventDefault()
        return setShowMenu(!showMenu)
    }

    return (
        <>
        <div className="tab">
            <i className="fa-solid fa-tag"></i><button className="tags-nav-button" onClick={() => setShowMenu(!showMenu)}>Tags</button>
            {showMenu && (
                <TagsMenu onClose={() => setShowMenu(!showMenu)}>
                    <TagsPopOut setShowMenu={showTags} tags={tags}/>
                </TagsMenu>
            )}
        </div>

        </>
    )
}

export default TagsNavButton;
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
import TagsPopOut from "./TagsPopOut";

const TagsNavButton = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(thunkLoadTags());
            setIsLoaded(true)
        })();
    }, [dispatch]);

    if (!isLoaded) return null;

    return (
        <>
        <button>TagsNav</button>
        <TagsPopOut />
        </>
    )
}

export default TagsNavButton;
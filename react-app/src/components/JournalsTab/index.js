import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { loadJournalsThunk } from '../../store/journals';

const JournalsTab = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const journals = useSelector(state => state.journals.journals)
    console.log("inside component:", journals)
    const journalsArr = Object.values(journals)
    console.log("journals array: ", journalsArr)


    useEffect(() => {
        (async () => {
            await dispatch(loadJournalsThunk());
            setIsLoaded(true);
        })();
    }, [dispatch]);


    if(!isLoaded) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div className='journals-tab'>
            {journalsArr.map(journal => (
                <div>{journal.title}</div>
            ))}
        </div>
    )
}

export default JournalsTab
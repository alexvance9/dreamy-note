import { useFilter } from "../../context/Filter";
import DreamNav from "./DreamsNav";


const FilterComponent = ({dreams}) => {
    const {currentFilters, setCurrentFilters} = useFilter()
    
    // let filteredDreams;
    // if (currentFilters.tags.length || currentFilters.journal.length){
        // filteredDreams = dreams.filter(dream => {
        //     if (this.journal.length && this.tags.length) {
                
        //     }
        let filteredDreams = dreams.filter(function (dream) {
            // console.log(this)
            if (this.journal.length && this.tags.length) {
                return dream.journalId === this.journal[0] && dream.tags.some(tag => tag === this.tags[0])
            } else if (this.journal.length && !this.tags.length) {
                return dream.journalId === this.journal[0]
            } else if (!this.journal.length && this.tags.length) {
                return dream.tags.some(tag => tag === this.tags[0])
            } else {
                return dream;
            }

        }, currentFilters)
        //     const filter = currentFilters.tags[0]
        // return dream.tags.some(tag => tag.id === filter.id)   

        // console.log(filteredDreams)
    // } else {
    //     filteredDreams = dreams
    // }
    


    const handleTagClear = (e) => {
        e.preventDefault()
       return setCurrentFilters(filters =>{ return {...filters, tags: []}})
    }
    const handleJournalClear = (e) => {
        e.preventDefault()
       return setCurrentFilters(filters =>{ return {...filters, journal: []}})
    }

    return (
        <div className="dream-nav-container flexcol">
            <div className="flex dream-title">
                <div className="dream-title-inner">
                <i className="fa-solid fa-moon fa-xl"></i>
                <h2>My Dreams</h2>
                </div>
            </div>
            {(currentFilters.journal.length || currentFilters.tags.length) && 
                <div className="filter-container">
                    <h3>Filters</h3>
                {currentFilters.tags.map(tag => (
                    <div className="filter" key={tag.id}>{tag.name}
                        <button onClick={handleTagClear}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                ))}
                {currentFilters.journal.map(journal => (
                    <div className="filter" key={journal.id}>{journal.name}
                        <button onClick={handleJournalClear}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                ))}
                </div>}
            <DreamNav dreams={filteredDreams} />
        </div>
        
    )
}

export default FilterComponent;
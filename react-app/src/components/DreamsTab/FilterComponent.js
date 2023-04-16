import { useFilter } from "../../context/Filter";
import DreamNav from "./DreamsNav";

// dreams prop is passed from dreamstab index page
const FilterComponent = ({dreams}) => {
    // refers to filter context- used to filter dreams by tags
    // set up to eventually add journals filter.
    // shape of filter context: {tags:[{...}, {...}], journal:[]}
    // CURRENTLY only 1 tag filter allowed at a time. 
    const {currentFilters, setCurrentFilters} = useFilter()
    
    // note to self:
    // Added option to have "journals" be part of filters in similar way to tags.
    // However, there was intended to be some extra functionality to the 
    // Journals page, so keeping journals page for now.
        let filteredDreams = dreams.filter(function (dream) {
            // console.log(this)
            if (this.journal.length && this.tags.length) {
                return dream.journalId === this.journal[0] && dream.tags.some(tag => tag.id === this.tags[0].id)
            } else if (this.journal.length && !this.tags.length) {
                return dream.journalId === this.journal[0]
            } else if (!this.journal.length && this.tags.length) {
                return dream.tags.some(tag => tag.id === this.tags[0].id)
            } else {
                return dream;
            }
        }, currentFilters)
        

    // separate functions to handle clearing of different parts of filter context (tags & journals)
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
                {/* these are the same small components for tags and journal, with different clearing functions*/}
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
            {/* send filtered dreams to be displayed in dreams nav */}
            <DreamNav dreams={filteredDreams} />
        </div>
        
    )
}

export default FilterComponent;
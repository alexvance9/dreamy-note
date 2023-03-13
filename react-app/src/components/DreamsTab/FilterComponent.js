import { useFilter } from "../../context/Filter";
import DreamNav from "./DreamsNav";


const FilterComponent = ({dreams}) => {
    const {currentFilters, setCurrentFilters} = useFilter()
    
    let filteredDreams;
    if (currentFilters.length){
        filteredDreams = dreams.filter(dream => {
            const filter = currentFilters[0]
        return dream.tags.some(tag => tag.id === filter.id)   
        })
        // console.log(filteredDreams)
    } else {
        filteredDreams = dreams
    }
    


    const handleClear = (e) => {
        e.preventDefault()
       return setCurrentFilters([])
    }

    return (
        <div className="dream-nav-container flexcol">
            <div className="flex dream-title">
                <div className="dream-title-inner">
                <i className="fa-solid fa-moon fa-xl"></i>
                <h2>My Dreams</h2>
                </div>
            </div>
            {currentFilters.length > 0 && 
                <div className="filter-container">
                    <h3>Filters</h3>
                {currentFilters.map(tag => (
                    <div className="filter" key={tag.id}>{tag.name}
                        <button onClick={handleClear}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                ))}
                </div>}
            <DreamNav dreams={filteredDreams} />
        </div>
        
    )
}

export default FilterComponent;
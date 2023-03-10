import { useFilter } from "../../context/Filter";
import DreamNav from "./DreamsNav";


const FilterComponent = ({dreams}) => {
    // console.log(dreams)
    const {currentFilters, setCurrentFilters} = useFilter()

    const handleClear = (e) => {
        e.preventDefault()
       return setCurrentFilters([])
    }

    return (
        <div className="dream-nav-container flexcol">
            <div className="flex dream-title">
                <i className="fa-solid fa-moon fa-xl"></i>
                <h2>My Dreams</h2>
            </div>
            {currentFilters.length > 0 && 
                <div className="filter-container">
                {currentFilters.map(tag => (
                    <div className="filter">{tag.name}
                        <button onClick={handleClear}>X</button>
                    </div>
                ))}
                </div>}
            <DreamNav dreams={dreams} />
        </div>
        
    )
}

export default FilterComponent;
import {createContext, useContext, useState} from 'react'

const FilterContext = createContext();

export function useFilter() {
    return useContext(FilterContext)
}

function FilterProvider({children}){
    const [currentFilters, setCurrentFilters] = useState({
        tags: [],
        journal: []
    })

    return (
        <FilterContext.Provider value={{currentFilters, setCurrentFilters}}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterProvider;
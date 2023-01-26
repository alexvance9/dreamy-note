import { useState } from "react"

const DreamDetail = ({dream}) => {

    const [isEdit, setIsEdit] = useState(false)


    const openEditor = async (e) => {
        e.preventDefault()
        setIsEdit(true)
    }

    const saveChanges = async(e) => {
        e.preventDefault()
        setIsEdit(false)
    }

    let detailComponents;
    if (isEdit) {
        detailComponents = (
            <>
            <div>this will be the edit a dream form</div>
            <button onClick={saveChanges}>this will save the changes</button>
            </>
        )
    } else {
        detailComponents = (
            <>
                <div>this will be the detail page</div>
                <button onClick={openEditor}>edit the dream</button>
            </>
        )
    }

    return (
        <div>{detailComponents}</div>
    )
}

export default DreamDetail
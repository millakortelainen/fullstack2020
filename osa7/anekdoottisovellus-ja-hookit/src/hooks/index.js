import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        if (event) {
            setValue(event.target.value)
        } else {
            setValue('')
        }
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResetFields = (setValues) => {
    const onClick = () => {
        for (const a of setValues) {
            a.onChange()
        }
    }
    return {
        onClick
    }
} 
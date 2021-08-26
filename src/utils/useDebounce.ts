import { useState } from "react"
import { useEffect } from "react"

export const useDebounce = <V>( value: V, delay?: number ) => {
    const [ debouncedValue, setDebouncedValue ] = useState<V>( value )

    useEffect( () => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout( () => setDebouncedValue( value ), delay )
        // 每次在上一个useEffect处理完以后再运行s
        return () => clearTimeout( timeout )
    }, [ value, delay ] )

    return debouncedValue
}

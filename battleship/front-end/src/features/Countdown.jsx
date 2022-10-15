import { useEffect, useState } from 'react';

export default function Countdown({counter, onEnd}){
    const [count, setCount] = useState(counter)

    useEffect(() => {
        const interval = setInterval(() => setCount(count => count - 1), 1000)
        return () => clearInterval(interval)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(count === 0){
            onEnd();
        }
    }, [count]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>{ count }</>
    )
}

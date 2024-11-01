import React from 'react';

export default function useClickOutside(onClickOutside: () => void) {
    const ref = React.useRef<HTMLDivElement>(null);

    function handleClick(this: Document, ev: MouseEvent) {
        if (ev.target && ref.current && !ref.current.contains(ev.target as Node)) {
            onClickOutside()
        }
    }

    React.useEffect(() => {
        document.addEventListener('click', handleClick, true)
        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [])

    return { ref }
}
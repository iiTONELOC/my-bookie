import { useState, useEffect } from 'react';

export function computeHeight(element) {
    if (element) {
        const elHeight = element.clientHeight;
        const windowHeight = window.innerHeight;
        return windowHeight - elHeight;
    } else {
        throw new Error('element is not defined');
    }
}
export default function ComputedPageHeight() {
    const [mounted, setMounted] = useState(false);
    const nav = document.querySelector('nav[navdata]');
    const [containerHeight, setContainerHeight] = useState('94vh');
    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
            window.removeEventListener('resize', setContainerHeight(computeHeight(nav)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (mounted) {
            setContainerHeight(computeHeight(nav))
            window.addEventListener('resize', () => {
                setContainerHeight(computeHeight(nav));
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted])

    return containerHeight;
}
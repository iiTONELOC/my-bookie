import { useEffect, useState } from 'react';
function scroll() {
    try {
        const current = document.querySelector('.current-hour')
        current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        return
    }
};
export default function ScrollIntoView() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
            window.removeEventListener('resize', () => scroll())
        };
    }, []);
    useEffect(() => {
        scroll();
        if (isMounted) {
            window.addEventListener('resize', () => scroll());
        }
        // eslint-disable-next-line
    }, [isMounted]);
    if (!isMounted) return null;
    return true
}
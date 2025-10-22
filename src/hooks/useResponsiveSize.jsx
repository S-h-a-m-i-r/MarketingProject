import { useState, useEffect } from "react";

export const useResponsiveSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    const breakpoints = {
        1200: 1000, // width when >=1200px
        1024: 600,
        768: 500,
        425: 400,
        310: 300, 
        250: 250, 
        0: 150, // fallback for all other screens below the minimum
    };

    const getWidth = (windowWidth) => {
        for (const bp of Object.keys(breakpoints).map(Number).sort((a, b) => b - a)) {
            if (windowWidth >= bp) return breakpoints[bp];
        }
        return breakpoints[0];
    };

    useEffect(() => {
        const handleResize = () => {
            const width = getWidth(window.innerWidth);
            const height = width * 2.5;
            setSize({ width, height });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
};

"use client"

import React from 'react';
import TL from '@utilities/timeline3/js/TL';
import '@styles/timeline.css';

const Timeline = ({ target, events, title, options }) => {
    const timelineEl = React.useRef(null);
    React.useEffect(() => {
        if (timelineEl.current) {
            new TL.Timeline(timelineEl.current, { events, title, options });
        }
    }, []);
    return React.cloneElement(target, { ref: timelineEl });
};

export default Timeline;
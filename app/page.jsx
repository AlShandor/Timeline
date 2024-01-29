"use client"

import dynamic from "next/dynamic";
import { initialEvents, title } from '@utilities/data';
import Feed from "@components/Feed";
import { useState, useEffect } from "react";

const DynamicTimeline = dynamic(() => import("../components/Timeline"), {
    ssr: false,
});

const Home = () => {
    const [events, setEvents] = useState([]);
    const [elements, setElements] = useState([]);

    const updateEvents = () => {
        setEvents(elements.map(el => (el.end_year) ? ({
            // event has end year
            start_date: {
                year: el.start_year,
                month: el.start_month,
                day: el.start_day,
                hour: el.start_hour,
                display_date: el.display_date_en,
            },
            end_date: {
                year: el.end_year,
                month: el.end_month,
                day: el.end_day,
                hour: el.end_hour,
            },
            text: {
                headline: el.headline_en,
                text: el.text_en,
            },
            background: {
                url: el.background_url,
            },
            media: {
                url: el.media_url,
                caption: el.media_caption_en,
                credit: el.media_credit,
            },
        }) : ({
                // event don't have end year
                start_date: {
                    year: el.start_year,
                    month: el.start_month,
                    day: el.start_day,
                    hour: el.start_hour,
                    display_date: el.display_date_en,
                },
                text: {
                    headline: el.headline_en,
                    text: el.text_en,
                },
                background: {
                    url: el.background_url,
                },
                media: {
                    url: el.media_url,
                    caption: el.media_caption_en,
                    credit: el.media_credit,
                },
        })));

        console.log(events);
    }

    // set initial events
    useEffect(() => {
        setEvents(initialEvents);
        console.log(events);
    }, []);

    const handleAdd = () => {
        updateEvents();
    };

    return (
        <>
            <section className='w-full mb-12 flex-center flex-col'>
                <h1 className='head_text text-center'>
                    Discover & Share
                    <br className='max-md:hidden' />
                    <span className='blue_gradient text-center'> Historical Figures and Events</span>
                </h1>
                <p className='desc text-center'>
                    Timeline is an online tool that helps you study and visualize historical figures and events.
                </p>
            </section>
            <section>
                <div className="container w-[1600px] max-w-[1600px]">
                    <DynamicTimeline target={<div className="timeline" style={{ width: '100%', height: 500 }} />}
                        events={events} title={title} />
                </div>
            </section>
            <Feed
                elements={elements}
                setHomepageElements={setElements}
            />
        </>
    );
};

export default Home;

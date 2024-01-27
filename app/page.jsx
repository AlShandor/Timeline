"use client"

import dynamic from "next/dynamic";
import { events, title } from '@utilities/data';
import Feed from "@components/Feed";

const DynamicTimeline = dynamic(() => import("../components/Timeline"), {
    ssr: false,
});

const Home = () => {
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
            <Feed />
        </>
    );
};

export default Home;

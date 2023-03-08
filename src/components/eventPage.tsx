import Circles from '@/components/circles';
import Events from '@/components/events';
import { getCircles, getEvents } from '@/notion';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueries } from 'react-query';
import EventInfo from './eventInfo';

export default function EventPage({ events, circles }: { events: any; circles: any }) {
    const router = useRouter();
    const eventIndex = router.query.index as string | undefined;

    const [pageType, setPageType] = useState<'events' | 'circles'>(
        router.asPath.includes('circles') ? 'circles' : 'events'
    );

    if (!eventIndex)
        return (
            <main>
                <div className="text-center text-3xl font-bold text-ted-red-100 md:text-5xl">
                    Our Events
                </div>
                <div className="mt-4 text-center text-lg font-bold text-ted-black-100 md:text-2xl">
                    Discover amazing events organized at{' '}
                    <span className="text-ted-red-100">TED</span>
                    xCITBengaluru
                </div>
                <div className="my-20 flex flex-col flex-wrap items-center justify-center gap-8 sm:flex-row md:gap-32 lg:gap-48">
                    <button
                        onClick={() => setPageType('events')}
                        style={
                            pageType === 'events'
                                ? { borderColor: '#e62b1e', color: 'black' }
                                : undefined
                        }
                        className="rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-16 py-4 text-lg font-semibold text-ted-black-200 shadow-[2px_10px_60px_#e62b1e33] duration-150 hover:border-ted-red-100 hover:text-ted-red-100 sm:text-2xl"
                    >
                        TEDx Events
                    </button>
                    <button
                        onClick={() => setPageType('circles')}
                        style={
                            pageType === 'circles'
                                ? { borderColor: '#e62b1e', color: 'black' }
                                : undefined
                        }
                        className="rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-16 py-4 text-lg font-semibold text-ted-black-200 shadow-[2px_10px_60px_#e62b1e33] duration-150 hover:border-ted-red-100 hover:text-ted-red-100 sm:text-2xl"
                    >
                        TEDx Circles
                    </button>
                </div>
                {pageType === 'events' ? <Events data={events} /> : <Circles data={circles} />}
            </main>
        );

    if (pageType == 'circles') return <EventInfo data={circles} />;
    if (pageType == 'events') return <EventInfo data={events} />;
}

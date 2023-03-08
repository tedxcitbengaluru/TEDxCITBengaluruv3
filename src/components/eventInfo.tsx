import { useDate } from '@/utils/date';
import {
    faCalendarDay,
    faClock,
    faLeftLong,
    faMapLocation,
    faRightLong
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const EventInfo: React.FC<{
    data: any;
}> = ({ data }) => {
    const router = useRouter();

    if (router.isFallback) return <div>Loading...</div>;

    const eventIndex = router.query.index as string;

    const event = data[eventIndex];

    const date = useDate(event.date.start);

    return (
        <main>
            <div className="text-center text-5xl font-bold text-ted-red-100">Overview</div>
            <div className="mx-auto my-6 h-[2px] w-[100px] bg-ted-red-200"></div>
            <div className="mb-16 text-center text-7xl font-bold text-ted-black-100">
                {event.title}
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-x-16 gap-y-8 px-16 text-sm font-semibold text-ted-red-100 sm:text-lg md:px-32 md:text-3xl">
                <div className="flex items-center gap-4 rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-8 py-4 shadow-[2px_10px_60px_#e62b1e33]  duration-150 md:px-16 ">
                    <FontAwesomeIcon icon={faCalendarDay} style={{ width: '1em', height: '1em' }} />
                    {`${date.date} ${date.month} ${date.year}`}
                </div>
                <div className="flex items-center gap-4 rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-8 py-4 shadow-[2px_10px_60px_#e62b1e33]  duration-150 md:px-16 ">
                    <FontAwesomeIcon icon={faClock} style={{ width: '1em', height: '1em' }} />{' '}
                    {`${date.hours % 12}:${date.minutes < 10 ? '0' : ''}${date.minutes} ${
                        date.hours >= 12 ? 'PM' : 'AM'
                    }`}
                </div>
                <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-8 py-4 text-center shadow-[2px_10px_60px_#e62b1e33] duration-150  sm:flex-row md:px-16 ">
                    <FontAwesomeIcon icon={faMapLocation} style={{ width: '1em', height: '1em' }} />
                    Cambridge Institute Of Technology, KR Puram, Bengaluru
                </div>
            </div>
            <div className="mt-16 flex w-screen flex-col items-center gap-8 bg-ted-red-100 py-8 px-8 font-semibold text-ted-white-100 md:gap-16 md:px-24 md:py-16">
                <div className="text-center text-3xl md:text-5xl">About the Session</div>
                <div className="text-justify text-sm md:text-lg">{event.about}</div>
            </div>
            <div className="bg-white-100 flex flex-row py-8 px-16 text-xs text-ted-red-100 sm:text-sm md:text-xl">
                {parseInt(eventIndex) - 1 > 0 && (
                    <div className="mr-auto  hover:underline">
                        <Link
                            href={`${parseInt(eventIndex) - 1}`}
                            className="flex flex-row items-center gap-4"
                        >
                            <FontAwesomeIcon
                                icon={faLeftLong}
                                style={{ width: '1em', height: '1em' }}
                            />
                            Previous Event #{parseInt(eventIndex) - 1}
                        </Link>
                    </div>
                )}

                {parseInt(eventIndex) < Object.keys(data).length && (
                    <div className="ml-auto  hover:underline">
                        <Link
                            href={`${parseInt(eventIndex) + 1}`}
                            className="flex flex-row items-center gap-4"
                        >
                            Next Event #{parseInt(eventIndex) + 1}{' '}
                            <FontAwesomeIcon
                                icon={faRightLong}
                                style={{ width: '1em', height: '1em' }}
                            />
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
};

export default EventInfo;

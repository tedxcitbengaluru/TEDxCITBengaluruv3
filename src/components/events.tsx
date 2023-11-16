import { convertDate } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Events: React.FC<{
    data: any;
}> = ({ data }) => {
    return (
        <div className="relative mb-16 flex w-screen flex-col items-center gap-16 py-2 text-sm font-semibold text-ted-white-100 sm:gap-32 sm:py-8 sm:text-lg md:mb-24 md:gap-48 md:py-16 md:text-2xl">
            {Object.values(data)
                .sort((a: any, b: any) => b.index - a.index)
                .map((event: any, i) => {
                    if (event.hide) return <></>;
                    const date = convertDate(event.date.start);
                    return (
                        <div key={i} className="relative flex flex-col items-center">
                            <div className="absolute top-[-1rem] z-10 rounded-lg bg-ted-red-100 px-4 py-2 sm:px-8 md:top-[-2rem] md:rounded-2xl md:px-16 md:py-4">{`${date.date} ${date.month} ${date.year}`}</div>
                            <div className="relative h-[calc(510/1047*80vw)] w-[80vw] overflow-clip rounded-3xl border-4 border-ted-red-100">
                                <Image src={event.poster} fill alt={event.title} />
                            </div>

                            <div className="absolute bottom-[-1rem] z-10 rounded-lg bg-ted-red-100 py-2 px-4 hover:underline sm:px-8 md:bottom-[-2rem] md:rounded-2xl md:py-4  md:px-16">
                                <Link href={`/events/${event.index}`}>Know More</Link>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Events;

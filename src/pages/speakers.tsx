import { getSpeakers } from '@/notion';
import Image from 'next/image';

export default function Speakers({ speakers }: { speakers: any }) {
    const sortedOrder = Object.keys(speakers).sort(
        (a: string, b: string) => parseInt(b) - parseInt(a)
    );

    return (
        <main className="px-8">
            <div className="mt-8 text-center text-3xl font-bold text-ted-red-100 md:text-5xl">
                Our Speakers & Performers
            </div>
            <div className="mt-8 text-center font-semibold text-ted-black-100 selection:text-lg md:text-2xl">
                Discover the amazing speakers & Performers behind previous{' '}
                <span className="text-ted-red-100">TED</span>
                xCITBengaluru
            </div>
            {sortedOrder.map((order) => {
                return (
                    <>
                        <div className="mb-32 text-center text-5xl font-bold">
                            <div className="my-16">
                                <span className="text-ted-red-100">
                                    {speakers[order].event_title}
                                </span>{' '}
                                Event
                            </div>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-16 px-8 md:px-32">
                                {speakers[order].people
                                    .sort((a: any, b: any) => a.order - b.order)
                                    .map((person: any) => {
                                        return (
                                            <div
                                                key={person.name}
                                                className="relative flex flex-col items-center"
                                            >
                                                <div className="relative h-[200px] w-[200px] overflow-clip rounded-[3rem] border-4 border-ted-red-100 md:h-[300px] md:w-[300px]">
                                                    <Image
                                                        src={person.photo}
                                                        fill
                                                        alt={person.name}
                                                        className=""
                                                    />
                                                </div>
                                                <div className="mt-4 text-xl font-semibold text-ted-black-100 md:text-3xl">
                                                    {person.name}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </>
                );
            })}
        </main>
    );
}

export async function getStaticProps() {
    const speakers = await getSpeakers();
    return {
        props: {
            speakers
        },
        revalidate: process.env.REVALIDATE ? parseInt(process.env.REVALIDATE) : 10
    };
}

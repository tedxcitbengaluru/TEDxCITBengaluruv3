import Socials from '@/components/Socials';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faArrowTrendUp,
    faLightbulb,
    faCertificate
} from '@fortawesome/free-solid-svg-icons';
import { useDate } from '@/utils/date';
import Image from 'next/image';
import { getHome, getSocial } from '@/notion';

export default function Home({ home, socials }: { home: any; socials: any }) {
    const date = useDate(home.date.start);
    return (
        <main>
            <div className="relative flex h-[calc(510/1047*100vw)] w-screen justify-center">
                <Image
                    src={home.backdrop_photo}
                    alt="banner"
                    fill
                    className={home.full_poster ? '' : 'blur'}
                    priority
                />
                {!home.full_poster && (
                    <>
                        <div className="absolute top-[30%] z-10">
                            {home.video ? (
                                <div className="h-[calc(1080/1920*80vw)] w-[80vw]">
                                    <iframe
                                        src={home.video}
                                        allow="autoplay"
                                        className="h-full w-full rounded-3xl border-4 border-ted-white-100"
                                    />
                                </div>
                            ) : (
                                <div className="relative h-[calc(510/1047)*80vw] w-[80vw]">
                                    <Image
                                        src={home.backdrop_photo}
                                        className="rounded-3xl border-4 border-ted-white-100"
                                        fill
                                        alt="banner"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-[-10%] h-[40%] w-screen bg-ted-red-100"></div>
                    </>
                )}
            </div>
            <div className="flex w-full flex-col items-center justify-between gap-16 bg-ted-red-100 px-16  py-32 sm:py-48 lg:flex-row lg:items-start lg:gap-48 xl:px-48">
                <div className="flex flex-col items-center gap-16 lg:items-start">
                    <div className="text-center text-5xl font-semibold text-ted-white-100">
                        {home.hero_title}
                    </div>
                    <div className="text-justify text-lg text-ted-white-100">{home.hero_text}</div>
                    <Link href={home.action_url}>
                        <div className="rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-8 py-4 text-center text-2xl font-semibold text-ted-black-100 hover:border-ted-black-100 hover:text-ted-red-100 sm:px-16">
                            {home.action_text}
                        </div>
                    </Link>
                </div>
                <div className="text-center text-5xl font-bold text-ted-white-100">
                    <div className="text-[15rem]">{date.date}</div>
                    <div>{date.month}</div>
                    <div>{date.year}</div>
                </div>
            </div>
            <div className="my-24 flex flex-col items-center gap-8">
                <div className="mx-[30vw] text-center text-3xl font-bold leading-normal text-ted-red-100 sm:text-5xl">
                    Why should you attend TEDxCITBengaluru?
                </div>
                <div className="flex w-[80%] flex-col gap-8">
                    {[
                        'We believe a TEDx Talk is a journey, With the Idea being the destination.',
                        'We find the most unique, thought-provoking and impactful ideas within our local community and provide a platform for it to spread far and wide.',
                        'Connect with like-minded individuals and build your network.',
                        'Watch mesmerizing performances by our Entertainers that leave you spell-bound.'
                    ].map((point) => {
                        return (
                            <div className="flex w-full flex-row items-center justify-start gap-4 rounded-2xl bg-ted-white-100 py-8 px-8  text-sm font-semibold shadow-[2px_10px_60px_#e62b1e33] sm:text-xl md:gap-8 md:px-16 md:text-2xl">
                                <span className="text-xs text-ted-red-100 md:text-lg">X</span>
                                {point}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="my-24 flex flex-col items-center">
                <div className="mx-[30vw] text-center text-3xl font-bold leading-normal text-ted-red-100 sm:text-5xl">
                    What do you gain out of TEDxCITBengaluru?
                </div>
                <div className="grid grid-cols-1 gap-12 py-8 md:grid-cols-2">
                    {[
                        {
                            title: 'Certificate',
                            subtitle: 'A Certificate for you to be proud of.',
                            icon: faCertificate
                        },
                        {
                            title: 'Memorabilia',
                            subtitle: 'Memorabilia for you to cherish.',
                            icon: faHeart
                        },
                        {
                            title: 'Experience',
                            subtitle: 'An Experience for you to learn from.',
                            icon: faArrowTrendUp
                        },
                        {
                            title: 'Ideas',
                            subtitle: 'And of course, Ideas for you to reflect on.',
                            icon: faLightbulb
                        }
                    ].map((card) => {
                        return (
                            <div className="flex flex-col items-center rounded-2xl bg-ted-white-100 py-8 px-4 shadow-[2px_10px_60px_#e62b1e33]">
                                <div className="flex flex-row items-center justify-center gap-4  text-2xl font-bold text-ted-red-100 lg:text-3xl">
                                    <FontAwesomeIcon
                                        style={{ width: '1em', height: '1em' }}
                                        icon={card.icon}
                                    />
                                    {card.title}
                                </div>
                                <div className="my-2 h-[1px] w-[15%] bg-ted-red-200"></div>
                                <div className="text-md font-semibold lg:text-lg">
                                    {card.subtitle}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className=" flex w-full flex-col items-center gap-8 bg-ted-red-100 py-16 text-white">
                <div className="text-lg font-semibold md:text-2xl">What are you waiting for?</div>
                <div className=" mx-16 text-center text-2xl font-bold leading-loose md:text-3xl lg:mx-64">
                    Be a part of the upcoming event at TEDxCITBengaluru
                </div>
                <Link href={home.action_url}>
                    <div className="rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-16 py-4 text-2xl font-semibold text-ted-black-100 hover:border-ted-black-100 hover:text-ted-red-100">
                        {home.action_text}
                    </div>
                </Link>
            </div>
            <Socials socials={socials} />
        </main>
    );
}

export async function getStaticProps() {
    const [home, socials] = await Promise.all([getHome(), getSocial()]);

    return {
        props: {
            home,
            socials
        },
        revalidate: 60
    };
}

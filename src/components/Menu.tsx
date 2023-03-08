import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

export default function Menu({ disableMenu }: { disableMenu: () => void }) {
    return (
        <div className="isolate z-10 h-screen w-screen bg-ted-red-100 font-bold">
            <button
                className={
                    'absolute right-0 z-20 mr-16 mt-6 text-4xl text-ted-white-100 hover:animate-spin-once '
                }
                onClick={disableMenu}
            >
                X
            </button>
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 text-2xl sm:text-3xl md:text-5xl lg:text-7xl">
                {[
                    ['Home', '/'],
                    ['Events', '/events'],
                    ['Speakers & Performers', '/speakers'],
                    ['Partners', '/partners'],
                    ['About Us', '/about']
                ].map(([name, route], index) => {
                    return (
                        <Link href={route} key={index}>
                            <div
                                className="md:menuItem text-center text-ted-white-100"
                                onClick={disableMenu}
                                data-text={name}
                            >
                                {name}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

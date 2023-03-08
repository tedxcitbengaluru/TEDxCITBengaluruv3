import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Circles: React.FC<{
    data: any;
}> = ({ data }) => {
    return (
        <div className="relative mb-24 flex w-screen flex-row flex-wrap justify-center gap-x-16 gap-y-32 px-16 py-16 text-lg font-semibold text-ted-white-100">
            {Object.values(data)
                .sort((a: any, b: any) => b.index - a.index)
                .map((circle: any) => {
                    if (circle.hide) return <></>;
                    return (
                        <div className="relative flex flex-col items-center">
                            <div className="relative h-[380px] w-[306px] overflow-clip rounded-3xl border-4 border-ted-red-100">
                                <Image src={circle.poster} fill alt={circle.title} />
                            </div>

                            <div className="absolute bottom-[-2rem] z-10 rounded-2xl bg-ted-red-100 py-4 px-16  hover:underline">
                                <Link href={`/circles/${circle.index}`}>
                                    TED Circle #{circle.index}
                                </Link>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Circles;

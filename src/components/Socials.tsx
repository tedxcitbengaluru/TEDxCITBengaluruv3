import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Socials: React.FC<{
    socials: { icon?: string; link?: string; order?: number; title: string }[];
}> = ({ socials }) => {
    return (
        <div className="relative flex flex-col items-center gap-16 py-16 text-center text-3xl font-semibold text-ted-red-100 md:py-24 md:text-5xl">
            <div>Get in touch with us</div>
            <div className="relative flex w-full flex-row flex-wrap justify-center gap-8 px-16 md:gap-24">
                {socials
                    .sort((a, b) => (a.order && b.order ? a.order - b.order : 0))
                    .map((social, i) => {
                        if (!social.link || !social.icon) return <></>;
                        return (
                            <div
                                key={i}
                                className="hover:redFilter relative h-10 w-10 md:h-20 md:w-20 "
                            >
                                <Link href={social.link}>
                                    <Image src={social.icon} fill alt={social.title} />
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Socials;

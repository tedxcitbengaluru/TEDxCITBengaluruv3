import { getSponsors } from '@/notion';
import Image from 'next/image';

export default function Partners({ partners }: { partners: any }) {
    const sortedOrder = Object.keys(partners).sort(
        (a: string, b: string) => parseInt(a) - parseInt(b)
    );

    return (
        <main className="px-8">
            {sortedOrder.map((order) => {
                return (
                    <>
                        <div className="my-16 text-center text-5xl font-bold text-ted-red-100">
                            {partners[order].category_title}
                            <div className="mx-16 mt-8 flex flex-wrap items-center justify-center gap-16">
                                {partners[order].brands.map((brand: any) => {
                                    return (
                                        <div className="relative flex w-[200px] flex-col">
                                            <Image
                                                src={brand.logo}
                                                width={brand.logo_width}
                                                height={brand.logo_height}
                                                alt={brand.name}
                                            />
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
    const partners = await getSponsors();
    return {
        props: {
            partners
        },
        revalidate: process.env.REVALIDATE ? parseInt(process.env.REVALIDATE) : 10
    };
}

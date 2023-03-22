import Image from 'next/image';

const Founders: React.FC<{
    founders: any[];
}> = ({ founders }) => {
    return (
        <>
            <div className="my-16 text-center text-3xl font-bold text-ted-black-100 md:text-5xl">
                Founders
            </div>
            <div className="relative mx-auto my-16 flex w-[80vw] flex-row flex-wrap justify-evenly gap-16">
                {JSON.stringify(founders) &&
                    founders
                        .sort((a: any, b: any) => a.order - b.order)
                        .map((founder: any) => {
                            return (
                                <div className="relative flex  flex-col items-center">
                                    <div className="relative h-[200px] w-[200px] overflow-clip rounded-[3rem] border-4 border-ted-red-100 md:h-[300px] md:w-[300px]">
                                        <Image
                                            src={founder.photo}
                                            fill
                                            alt={founder.name}
                                            className=""
                                        />
                                    </div>
                                    <div className="mt-4 text-xl font-semibold text-ted-black-100 md:text-3xl">
                                        {founder.name}
                                    </div>
                                    <div className="text-sm font-semibold text-ted-red-100 md:text-xl">
                                        {founder.title}
                                    </div>
                                </div>
                            );
                        })}
            </div>
        </>
    );
};

export default Founders;

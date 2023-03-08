import Image from 'next/image';
import React, { useState } from 'react';

const Team: React.FC<{
    team: any;
}> = ({ team }) => {
    const sortedKeys = Object.keys(team).sort((a: string, b: string) => parseInt(a) - parseInt(b));
    const [selectedKey, setSelectedKey] = useState<string>(sortedKeys[sortedKeys.length - 1]);

    return (
        <>
            <div className="my-16 text-center text-3xl font-bold text-ted-red-100 md:text-5xl">
                Meet our Core Team
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-8 md:gap-16">
                {sortedKeys.map((key) => {
                    return (
                        <button
                            onClick={() => setSelectedKey(key)}
                            style={
                                selectedKey === key
                                    ? { borderColor: '#e62b1e', color: 'black' }
                                    : undefined
                            }
                            className="rounded-2xl border-2 border-ted-white-100 bg-ted-white-100 px-16 py-4 text-lg font-semibold text-ted-black-200 shadow-[2px_10px_60px_#e62b1e33] duration-150 hover:border-ted-red-100 hover:text-ted-red-100 md:text-2xl"
                        >
                            {team[key].event_title}
                        </button>
                    );
                })}
            </div>
            {(() => {
                const eventTeam = team[selectedKey].team;
                const sortedCategoryKeys = Object.keys(eventTeam).sort(
                    (a, b) => parseInt(a) - parseInt(b)
                );
                return (
                    <>
                        {sortedCategoryKeys.map((cat) => {
                            return (
                                <>
                                    <div className="my-16 text-center text-3xl font-bold text-ted-black-100 md:text-5xl">
                                        {eventTeam[cat].category_title}
                                    </div>
                                    <div className="relative mx-auto flex w-[80vw] flex-row flex-wrap justify-evenly gap-16">
                                        {eventTeam[cat].people
                                            .sort((a: any, b: any) => a.order - b.order)
                                            .map((person: any) => {
                                                return (
                                                    <div className="relative flex  flex-col items-center">
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
                                                        <div className="text-sm font-semibold text-ted-red-100 md:text-xl">
                                                            {person.title}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div className="mx-auto mt-16 h-[1px] w-[50%] bg-ted-red-200"></div>
                                </>
                            );
                        })}
                    </>
                );
            })()}
        </>
    );
};

export default Team;

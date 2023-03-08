import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

export default function Navbar({ enableMenu }: { enableMenu: () => void }) {
    return (
        <div className="flex justify-between items-center px-4 sm:px-16 h-[10vh] sm:h-[12vh] py-2 sm:py-4">
            <Link href="/" className="w-auto h-[50%] xs:h-[70%] sm:w-auto sm:h-full">
                <Image
                    src="/logo/nobg.png"
                    width={1346}
                    height={185}
                    // fill
                    className="w-full h-full"
                    alt="Logo"
                />
            </Link>
            <button className="h-[30%] xs:h-[40%]" onClick={enableMenu}>
                <Image
                    src="/icons/menu.svg"
                    className="w-full h-full"
                    width={185}
                    height={185}
                    alt="Menu"
                />
            </button>
        </div>
    );
}

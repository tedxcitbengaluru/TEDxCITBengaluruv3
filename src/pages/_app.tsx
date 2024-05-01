import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/utils/providers';

export default function App({ Component, pageProps }: AppProps) {
    const [menuVisible, setMenuVisible] = useState(false);

    const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), []);

    useEffect(() => {
        Router.events.on('routeChangeComplete', resetWindowScrollPosition);

        return () => {
            Router.events.off('routeChangeComplete', resetWindowScrollPosition);
        };
    }, []);

    return (
        <>
            <Head>
                <title>TEDxCITBengaluru</title>
                <meta name="description" content="Indipendently organized TED Event" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/android-icon-192x192.png"
                />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            {menuVisible ? (
                <Menu disableMenu={() => setMenuVisible(false)} />
            ) : (
                <>
                    <Providers>
                        <Navbar enableMenu={() => setMenuVisible(true)} />
                        <Component {...pageProps} />
                        <footer className="w-screen bg-ted-red-100 px-8 py-4 text-center text-xs text-ted-white-100 md:text-sm">
                            Copyright 2023 © TEDxCITBengaluru This independent TEDx event is
                            operated under license from TED
                        </footer>
                    </Providers>
                    <Toaster richColors closeButton />
                </>
            )}
        </>
    );
}

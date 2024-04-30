import { GetStaticProps } from 'next';

import React from 'react';

interface GalleryProps {
    images: string[];
}

const Photogallery: React.FC<GalleryProps> = ({ images }) => {
    return (
        <div>
            <div className="photogallery-container">
                {images.map((src, index) => (
                    <div className="photogallery-item" key={index}>
                        <img src={src} alt={`Pic ${index + 1}`} loading="lazy" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const getServerSideProps: GetStaticProps = async () => {
    try {
        const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
        const driveLink = process.env.GOOGLE_DRIVE_API_LINK;

        if (!apiKey || !driveLink) {
            throw new Error('Google Drive API key or link not provided in environment variables');
        }

        const response = await fetch(`${driveLink}&key=${apiKey}`);
        const data = await response.json();

        const images = data.items.map((item: any) => item.thumbnailLink);

        return {
            props: {
                images
            },
            revalidate: process.env.REVALIDATE ? parseInt(process.env.REVALIDATE) : 10
        };
    } catch (error) {
        console.error('Error fetching images:', error);
        return {
            props: {
                images: []
            }
        };
    }
};

export default Photogallery;

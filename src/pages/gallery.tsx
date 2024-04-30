import { GetStaticProps } from 'next';

import React from 'react';
import Image from 'next/image';

interface GalleryProps {
    resources: { id: string; type: 'image' | 'video'; mimetype: string; webContentLink: string }[];
}

//  {
//       kind: 'drive#file',
//       userPermission: [Object],
//       fileExtension: 'mp4',
//       md5Checksum: '7d8d9c8210026141be71069190428626',
//       selfLink: 'https://www.googleapis.com/drive/v2/files/1Tzp3V0U4qUp83Nevdka_XA_Afi6kzrh9',
//       ownerNames: [Array],
//       lastModifyingUserName: 'tedxcitbengaluru',
//       editable: true,
//       writersCanShare: true,
//       downloadUrl: '/drive/v2/files/1Tzp3V0U4qUp83Nevdka_XA_Afi6kzrh9?alt=media&source=downloadUrl',
//       mimeType: 'video/mp4',
//       parents: [Array],
//       thumbnailLink: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBNHmXhCdzunccDScmTOfRzfWrBzOEN5ffQag0E7RyhGI3UzrFbmgKK1yHAXipUfixiTUOMkwu_122YuW3JrAdx0VyA2DpeY0cJ3YQ=s220',
//       appDataContents: false,
//       iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/video/mp4',
//       shared: true,
//       lastModifyingUser: [Object],
//       owners: [Array],
//       headRevisionId: '0B1yAsd8meyqNUitDbmgweDN0bTJmMzZ0UWxMWStrTno5aEQ0PQ',
//       copyable: false,
//       etag: '"MTcxNDQ2NTQzNTk3OQ"',
//       alternateLink: 'https://drive.google.com/file/d/1Tzp3V0U4qUp83Nevdka_XA_Afi6kzrh9/view?usp=drivesdk',
//       embedLink: 'https://drive.google.com/file/d/1Tzp3V0U4qUp83Nevdka_XA_Afi6kzrh9/preview?usp=drivesdk',
//       webContentLink: 'https://drive.google.com/uc?id=1Tzp3V0U4qUp83Nevdka_XA_Afi6kzrh9&export=download',
//       fileSize: '2024527',
//       copyRequiresWriterPermission: false,
//       spaces: [Array],
//       id: '1Tzp3V0U4qUp83Nevdka_XA_Afi6kzrh9',
//       title: 'Copy of VID-20240322-WA0082.mp4',
//       labels: [Object],
//       explicitlyTrashed: false,
//       createdDate: '2024-04-30T08:23:55.979Z',
//       modifiedDate: '2024-04-30T08:23:55.979Z',
//       markedViewedByMeDate: '1970-01-01T00:00:00.000Z',
//       quotaBytesUsed: '2024527',
//       version: '8',
//       originalFilename: 'Copy of VID-20240322-WA0082.mp4',
//       capabilities: [Object],
//       videoMediaMetadata: [Object]
//     },

const Photogallery: React.FC<GalleryProps> = ({ resources }) => {
    return (
        <div>
            <div className="photogallery-container">
                {resources.map((res, index) => (
                    <div className="photogallery-item" key={index}>
                        {res.type === 'image' && (
                            <img
                                src={`https://drive.google.com/thumbnail?id=${res.id}`}
                                alt={`Pic ${index + 1}`}
                                loading="lazy"
                            />
                        )}
                        {res.type === 'video' && (
                            <></>
                            // <video
                            //     autoPlay={true}
                            //     controls={false}
                            //     muted={true}
                            //     itemType={res.mimetype}
                            //     typeof={res.mimetype}
                            //     src={`https://www.youtube.com/watch?v=ddTV12hErTc&ab_channel=MarquesBrownlee`}
                            //     // type={res.mimetype}
                            // ></video>
                            // <video controls={true} autoPlay>
                            //     <source
                            //         src="https://www.youtube.com/watch?v=ddTV12hErTc&ab_channel=MarquesBrownlee"
                            //         type="video/mp4"
                            //     />
                            // </video>
                            // <iframe
                            //     title="hello"
                            //     src="https://drive.google.com/file/d/1Tzp3V0U4qUp83Nevdka_XA_Afi6kzrh9/preview"
                            //     allow="autoplay"
                            // ></iframe>
                        )}
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

        const allowedTypes = ['image'];

        const resources = data.items
            .filter((x: any) => allowedTypes.includes(x.mimeType.split('/')[0]))
            .map((item: any) => ({
                id: item.id,
                type: item.mimeType.split('/')[0],
                mimetype: item.mimeType,
                webContentLink: item.webContentLink
            }));
        // .slice(0, 1);

        return {
            props: {
                resources
            }
            // revalidate: process.env.REVALIDATE ? parseInt(process.env.REVALIDATE) : 10
        };
    } catch (error) {
        console.error('Error fetching images:', error);
        return {
            props: {
                resources: []
            }
        };
    }
};

export default Photogallery;

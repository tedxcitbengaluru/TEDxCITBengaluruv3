import React from 'react';
import { staticSupabaseClient } from '@/utils/staticSupabaseClient';
import { useQuery } from '@tanstack/react-query';
import { GetFileBaseUrl } from '@/utils/storage/getFileBaseUrl';
import Image from 'next/image';
import { appConstants } from '@/utils/appConstants';

interface GalleryProps {
    resources: { id: string; type: 'image' | 'video'; mimetype: string; webContentLink: string }[];
}

const PhotoGallery: React.FC<GalleryProps> = ({}) => {
    const query = useQuery({
        queryKey: ['gallery'],
        queryFn: async () => {
            return await staticSupabaseClient
                .from('Media')
                .select('*')
                .eq('display', true)
                .eq('bucketName', appConstants.NEXT_PUBLIC_SUPABASE_BUCKET_NAME)
                .limit(25);
        },
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 5000
    });

    return (
        <div className="absolute top-0 left-0 h-auto w-screen bg-[url('/AetherBG.png')] bg-repeat-y">
            <div className="flex h-[10vh] items-center justify-center px-4 py-2 sm:h-[12vh] sm:px-16 sm:py-4">
                <div className="xs:h-[70%] h-[50%] w-auto sm:h-full sm:w-auto">
                    <Image
                        src="/logo/whitenobg.png"
                        width={1346}
                        height={185}
                        // fill
                        className="h-full w-full"
                        alt="Logo"
                    />
                </div>
            </div>
            {/* <div className="w-[300px]">
                <UploadButton multiple={true} />
            </div> */}
            <div className=" photogallery-container">
                {query.data?.data?.map((res, index) => (
                    <div className="photogallery-item" key={index}>
                        {res.type === 'IMAGE' && (
                            <Image
                                src={GetFileBaseUrl(res.bucketName, res.path)}
                                alt={`Pic ${index + 1}`}
                                width={res.metadata.dimensions.width}
                                height={res.metadata.dimensions.height}
                                loading="lazy"
                            />
                        )}
                        {res.type === 'VIDEO' && (
                            // <></>
                            <video
                                loop={true}
                                controls={false}
                                muted={true}
                                autoPlay={true}
                                src={GetFileBaseUrl(res.bucketName, res.path)}
                                // type={res.mimetype}
                            ></video>
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

export default PhotoGallery;



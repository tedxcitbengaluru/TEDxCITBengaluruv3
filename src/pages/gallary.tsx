import React from 'react';
import Image from 'next/image';

interface GalleryProps {
  images: any[]; 
}

const GalleryPage: React.FC<GalleryProps> = ({ images }: GalleryProps) => {
  return (
    <div>
      <h1>Gallery</h1>
      <div>
        {images.map((image: any) => (
          <Image
            key={image.id}
            src={image.thumbnailLink}
            alt={image.name}
            width={300} 
            height={200}
            priority
          />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { google } = require('googleapis');
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL!,
        private_key: privateKey ? privateKey.replace(/\\n/g, '\n') : undefined,
      },
    });

    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType='image/jpeg'`,
      fields: 'files(id, name, thumbnailLink)',
      orderBy: 'createdTime desc',
      pageSize: 20,
    });

    const files = response.data.files || [];
    console.log(files);
    return {
      props: {
        images: files,
      },
    };
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
    return {
      props: {
        images: [],
      },
    };
  }
}

export default GalleryPage;

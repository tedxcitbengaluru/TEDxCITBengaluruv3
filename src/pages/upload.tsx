import React from 'react';
import { UploadButton } from '@/components/uploadButton';

const UploadPhoto = () => {
    return (
        <div className="upload-photo-container">
            <div className="flex justify-center items-center h-screen">
                <div className="w-[300px]">
                    <UploadButton className="upload-button" multiple={true} />
                </div>
            </div>
        </div>
    );
};

export default UploadPhoto;

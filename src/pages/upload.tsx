import React from 'react';
import { UploadButton } from '@/components/uploadButton';

const UploadPhoto = () => {
    return (
        <div className="w-[300px]">
            <UploadButton multiple={true} />
        </div>
    );
};

export default UploadPhoto;

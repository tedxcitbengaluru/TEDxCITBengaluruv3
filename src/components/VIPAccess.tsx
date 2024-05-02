
import React, { useState, useEffect } from 'react';
import { staticSupabaseClient } from '@/utils/staticSupabaseClient';
import { GetFileBaseUrl } from '@/utils/storage/getFileBaseUrl';
import Image from 'next/image';

const VIPAccess: React.FC = () => {
    const [mediaData, setMediaData] = useState<any[]>([]);

    const fetchMediaData = async () => {
        try {
            const { data, error } = await staticSupabaseClient
                .from('Media')
                .select('*')
                .order('id', { ascending: true });
            if (error) {
                throw new Error('Error fetching media data: ' + error.message);
            }
            setMediaData(data ?? []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMediaData();
    }, []);

    const handleInputChange = (index: number, fieldName: string, value: any) => {
        const updatedData = [...mediaData];
        updatedData[index][fieldName] = value;
        setMediaData(updatedData);
    };

    const handleSaveChanges = async () => {
        try {
            // Sort the data based on ID before saving
            const sortedData = [...mediaData].sort((a, b) => a.id - b.id);
            await Promise.all(
                sortedData.map(async (media) => {
                    await staticSupabaseClient.from('Media').update(media).eq('id', media.id);
                })
            );
            console.log('Changes saved successfully');
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Media Data Management</h1>
            <table className="media-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Created At</th>
                        <th>Display</th>
                        <th>Path</th>
                        <th>Type</th>
                        <th>Bucket Name</th>
                        <th>Media Preview</th>
                    </tr>
                </thead>
                <tbody>
                    {mediaData.map((media, index) => (
                        <tr key={index}>
                            <td>{media.id}</td>
                            <td>{media.created_at}</td>
                            <td>
                                <select
                                    value={media.display}
                                    onChange={(e) => handleInputChange(index, 'display', e.target.value)}
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </td>
                            <td>{media.path}</td>
                            <td>{media.type}</td>
                            <td>{media.bucketName}</td>
                            <td>
                                {media.type === 'image' && (
                                    <Image
                                        src={GetFileBaseUrl(media.bucketName, media.path)}
                                        alt={`Image ${index + 1}`}
                                        width={50}
                                        height={50}
                                    />
                                )}
                                {media.type === 'video' && (
                                    <video width="50" height="50" controls>
                                        <source src={GetFileBaseUrl(media.bucketName, media.path)} />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                {media.type !== 'image' && media.type !== 'video' && 'Unsupported media type'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
                <button className="save-button" onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default VIPAccess;

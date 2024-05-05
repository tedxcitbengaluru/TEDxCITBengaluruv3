import React, { useState, useEffect } from 'react';
import { staticSupabaseClient } from '@/utils/staticSupabaseClient';
import { GetFileBaseUrl } from '@/utils/storage/getFileBaseUrl';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const VIPAccess: React.FC = () => {
    const [mediaData, setMediaData] = useState<any[]>([]);
    const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const query = useQuery({
        queryKey: ['vip_access'],
        queryFn: async () => {
            return await staticSupabaseClient
                .from('Media')
                .select('*')
        },
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 5000
    });

    useEffect(() => {
        if (query.isSuccess) {
            const sortedData = [...query.data?.data ?? []].sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            setMediaData(sortedData);
        }
    }, [query.isSuccess, query.data]);

    const handleInputChange = (index: number, fieldName: string, value: any) => {
        const updatedData = [...mediaData];
        updatedData[index][fieldName] = value;
        setMediaData(updatedData);
    };

    const handleSaveChanges = async () => {
        try {
            await Promise.all(
                mediaData.map(async (media) => {
                    await staticSupabaseClient.from('Media').update(media).eq('id', media.id);
                })
            );
            toast.success(`Saved changes`);
        } catch (error) {
            toast.error(`Failed to save. try again later`);
        }
    };

    const handleDeleteConfirmation = (id: string) => {
        setSelectedMediaId(id);
        setShowConfirmation(true);
    };

    const handleDelete = async () => {
        try {
            await staticSupabaseClient.from('Media').delete().eq('id', selectedMediaId);
            setMediaData(mediaData.filter(media => media.id !== selectedMediaId));
            setShowConfirmation(false);
            toast.success(`Media with ID ${selectedMediaId} deleted successfully`);
        } catch (error) {
            toast.error(`Failed to delete media with ID ${selectedMediaId}`);
        }
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Media Data Management</h1>
            <div style={{ overflowY: 'scroll', maxHeight: '500px' }}>
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
                            <th>Delete</th>
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
                                    {media.type === 'IMAGE' && (
                                        <img
                                            src={GetFileBaseUrl(media.bucketName, media.path)}
                                            alt={`Pic ${index + 1}`}
                                            width={200}
                                            loading="lazy"
                                        />
                                    )}
                                    {media.type === 'VIDEO' && (
                                        <video
                                            loop={true}
                                            controls={false}
                                            muted={true}
                                            autoPlay={true}
                                            src={GetFileBaseUrl(media.bucketName, media.path)}
                                            width={200}
                                        ></video>
                                    )}
                                </td>
                                <td>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" onClick={() => handleDeleteConfirmation(media.id)}>Delete</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="alert-dialog-wrapper">
                                            <AlertDialogHeader className="alert-dialog-header">
                                                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogDescription className="alert-dialog-description">
                                                Are you sure you want to delete this media?
                                            </AlertDialogDescription>
                                            <AlertDialogFooter className="alert-dialog-footer">
                                                <AlertDialogCancel className="alert-dialog-cancel" onClick={handleCloseConfirmation}>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className="alert-dialog-action" onClick={handleDelete}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
                <button className="save-button" onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default VIPAccess;

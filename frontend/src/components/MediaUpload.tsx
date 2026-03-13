import React, { useRef, useState } from 'react';
import axios from 'axios';

interface MediaUploadProps {
  label: string;
  accept: string;
  onUpload: (url: string) => void;
  type: 'image' | 'video';
}

const MediaUpload: React.FC<MediaUploadProps> = ({ label, accept, onUpload, type }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    setPreview(null);
    try {
      // Preview
      setPreview(URL.createObjectURL(file));
      // Upload
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/media/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUpload(res.data.url);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '1em' }}>
      <label style={{ fontWeight: 'bold' }}>{label}</label><br />
      <input
        type="file"
        accept={accept}
        ref={inputRef}
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <span style={{ marginLeft: 8 }}>Uploading...</span>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {preview && type === 'image' && (
        <img src={preview} alt="Preview" style={{ width: 120, marginTop: 8, borderRadius: 8 }} />
      )}
      {preview && type === 'video' && (
        <video src={preview} controls style={{ width: 180, marginTop: 8, borderRadius: 8 }} />
      )}
    </div>
  );
};

export default MediaUpload;

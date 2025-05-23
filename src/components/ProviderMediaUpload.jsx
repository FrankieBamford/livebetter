"use client";
// components/ProviderMediaUpload.jsx
import React, { useState, useEffect } from 'react';
import { Upload, X, Play, ImageIcon, Loader2 } from 'lucide-react';
import MediaUploader from '../lib/MediaUploader';

const ProviderMediaUpload = () => {
  const [providerId, setProviderId] = useState('1');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [uploader] = useState(new MediaUploader());

  // Load existing media when provider ID changes
  useEffect(() => {
    if (providerId) {
      loadProviderMedia();
    }
  }, [providerId]);

  const loadProviderMedia = async () => {
    try {
      const result = await uploader.getProviderMedia(providerId);
      if (result.success) {
        setPhotos(result.data.photos || []);
        setVideos(result.data.videos || []);
      }
    } catch (error) {
      console.error('Error loading provider media:', error);
    }
  };

  const handleFileUpload = async (files, mediaType) => {
    if (!files || files.length === 0) return;
    if (!providerId) {
      alert('Please enter a Provider ID first');
      return;
    }

    setUploading(true);
    setUploadProgress(`Uploading ${files.length} ${mediaType}...`);

    try {
      const result = await uploader.uploadProviderMedia(
        providerId, 
        Array.from(files), 
        mediaType
      );

      if (result.success) {
        // Reload media to get updated data
        await loadProviderMedia();
        setUploadProgress(`Successfully uploaded ${result.uploadedCount} ${mediaType}!`);
        setTimeout(() => setUploadProgress(''), 3000);
      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress(`Upload failed: ${error.message}`);
      setTimeout(() => setUploadProgress(''), 5000);
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = async (index, mediaType) => {
    try {
      let updatedMedia = {};
      
      if (mediaType === 'photos') {
        const newPhotos = photos.filter((_, i) => i !== index);
        setPhotos(newPhotos);
        updatedMedia.photos = newPhotos;
        updatedMedia.videos = videos;
      } else {
        const newVideos = videos.filter((_, i) => i !== index);
        setVideos(newVideos);
        updatedMedia.videos = newVideos;
        updatedMedia.photos = photos;
      }

      await uploader.updateProviderMedia(providerId, updatedMedia);
    } catch (error) {
      console.error('Remove error:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Provider Media Upload</h1>
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-medium text-gray-700">Provider ID:</label>
          <input
            type="text"
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter provider ID"
          />
        </div>
        
        {uploadProgress && (
          <div className={`p-3 rounded-md mb-4 ${uploadProgress.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {uploading && <Loader2 className="inline w-4 h-4 mr-2 animate-spin" />}
            {uploadProgress}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Photos Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Photos ({photos.length})
            </h2>
            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Photos
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, 'photos')}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.fileName}
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={() => removeMedia(index, 'photos')}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs">
                  <p className="truncate">{photo.fileName}</p>
                </div>
              </div>
            ))}
          </div>

          {photos.length === 0 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No photos uploaded yet</p>
            </div>
          )}
        </div>

        {/* Videos Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Videos ({videos.length})
            </h2>
            <label className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Videos
              <input
                type="file"
                multiple
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, 'videos')}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="relative group bg-gray-100 rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-40 object-cover"
                  preload="metadata"
                >
                  <source src={video.url} />
                  Your browser does not support the video tag.
                </video>
                <button
                  onClick={() => removeMedia(index, 'videos')}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="p-3">
                  <p className="font-medium text-gray-800 truncate">{video.fileName}</p>
                  <p className="text-xs text-gray-500">
                    Uploaded: {new Date(video.uploadedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {videos.length === 0 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
              <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No videos uploaded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderMediaUpload;

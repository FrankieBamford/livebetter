// lib/MediaUploader.js
import { supabase } from './supabaseClient.js'

class MediaUploader {
  constructor() {
    this.bucketName = 'provider-media' // Create this bucket in your Supabase dashboard
  }

  // Upload file to Supabase Storage
  async uploadFile(file, folder = 'general') {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(fileName)

      return {
        success: true,
        fileName: fileName,
        publicUrl: urlData.publicUrl,
        path: data.path
      }
    } catch (error) {
      console.error('Upload error:', error)
      return { success: false, error: error.message }
    }
  }

  // Add or update provider with media
  async updateProviderMedia(providerId, mediaData) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .update({
          videos: mediaData.videos || null,
          photos: mediaData.photos || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', providerId)
        .select()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      console.error('Database update error:', error)
      return { success: false, error: error.message }
    }
  }

  // Get provider's current media
  async getProviderMedia(providerId) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('id, videos, photos')
        .eq('id', providerId)
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      console.error('Fetch error:', error)
      return { success: false, error: error.message }
    }
  }

  // Upload multiple files and update provider
  async uploadProviderMedia(providerId, files, mediaType) {
    try {
      // Get current provider media
      const currentMedia = await this.getProviderMedia(providerId)
      if (!currentMedia.success) throw new Error(currentMedia.error)

      const uploadPromises = files.map(file => 
        this.uploadFile(file, `${mediaType}/${providerId}`)
      )

      const uploadResults = await Promise.all(uploadPromises)
      
      // Filter successful uploads
      const successfulUploads = uploadResults
        .filter(result => result.success)
        .map(result => ({
          url: result.publicUrl,
          fileName: result.fileName,
          uploadedAt: new Date().toISOString()
        }))

      if (successfulUploads.length === 0) {
        throw new Error('No files uploaded successfully')
      }

      // Prepare media data for database
      const existingData = currentMedia.data
      let updatedMediaData = {}

      if (mediaType === 'videos') {
        const existingVideos = existingData.videos || []
        updatedMediaData.videos = [...existingVideos, ...successfulUploads]
      } else if (mediaType === 'photos') {
        const existingPhotos = existingData.photos || []
        updatedMediaData.photos = [...existingPhotos, ...successfulUploads]
      }

      // Update provider record
      const updateResult = await this.updateProviderMedia(providerId, updatedMediaData)
      
      return {
        success: true,
        uploadedCount: successfulUploads.length,
        totalFiles: files.length,
        uploadedFiles: successfulUploads,
        providerData: updateResult.data
      }

    } catch (error) {
      console.error('Upload process error:', error)
      return { success: false, error: error.message }
    }
  }
}

export default MediaUploader

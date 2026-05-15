const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined

// Returns a Cloudinary image URL with automatic format and quality.
// publicId: the path in your Media Library, e.g. "team-mas/sede-buenosaires"
// transforms: Cloudinary transformation string (override default if needed)
export function cloudinaryImage(publicId: string, transforms = 'f_auto,q_auto'): string {
  if (!CLOUD) {
    console.warn('[cloudinary] VITE_CLOUDINARY_CLOUD_NAME not set — returning empty string')
    return ''
  }
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${publicId}`
}

// Returns a Cloudinary video URL with automatic format and quality.
export function cloudinaryVideo(publicId: string, transforms = 'f_auto,q_auto'): string {
  if (!CLOUD) {
    console.warn('[cloudinary] VITE_CLOUDINARY_CLOUD_NAME not set — returning empty string')
    return ''
  }
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${transforms}/${publicId}`
}

// Preset transforms for this project
export const transforms = {
  gymCard: 'w_640,h_360,c_fill,f_auto,q_auto',   // 16:9 card images
  heroBg:  'w_1920,c_limit,f_auto,q_auto',        // full-width hero background
  logo:    'w_200,f_auto,q_auto',
  video:   'f_auto,q_auto',
}

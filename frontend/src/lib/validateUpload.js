import UploadError from './UploadError';

export default async function validateUpload(file) {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!validTypes.includes(file.type))
    throw new UploadError('Invalid file type', 'type');

  if (file.size > 1050000) throw new UploadError('Image is too large', 'size');
}

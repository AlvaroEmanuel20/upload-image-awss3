import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import UploadError from '../lib/UploadError';
import validateUpload from '../lib/validateUpload';

export default function useUpload() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const file = event.target.files[0];
      await validateUpload(file);

      const formData = new FormData();
      formData.append('image', file);

      await axios.post(import.meta.env.VITE_API_URL, formData);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof UploadError) {
        setError(error.message);
      }

      if (error instanceof AxiosError) {
        setError(error.response.data.message);
      }

      setIsLoading(false);
      setTimeout(() => {
        setError('');
      }, 5000);
    }

    event.target.value = '';
  };

  return { handleUpload, isLoading, isSuccess, error };
}

import { IconExclamationCircle, IconUpload, IconX } from '@tabler/icons-react';
import './styles/app.css';
import useUpload from './hooks/useUpload';
import { useEffect, useState } from 'react';
import useQuery from './hooks/useQuery';

export default function App() {
  const { handleUpload, isLoading, isSuccess, error } = useUpload();
  const { data, isLoading: isLoadingData, error: errorData } = useQuery();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (() => {
      if (error) setIsOpen(true);
    })();
  }, [error]);

  return (
    <div className="app">
      <section className="card">
        <div className="profile"></div>

        {!isLoading ? (
          <label htmlFor="file-input" className="upload-btn">
            <IconUpload size="1.1rem" />
            <span>Upload</span>
          </label>
        ) : (
          <label htmlFor="file-input" className="upload-btn">
            <div className="loader"></div>
          </label>
        )}

        <input
          disabled={isLoading}
          type="file"
          onChange={handleUpload}
          hidden
          id="file-input"
        />
      </section>

      <section className="images">
        <h1>Your Feed</h1>

        {isLoadingData && <div className="loader"></div>}

        {!isLoadingData && data.length === 0 && <p>No images found</p>}

        {!isLoadingData && !errorData && (
          <div className="images-grid">
            {data.map((image, index) => (
              <article key={index} className="image">
                <img src={image} alt="Image" />
              </article>
            ))}
          </div>
        )}
      </section>

      {isOpen && error && (
        <div className="error-card">
          <div className="error-content">
            <IconExclamationCircle size="1.5rem" />
            <p>{error}</p>
          </div>

          <button onClick={() => setIsOpen(false)} className="close">
            <IconX size="1rem" />
          </button>
        </div>
      )}

      {errorData && (
        <div className="error-card">
          <div className="error-content">
            <IconExclamationCircle size="1.5rem" />
            <p>{errorData}</p>
          </div>

          <button onClick={() => setIsOpen(false)} className="close">
            <IconX size="1rem" />
          </button>
        </div>
      )}

      {isSuccess && (
        <div className="error-card success-card">
          <div className="error-content">
            <IconExclamationCircle size="1.5rem" />
            <p>Succesful upload</p>
          </div>

          <button onClick={() => setIsOpen(false)} className="close">
            <IconX size="1rem" />
          </button>
        </div>
      )}
    </div>
  );
}

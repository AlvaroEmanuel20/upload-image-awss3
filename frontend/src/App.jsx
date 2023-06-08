import { IconUpload } from '@tabler/icons-react';
import './styles/app.css';
import useUpload from './hooks/useUpload';
import { useEffect, useState } from 'react';
import useQuery from './hooks/useQuery';
import Toast from './components/Toast';
import Loader from './components/Loader';

export default function App() {
  const {
    handleUpload,
    isLoading,
    isSuccess,
    error: errorUpload,
  } = useUpload(() => setRefetch((prev) => prev + 1));
  const [refetch, setRefetch] = useState(0);
  const {
    data,
    isLoading: isLoadingData,
    error: errorData,
  } = useQuery(refetch);
  const [isOpenToastError, setIsOpenToastError] = useState(false);
  const [isOpenToastSuccess, setIsOpenToastSuccess] = useState(false);

  useEffect(() => {
    (() => {
      if (errorUpload) setIsOpenToastError(true);
    })();
  }, [errorUpload]);

  useEffect(() => {
    (() => {
      if (isSuccess) setIsOpenToastSuccess(true);
    })();
  }, [isSuccess]);

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
            <Loader />
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

        {isLoadingData && <Loader />}

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

      {isOpenToastError && errorUpload && (
        <Toast
          text={errorUpload}
          isError={true}
          close={() => setIsOpenToastError(false)}
        />
      )}

      {errorData && (
        <Toast
          text={errorData}
          isError={true}
          close={() => setIsOpenToastError(false)}
        />
      )}

      {isSuccess && isOpenToastSuccess && (
        <Toast
          text="Succesful upload"
          isError={false}
          close={() => setIsOpenToastSuccess(false)}
        />
      )}
    </div>
  );
}

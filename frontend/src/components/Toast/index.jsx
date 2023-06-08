import { IconExclamationCircle, IconX } from '@tabler/icons-react';
import './toast.css';

export default function Toast({ close, text, isError }) {
  return (
    <>
      <div className={`toast ${isError ? 'toast-error' : 'toast-success'}`}>
        <div className="toast-content">
          <IconExclamationCircle size="1.5rem" />
          <p>{text}</p>
        </div>

        <button onClick={close} className="toast-close">
          <IconX size="1rem" />
        </button>
      </div>
    </>
  );
}

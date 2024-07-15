import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AmigoFotoComponent from './amigoFoto';

const CapMessage = forwardRef(({ message, id_user }, ref) => {
  const notify = () => {
    toast(<CustomToast />);
  };

  useImperativeHandle(ref, () => ({
    triggerToast: notify,
  }));

  const CustomToast = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AmigoFotoComponent id={id_user} toast={true} />
      <div>{message}</div>
    </div>
  );

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
});

export default CapMessage;

// src/hooks/useToastNotification.js - VERSIÓN ADAPTADA PARA CUSTOM TOAST
import { useCallback, useState } from 'react';

export const useToastNotification = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    title: '',
    message: '',
    type: 'success' // 'success', 'error', 'info'
  });

  const showToast = useCallback((title = '', message = '', type = 'success') => {
    setToastConfig({
      title,
      message,
      type
    });
    setToastVisible(true);
    
    // Ocultar automáticamente después de 10 segundos
    setTimeout(() => {
      setToastVisible(false);
    }, 10000);
  }, []);

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  return {
    toastVisible,
    toastConfig,
    showToast,
    hideToast
  };
};
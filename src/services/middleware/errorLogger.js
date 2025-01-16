// src/middleware/errorLogger.js
import { isRejectedWithValue } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message'; // Use react
import { getObject } from '../tokenStorage';

let lastErrorTime = 0;
const THROTTLE_TIME = 3000;

export const rtkQueryErrorLogger = () => (next) => (action) => {
  const now = Date.now();

  // Handle 401 errors
  if (action?.payload?.status === 401) {
    Toast.show({
      type: 'error',
      text1: 'Authentication Error',
      text2: action?.payload?.data?.error || 'Unauthorized access.',
    });
    return;
  } else if (action?.payload?.status === 401) {
    // Redirect to logout
    // Replace with React Navigation redirection or other RN-specific logic
    console.warn('Redirecting to logout...');
    return;
  }

  // Handle 404 errors
  if (action?.payload?.status === 404) {
    Toast.show({
      type: 'error',
      text1: 'Not Found',
      text2: action?.payload?.data?.error || 'Resource not found.',
    });
    return;
  }

  // Handle 504 and fetch errors with throttling
  if (
    action?.payload?.status === 504 ||
    action?.payload?.status === 'FETCH_ERROR'
  ) {
    const user = getObject('user');
    if (
      user &&
      action?.meta?.baseQueryMeta?.request?.url?.includes(
        'api/checks/background'
      ) &&
      now - lastErrorTime > THROTTLE_TIME
    ) {
      Toast.show({
        type: 'error',
        text1: 'Request Failed',
        text2:
          'Failed to process your request. Please contact IT Support. Error code: 504',
      });
      lastErrorTime = now;
    }
    return;
  }

  // Handle rejected actions
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!');
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2:
        action?.payload?.data?.error ||
        action?.payload?.data?.message ||
        'Something went wrong!',
    });
    lastErrorTime = now;
  }

  return next(action);
};

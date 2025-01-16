import AsyncStorage from '@react-native-async-storage/async-storage';

// Save token
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (e) {
    console.error('Error saving token:', e);
  }
};

// Clear token
export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (e) {
    console.error('Error clearing token:', e);
  }
};

export const removeItem = async (item) => {
  try {
    await AsyncStorage.removeItem(item);
  } catch (e) {
    console.error('Error clearing token:', e);
  }
};

// Get token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (e) {
    console.error('Error getting token:', e);
    return null;
  }
};

export const getObject = async (item) => {
  try {
    return await AsyncStorage.getItem(item);
  } catch (e) {
    console.error(`Error getting ${item}:`, e);
    return null;
  }
};

export const setObject = async (item) => {
  try {
    await AsyncStorage.setItem(item);
  } catch (e) {
    console.error(`Error saving ${item}:`, e);
  }
};

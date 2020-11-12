const createFormBody = (formData) => Object.keys(formData).map((key) => {
  const encodedKey = encodeURIComponent(key);
  const encodedValue = encodeURIComponent(formData[key]);

  return `${encodedKey}=${encodedValue}`;
}).join('&');

export default createFormBody;

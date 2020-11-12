const createFormBody = (formData) => {
  const formBody = [];

  for (const key in formData) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(formData[key]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }

  return formBody;
};

module.exports = {
  createFormBody,
};

export const updateAllFields = (formData) => {
  return {
    type: "form/updateAllFields",
    payload: formData,
  };
};

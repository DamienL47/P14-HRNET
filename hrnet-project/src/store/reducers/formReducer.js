import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    firstName: null,
    lastName: null,
    birthday: null,
    startDate: null,
    address: {
      street: null,
      city: null,
      state: null,
      zip: null,
    },
    department: "",
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      if (field && typeof field === "string" && field.includes(".")) {
        const [parent, child] = field.split(".");
        if (state[parent]) {
          state[parent][child] = value;
        }
      } else if (field) {
        state[field] = value;
      }
    },
    updateAllFields: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateField, updateAllFields } = formSlice.actions;

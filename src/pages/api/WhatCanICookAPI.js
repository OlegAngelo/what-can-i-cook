import axios from "axios";

const localApi = "http://localhost:4000"

const WhatCanICookAPI = {
  getRecipeList: async (ingredients) => {
    if (ingredients) {
      return axios
      .get(`${localApi}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          ingredients: ingredients,
        }
      })
      .then((response) => {
        // Check for a message indicating no recipes found
        if (response.data.message) {
          return { message: response.data.message }; // Return the message if no recipes found
        }

        // If recipes are found, return the data
        return response.data; 
      })
      .catch((error) => {
        // Handle errors from the backend
        if (error.response && process.env.NODE_ENV !== 'production') {
          return { error: error.response.data.error };
        } else {
          return { error: 'Something went wrong. Please check your connection or try again later.' };
        }
      });
    }
  },
}

export default WhatCanICookAPI;

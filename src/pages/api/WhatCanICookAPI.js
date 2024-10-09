import axios from "axios";

const localApi = "http://localhost:4000"

const WhatCanICookAPI = {
  getRecipeList: async (ingredients) => {
    if (ingredients) {
      const data = await axios.get(
        `${localApi}/`, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            "ingredients": ingredients,
          }
        }
      )
      .then((data) => { return data })
      .catch((error) => 
        { console.error('error: ', error) }
      );

      return data;
    }
  },
}

export default WhatCanICookAPI;

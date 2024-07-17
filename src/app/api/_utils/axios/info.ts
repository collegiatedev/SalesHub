import axios from "axios";

export const createInfo = async (name: string, pageId: string) => {
  try {
    const response = await axios.post(
      "https://king-prawn-app-onivj.ondigitalocean.app/info/create",
      {
        name,
        pageId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};

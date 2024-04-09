import axios from "axios";

const baseURL = "https://blog-api-o3b9.onrender.com";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (formData) => {
  console.log(formData);
  try {
    const response = await axios.post(
      `${baseURL}/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(response?.data?.data));
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postBlog = async (formData) => {
  console.log("formData");
  try {
    const response = await axios.post(
      `${baseURL}/post`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postGet = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/allPostGet`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const singlePostGet = async (id) => {
  console.log(id);
  try {
    const response = await axios.get(
      `${baseURL}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postDelete = async (id) => {
  try {
    const response = await axios.delete(
      `${baseURL}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postUpdate = async (formData) => {
  try {
    const response = await axios.put(
      `${baseURL}/${formData.id}`,
      {
        ...formData,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userProfileGet = async (id) => {
  //console.log(id);
  try {
    const response = await axios.get(
      `${baseURL}/user/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const profileUpdate = async (formData) => {
  try {
    const response = await axios.put(
      `${baseURL}/user/update/${formData.get("id")}`, // Accessing id from formData
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const updatedUserData = response?.data;
    console.log(updatedUserData);
    if (updatedUserData) {
      localStorage.setItem("user", JSON.stringify(updatedUserData?.data));
    }

    return updatedUserData;
  } catch (error) {
    throw error;
  }
};

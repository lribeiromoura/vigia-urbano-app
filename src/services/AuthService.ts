import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://192.168.68.102:4001/" });

const createUserService = async (data: FormDataProps) => {
  try {
    const response = await axiosInstance.post(`/users`, {
      name: data.name,
      CPF: data.CPF,
      email: data.email,
      password: data.password,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const checkUserExistsService = async (data: FormDataProps) => {
  try {
    const response = await axiosInstance.get(`/users/${data.CPF}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { createUserService, checkUserExistsService };

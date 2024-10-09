import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log("Base URL:", baseUrl);

export class AuthRepository {
  async loginApi(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      });
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to login");
    }
  }

  async getUserList(token: string): Promise<any> {
    try {
      const response = await axios.get(`${baseUrl}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ getUserList ~ response:", response.data);
      return response.data;
    } catch (error: any) {
      throw new Error("Failed to fetch user list");
    }
  }
}
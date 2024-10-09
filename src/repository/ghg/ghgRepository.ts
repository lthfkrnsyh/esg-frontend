import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export class GhgRepository {
   async getUserList(token: string): Promise<any> {
    try {
      const response = await axios.get(`${baseUrl}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async getRoles(token: string): Promise<any> {
    try {
      const response = await axios.get(`${baseUrl}/auth/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async getListGhgAll(token: string): Promise<any> {
    try {
      const response = await axios.get(
        `${baseUrl}/ghg/ghg`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async insertGhg(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post(
        `${baseUrl}/ghg/ghg`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
    }
  }

  async updateGhg(
    token: string,
    id: string,
    data: FormData
  ): Promise<any> {
    try {
      const response = await axios.put(
        `${baseUrl}/ghg/ghg/` + id,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
    }
  }

  async deleteGhg(token: string, id: string): Promise<any> {
    try {
      const response = await axios.delete(
        `${baseUrl}/ghg/ghg/` + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
    }
  }
}
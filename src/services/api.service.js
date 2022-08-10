import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE,
    });

    this.api.interceptors.request.use((config) => {
      // Verifica se já temos as informações do usuário logado no localStorage
      const storedUser = localStorage.getItem("loggedInUser");
    
      const loggedInUser = JSON.parse(storedUser || '""');
    
      if (loggedInUser.token) {
        config.headers = {
          Authorization: `Bearer ${loggedInUser.token}`,
        };
      }
    
      return config;
    });
  }

  async signUp(user) {
    return await this.api.post("/signup", user);
  }

  async login(user) {
    return await this.api.post("/login", user);
  }

  async getRooms() {
    const res = await this.api.get('/rooms')
    return res.data
  }

  async deleteRoom(id) {
    const res = await this.api.delete(`/rooms/${id}`);
    return res.data
  }

  async createRoom(room) {
    const res = await this.api.post('/rooms', room)
    return res.data
  }

  async getRoom(id) {
    const res = await this.api.get(`/rooms/${id}`)
    return res.data
  }

  async createReview(id, review) {
    const res = await this.api.post(`/rooms/${id}/reviews`, review)
    return res.data
  }

  async uploadFile(fileData) {
    const res = await this.api.post('/rooms/upload', fileData)
    return res.data
  }
}

export default new ApiService();

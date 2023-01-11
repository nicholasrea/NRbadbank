//TODO, Extract, axios out into service

import axios from 'axios';

class AuthService {
  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  async login(data) {
    try {
      const response = await this.client.post('/login', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signup(data) {
    try {
      const response = await this.client.post('/signup', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deposit(data) {
    try {
      const response = await this.client.post('/deposit', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async withdraw(data) {
    try {
      const response = await this.client.post('/withdraw', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
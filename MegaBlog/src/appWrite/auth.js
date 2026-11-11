import conf from "../config/config.js";
import { Account, Client, ID } from "appwrite";

const hasConfig = Boolean(conf.appwriteUrl && conf.appwriteProjectId);

export class AuthService {
  client = new Client();
  account;

  constructor() {
    if (hasConfig) {
      this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
      this.account = new Account(this.client);
    }
  }

  async createAccount({ email, password, name }) {
    if (!this.account) throw new Error("Appwrite is not configured. Check your .env file.");
    const user = await this.account.create(ID.unique(), email, password, name);
    if (user) await this.login({ email, password });
    return user;
  }

  async login({ email, password }) {
    if (!this.account) throw new Error("Appwrite is not configured. Check your .env file.");
    return this.account.createEmailPasswordSession(email, password);
  }

  async getCurrentUser() {
    if (!this.account) return null;
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }

  async logout() {
    if (!this.account) return false;
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
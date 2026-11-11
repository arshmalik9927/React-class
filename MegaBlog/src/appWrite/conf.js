import conf from "../config/config.js";
import { Client, Databases, ID, Query, Storage } from "appwrite";

const hasConfig = Boolean(
  conf.appwriteUrl &&
  conf.appwriteProjectId &&
  conf.appwriteDataBaseId &&
  conf.appwriteCollectionId &&
  conf.appwriteBucketId
);

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    if (hasConfig) {
      this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
      this.databases = new Databases(this.client);
      this.bucket = new Storage(this.client);
    }
  }

  ensureConfigured() {
    if (!hasConfig) {
      throw new Error("Appwrite is not configured. Copy .env.example to .env and add your Appwrite IDs.");
    }
  }

  async createPost({ title, content, featuredImage, status = "active", userId }) {
    try {
      this.ensureConfigured();
      return await this.databases.createDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.error("Create post error:", error);
      return false;
    }
  }

  async updatePost(documentId, { title, content, featuredImage, status }) {
    try {
      this.ensureConfigured();
      return await this.databases.updateDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        documentId,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.error("Update post error:", error);
      return false;
    }
  }

  async deletePost(documentId) {
    try {
      this.ensureConfigured();
      await this.databases.deleteDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        documentId
      );
      return true;
    } catch (error) {
      console.error("Delete post error:", error);
      return false;
    }
  }

  async getPost(documentId) {
    try {
      this.ensureConfigured();
      return await this.databases.getDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.error("Get post error:", error);
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      this.ensureConfigured();
      return await this.databases.listDocuments(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Get posts error:", error);
      return { documents: [] };
    }
  }

  async uploadFile(file) {
    try {
      this.ensureConfigured();
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error("Upload file error:", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      this.ensureConfigured();
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Delete file error:", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    this.ensureConfigured();
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
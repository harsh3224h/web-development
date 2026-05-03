import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    tablesDB;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, content, slug, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            });
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            });
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            });
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            throw error;
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            });
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal('status', ['active'])]) {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries,
            });
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file,
            });
        } catch (error) {
            console.error("Appwrite serive :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId,
            });
            return true;
        } catch (error) {
            console.error("Appwrite serive :: deleteFile :: error", error);
            throw error;
        }
    }

    async getFilePreview(fileId) {
        // this method required paid version
        try {
            return this.storage.getFilePreview({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            });
        } catch (error) {
            console.error("Appwrite serive :: getFilePreview :: error", error);
            throw error;
        }
    }

    async getFileView(fileId) {
        try {
            return this.storage.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            });
        } catch (error) {
            console.error("Appwrite serive :: getFileView :: error", error);
            throw error;
        }
    }
}

const service = new Service;

export default service;
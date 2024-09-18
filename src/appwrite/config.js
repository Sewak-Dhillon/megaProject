import conf from "../conf/conf";
import { Client, ID, Databases, Storage,Query } from "appwrite";


export class Service {
    client = new Client()
    databases
    bucket

    constructor()
    {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
        
    }

    async createPost ({title,slug,content,featuredImage,status,userId}){

        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("AppWrite :: createDatabase " + error);   
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("AppWrite :: updatePost" + error);   
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("AppWrite :: deletePost" + error);   
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("AppWrite :: getPost " + error);   
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


    // file upload/delete service

    async uploadFile (file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
            
        } catch (error) {
            console.log("AppWrite :: uploadFile" + error);
        }
    }

    async deleteFile (fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
            
        } catch (error) {
            console.log("AppWrite :: deleteFile" + error);
            return false
        }
    }

    getFilePreview (fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
            
        } catch (error) {
            console.log("AppWrite :: getFilePreview" + error);
        }
    }

    getFileDownload (fileId){
        try {
            return this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId,
            )
            
        } catch (error) {
            console.log("AppWrite :: getFilePreview" + error);
        }
    }
}

const service = new Service()

export default service 
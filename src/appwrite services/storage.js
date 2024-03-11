import {Client,Storage,Query,ID} from "appwrite"
import conf from  "../conf/conf"

export class StorageService{

    client= new Client()
    storage;
    constructor(){
        this.client.setEndpoint(conf.appwriteId).setProject(conf.projectId)
        this.storage= new Storage(this.client)
    }

    async uploadFile(file){
        try {
            
            return await this.storage.createFile(conf.bucketId,ID.unique(),file)

        } catch (error) {
            throw error
        }
    }
    async getFile(fileId){
        try {
            return await this.storage.getFile(conf.bucketId,fileId)
        } catch (error) {
            throw error
        }
    }
    async deleteFile(fileId){
        try {
             await this.storage.deleteFile(conf.bucketId,fileId)
             return true;
        } catch (error) {
            throw error
            return false
        }
    }
    async updateFile(fileId){
        try {
            return await this.storage.updateFile(conf.bucketId,fileId,)
        } catch (error) {
            throw error
        }
    }
    
 previewFile(fileId){
        try {
            return  this.storage.getFilePreview(conf.bucketId,fileId)
        } catch (error) {
            throw error
        }
    }
}
const storageService = new StorageService()
export default storageService
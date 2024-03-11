import {Client,Databases,Query,ID} from "appwrite"
import conf from  "../conf/conf"

export class DatabaseService{
    client = new Client
    databases;
    constructor(){
        this.client.setEndpoint(conf.appwriteId).setProject(conf.projectId)
        this.databases=new Databases(this.client)

    }

    async createPost({title,content,featuredImage,slug,status,userId}){
      try {
        return await this.databases.createDocument(conf.databaseId,conf.collectionId, slug,{
            title,
            content, 
            featuredImage,
             status,
             userId,
        })
      } catch (error) {
        throw error
      }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
          return await this.databases.updateDocument(conf.databaseId,conf.collectionId, slug,{
              title,
              content, 
              featuredImage,
               status,
          })
        } catch (error) {
          throw error
        }
      }
      async deletePost(slug){
        try {
           await this.databases.deleteDocument(conf.databaseId,conf.collectionId, slug)
            // after  we don't return documnet we return status
            return true;
        } catch (error) {
          throw error
          return false;
        }
      }
      async getPost(slug){
        try {
          return await this.databases.getDocument(conf.databaseId,conf.collectionId, slug)
        } catch (error) {
          throw error
          return false
        }
      }
      async getPosts(query=[Query.equal('status','active')]){
        try {
          return await this.databases.listDocuments(conf.databaseId,conf.collectionId,query )
        } catch (error) {
          throw error
        }
      }
}

const databaseServices= new DatabaseService()

export default databaseServices
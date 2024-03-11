import {Client,Account,ID} from "appwrite"
import conf from  "../conf/conf"

export class AuthService {
 client =new Client()
  account;

  constructor(){
    this.client.setEndpoint(conf.appwriteId).setProject(conf.projectId) 
    this.account= new Account(this.client)

  }


 async createUser({email,password,name}){
    try{
 const userAccount = await this.account.create(ID.unique(), email,password,name)
 if(userAccount){
    // revert to login
return this.loginUser({email,password})
 }else{
    return userAccount
 }

    }catch(error){
        throw error
    }
 }


 async loginUser({email,password}){
try {
    return await this.account.createEmailSession(email, password)
    
} catch (error) {
    throw error
    
} }

async logoutUser(){
    try {
        
        return await this.account.deleteSession('current')

    } catch (error) {
        throw error
    }
    
}
async getCurrentUser(){
    try {
        return await this.account.get()
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null
}


}

const authService = new AuthService()

    export default authService

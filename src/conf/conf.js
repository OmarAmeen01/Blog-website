const conf ={
    appwriteId:String(import.meta.env.VITE_APPWRITE_URL),
    databaseId:String(import.meta.env.VITE_DATABASE_ID),
    projectId:String(import.meta.env.VITE_PROJECT_ID),
    collectionId:String(import.meta.env.VITE_COLLECTION_ID),
    bucketId:String(import.meta.env.VITE_BUCKET_ID),
    tinymceKey:String(import.meta.env.VITE_TINYMCE_KEY)
}
export default conf
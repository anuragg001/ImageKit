
// see in nextjs there are edge function running over the server so multiople connection can be created and 
// to avoid that we will use global variable to store the connection and promise so that we can reuse it 
// also mongodb have three state 
// 1 connected. 2 NotConnected. 3 Promise on the way (connecting) so we have handled this accordingly 


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside");
}

 let cached =global.mongoose

 if(!cached){
   cached = global.mongoose = { conn: null, promise: null };

 }

 export async function connectToDatabase(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {};
        mongoose
        .connect(MONGODB_URI, opts)
        .then(()=>mongoose.connection)
    }

    try {
       cached.conn =  await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    return cached.conn;
 }
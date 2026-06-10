import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URL);
const db = client.db("hirejob");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
   user: {
       additionalFields: {
          role: {
              type: "string",
        
              defaultValue:"admin"
            } 
        }
    },
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID ,
      clientSecret: process.env.GITHUB_CLIENT_SECRET 
    }, 
  }, 
});
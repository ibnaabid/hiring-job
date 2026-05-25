import { betterAuth } from "better-auth";

const client = new MongoClient(process.env.MONGO_DB_URL);
const db = client.db("jobsitem");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
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
import express from "express";
import cors from "cors";
import fs from 'fs'; // 
import { config } from 'dotenv';
config();
import db from "./db/db.js";
import transaction from './routes/transaction.js'

const app = express();
const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())


//route

const routeFiles = fs.readdirSync('./routes');


routeFiles.forEach( async (route) => {
  if (route.endsWith('.js')) {
    const routePath = `./routes/${route}`;
    const routeModule = await import(routePath);
    console.log(`Loading route module from ${routePath}`);
    if (typeof routeModule.default === 'function') {
      app.use('/api/v1', routeModule.default);
    } else {
      console.error(`Module in ${routePath} does not export a default function.`);
    }
    
  }
})

// app.use('/api/v1', transaction)

const server = () => {
  if (db.connect) {
    console.log("DB connected!")
  } else console.log("DB not connected!")
  app.listen(PORT, ()=>{
    console.log('listening to port:', PORT)
  })
}
server()


//mapeo de objeto relacional usado para node.js y typescript  
// esto hace que se pueda interactuar con las bases de datos en postgresSQL
import "dotenv/config"  //para conectar la url de la BD del proyecto 
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../generated/prisma/client"

const connectionString = `${process.env.DATABASE_URL}`;

const adaptador = new PrismaPg({ connectionString: process.env.DATABASE_URL as string })
const prisma = new PrismaClient({ adapter: adaptador })

export { prisma };  //aqui exporto la conexion de prisma para usarla en los otros archivos
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../generated/prisma/client"

const connectionString = `${process.env.DATABASE_URL}`;

const adaptador = new PrismaPg({ connectionString: process.env.DATABASE_URL as string })
const prisma = new PrismaClient({ adapter: adaptador })

export { prisma };
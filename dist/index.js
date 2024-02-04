"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { PrismaClient } from '@prisma/client'
dotenv_1.default.config();
// const prisma = new PrismaClient();
//framework express
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use('/', (req, res) => {
    res.send("Hello World");
});
// app.use('/api/categorias',  async (req: Request, res: Response)=>{
//      try{
//           const result= await prisma.categorias.findMany();
//           res.statusCode(200).json(result);
//      }catch(e){
//           res.status(500).json(e)
//      }
// })
exports.default = app;

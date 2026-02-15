import { PrismaClient } from '../lib/generated/prisma'; // Use your custom path
const prisma = new PrismaClient();
export default prisma;

// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// async function registerUser(username, email, password){
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     try { 
//         const user = await prisma.user.create({
//             data: {
//                 username,
//                 email, 
//                 password: hashedPassword,
//             }
//         });
//         console.log('User registered:', user.id);

//     }catch (error){
//         console.error('Error registering user:', error);
//     }
// }
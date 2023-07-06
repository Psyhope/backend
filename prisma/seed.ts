import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
;
(async () => {
    prisma.$transaction([
        // create psyhope admin 
        // prisma.user.create({
        //     data: {
        //         id: "admin",
        //         fullname: "Admin Psyhope",
        //         namaRole: "ADMIN",
        //         organizationCode: "psyhope",
        //         username: "admin",
        //     }
        // })
    ])
})()
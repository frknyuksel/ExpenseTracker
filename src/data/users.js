import bcrypt from 'bcryptjs';

export const users = [

    {
        id: 1,
        firstName: "Martin",
        lastName: "Eden",
        email: "test@example.com",
        password: bcrypt.hashSync("123456", 10),
    }
];

export const jwtConfig = {
    secret: process.env.JWT_SECRET || "4dd4c907300af011",
    expiresIn: "1h",
};
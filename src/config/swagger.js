import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Book Management API", version: "1.0.0" },
        servers: [
            {
                url: "http://localhost:3000/api", // your base URL
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.js"], // Adjust if your route folder is different
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiMiddleware = swaggerUi.setup(swaggerSpec);
export const swaggerServe = swaggerUi.serve;

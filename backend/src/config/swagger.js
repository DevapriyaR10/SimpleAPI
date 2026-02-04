import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const swaggerSetup = (app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "RBAC API",
        version: "1.0.0"
      },
      servers: [
        {
          url: "http://localhost:5000/api/v1"
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      }
    },
    apis: ["./src/routes/*.js"]
  };

  const spec = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
};

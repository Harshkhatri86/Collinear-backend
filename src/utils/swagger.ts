import { Express, Request, Response } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import log from './logger';

// add the swaggerJsdoc options //
let version = '1.0.0';
const options: swaggerJsdoc.Options = {
    definition: {
        info: {
            title: "REST API DOCS",
            version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "jwt",
                },
            },
        },
        security: [{
            bearerAuth: [],
        }]
    },
    apis:['src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number | string) {
    //swagger page //
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;

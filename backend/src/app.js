import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import notFoundHandler from './middlewares/notFound.middleware.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import authRoute from './modules/auth/auth.routes.js';
import cookieParser from 'cookie-parser';
import swaggerDocument from './docs/swagger.js';

const app = express();

// ─── Middlewares ───────────────────────────────
app.use(
    cors({
        origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
    })
);

app.use(express.json());                    // parses JSON body
app.use(express.urlencoded({ extended: true })); // parses form data
app.use(cookieParser());                    // parse cookie
app.use(morgan('dev'));                     // logs requests

// ─── Health Check ──────────────────────────────
app.get('/health', (req, res) => {
    res.json({ success: true, message: 'Server is running' });
});
app.get('/', (req, res) => {
    res.type('text/plain');

    res.send(`
        ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ██████╗ ██╗   ██╗███╗   ██╗███╗   ██╗██╗███╗   ██╗ ██████╗                 
        ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██╔══██╗██║   ██║████╗  ██║████╗  ██║██║████╗  ██║██╔════╝                 
        ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ██████╔╝██║   ██║██╔██╗ ██║██╔██╗ ██║██║██╔██╗ ██║██║  ███╗                
        ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██╔══██╗██║   ██║██║╚██╗██║██║╚██╗██║██║██║╚██╗██║██║   ██║                
        ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ██║  ██║╚██████╔╝██║ ╚████║██║ ╚████║██║██║ ╚████║╚██████╔╝    ██╗██╗██╗██╗
        ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═╝╚═╝╚═╝╚═╝                                                                                                                            
    `);
});

// ─── Routes Mount Pipeline ────────────────────
app.use('/api/v1/auth', authRoute);  

// ✅ FIX: Pass options object to setup token persistence in LocalStorage across page refreshes
app.use(
    '/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            persistAuthorization: true
        }
    })
);

// ─── Error Handlers (must be last) ────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const estudianteRouter_1 = require("./src/routes/estudianteRouter");
const profesorRouter_1 = require("./src/routes/profesorRouter");
const asignaturaRouter_1 = require("./src/routes/asignaturaRouter");
const imparteRouter_1 = require("./src/routes/imparteRouter");
const inscribeRouter_1 = require("./src/routes/inscribeRouter");
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv.config();
app.use((0, cors_1.default)());
app.use(bodyParser.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});
app.use("/estudiante", estudianteRouter_1.estudianteRouter);
app.use("/profesor", profesorRouter_1.profesorRouter);
app.use("/asignatura", asignaturaRouter_1.asignaturaRouter);
app.use("/imparte", imparteRouter_1.imparteRouter);
app.use('/inscribe', inscribeRouter_1.inscribeRouter);
db_1.db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    }
    else {
        console.log('Database Connected');
    }
});
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});
app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
});

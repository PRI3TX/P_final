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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignaturaRouter = void 0;
const express_1 = __importDefault(require("express"));
const asignaturaController = __importStar(require("../controllers/asignaturaController"));
const asignaturaRouter = express_1.default.Router();
exports.asignaturaRouter = asignaturaRouter;
asignaturaRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAsignatura = req.body;
    asignaturaController.create(newAsignatura, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
asignaturaRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    asignaturaController.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
asignaturaRouter.get('/:cod_a', (req, res) => {
    const cod_a = parseInt(req.params.cod_a);
    asignaturaController.getOne(cod_a, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
asignaturaRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAsignatura = req.body;
    asignaturaController.update(newAsignatura, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
asignaturaRouter.delete('/:cod_a', (req, res) => {
    const cod_a = parseInt(req.params.cod_a);
    asignaturaController.delite(cod_a, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});

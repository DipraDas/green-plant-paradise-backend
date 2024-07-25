"use strict";
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
exports.CategoryServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const category_constants_1 = require("./category.constants");
const category_model_1 = require("./category.model");
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = category_model_1.Category.create(payload);
    return result;
});
const updateCategoryIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const getAllCategoryFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const CategoryQuery = new QueryBuilder_1.default(category_model_1.Category.find(), query)
        .search(category_constants_1.CategorySearchableFields)
        .filter()
        .sort()
        .fields();
    const result = yield CategoryQuery.modelQuery;
    const meta = yield CategoryQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSingleCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findById(id);
    return result;
});
const deleteCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndDelete(id);
    return result;
});
exports.CategoryServices = {
    createCategoryIntoDB,
    updateCategoryIntoDB,
    getAllCategoryFromDB,
    getSingleCategoryFromDB,
    deleteCategoryFromDB,
};

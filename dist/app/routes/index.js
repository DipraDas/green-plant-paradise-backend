"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_routes_1 = require("../modules/category/category.routes");
const product_route_1 = require("../modules/product/product.route");
const order_routes_1 = require("../modules/order/order.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/category",
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: "/product",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/order",
        route: order_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDrops = getDrops;
exports.postDrop = postDrop;
const drop_service_js_1 = require("./drop.service.js");
const drop_service_js_2 = require("./drop.service.js");
async function getDrops(_req, res) {
    try {
        const drops = await (0, drop_service_js_1.listDropsWithActivity)();
        res.json(drops);
    }
    catch (err) {
        console.error('Failed to fetch drops:', err);
        res
            .status(500)
            .json({ error: 'INTERNAL_ERROR', message: 'Failed to fetch drops.' });
    }
}
async function postDrop(req, res) {
    try {
        const input = req.body;
        const drop = await (0, drop_service_js_2.createDrop)(input);
        res.status(201).json(drop);
    }
    catch (err) {
        console.error('Failed to create drop:', err);
        res
            .status(500)
            .json({ error: 'INTERNAL_ERROR', message: 'Failed to create drop.' });
    }
}
//# sourceMappingURL=drop.controller.js.map
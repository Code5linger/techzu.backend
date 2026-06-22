"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = postUser;
const user_model_js_1 = require("./user.model.js");
async function postUser(req, res) {
    try {
        const { username } = req.body;
        if (!username || typeof username !== 'string' || !username.trim()) {
            return res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: 'username is required.',
            });
        }
        const trimmedUsername = username.trim().toLowerCase();
        const [user] = await user_model_js_1.User.findOrCreate({
            where: { username: trimmedUsername },
            defaults: { username: trimmedUsername },
        });
        return res.status(200).json({
            id: user.id,
            username: user.username,
        });
    }
    catch (err) {
        console.error('Failed to find or create user:', err);
        return res.status(500).json({
            error: 'INTERNAL_ERROR',
            message: 'Failed to find or create user.',
        });
    }
}
//# sourceMappingURL=user.controller.js.map
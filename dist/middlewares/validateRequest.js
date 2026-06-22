"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
function validateRequest(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: 'Invalid request body.',
                details: result.error.flatten().fieldErrors,
            });
        }
        req.body = result.data;
        next();
    };
}
//# sourceMappingURL=validateRequest.js.map
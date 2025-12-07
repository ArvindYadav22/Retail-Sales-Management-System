const SalesService = require('../services/salesService');

class SalesController {
    static async getSales(req, res) {
        try {
            const result = await SalesService.getSales(req.query);
            res.json(result);
        } catch (error) {
            console.error('Error fetching sales:', error);
            res.status(500).json({ error: error.message, stack: error.stack });
        }
    }

    static async getFilterOptions(req, res) {
        try {
            const filters = await SalesService.getFilterOptions();
            res.json(filters);
        } catch (error) {
            console.error('Error fetching filter options:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SalesController;

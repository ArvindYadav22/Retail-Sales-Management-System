const Sale = require('../models/Sale');

class SalesService {
    static async getSales(queryParams) {
        const {
            search,
            page = 1,
            limit = 10,
            sortBy = 'date',
            order = 'desc',
            region,
            gender,
            minAge,
            maxAge,
            category,
            tags,
            paymentMethod,
            startDate,
            endDate
        } = queryParams;

        const query = {};

        if (search) {
            query.$or = [
                { 'customer.name': { $regex: search, $options: 'i' } },
                { 'customer.phone': { $regex: search, $options: 'i' } }
            ];
        }

        if (region) query['customer.region'] = { $in: region.split(',') };
        if (gender) query['customer.gender'] = { $in: gender.split(',') };
        if (category) query['product.category'] = { $in: category.split(',') };
        if (paymentMethod) query['paymentMethod'] = { $in: paymentMethod.split(',') };
        if (tags) query['product.tags'] = { $in: tags.split(',') };

        if (minAge || maxAge) {
            query['customer.age'] = {};
            if (minAge) query['customer.age'].$gte = Number(minAge);
            if (maxAge) query['customer.age'].$lte = Number(maxAge);
        }

        if (startDate || endDate) {
            query['date'] = {};
            if (startDate) query['date'].$gte = new Date(startDate);
            if (endDate) query['date'].$lte = new Date(endDate);
        }

        const sortOptions = {};
        if (sortBy === 'customerName') sortOptions['customer.name'] = order === 'asc' ? 1 : -1;
        else sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        const skip = (page - 1) * limit;

        const total = await Sale.countDocuments(query);
        const sales = await Sale.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        return {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
            data: sales
        };
    }

    static async getFilterOptions() {
        const [regions, categories, tags, paymentMethods] = await Promise.all([
            Sale.distinct('customer.region'),
            Sale.distinct('product.category'),
            Sale.distinct('product.tags'),
            Sale.distinct('paymentMethod')
        ]);
        return { regions, categories, tags, paymentMethods };
    }
}

module.exports = SalesService;

const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    // Customer Fields
    customer: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'] },
        age: { type: Number },
        region: { type: String },
        type: { type: String }
    },

    // Product Fields
    product: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        brand: { type: String },
        category: { type: String },
        tags: [{ type: String }]
    },

    // Sales Fields
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    finalAmount: { type: Number, required: true },

    // Operational Fields
    date: { type: Date, required: true },
    paymentMethod: { type: String },
    orderStatus: { type: String, enum: ['Completed', 'Pending', 'Cancelled', 'Returned'] },
    deliveryType: { type: String },
    store: {
        id: { type: String },
        location: { type: String }
    },
    employee: {
        id: { type: String },
        name: { type: String }
    }
}, { timestamps: true });


SaleSchema.index({ 'customer.name': 'text', 'customer.phone': 'text' });
SaleSchema.index({ 'product.category': 1, 'product.tags': 1, 'date': -1, 'costumer.region': 1 });

module.exports = mongoose.model('Sale', SaleSchema);

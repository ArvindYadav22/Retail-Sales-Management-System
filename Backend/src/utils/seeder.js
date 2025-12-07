const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sale = require('../models/Sale');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const regions = ['North', 'South', 'East', 'West'];
const paymentMethods = ['Credit Card', 'Debit Card', 'Cash', 'UPI'];
const categories = ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports'];
const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'Zara'];
const tagsList = ['New Arrival', 'Best Seller', 'Discounted', 'Limited Edition', 'Eco-friendly'];

const generateRandomSales = (num) => {
    const sales = [];
    for (let i = 0; i < num; i++) {
        const quantity = Math.floor(Math.random() * 5) + 1;
        const pricePerUnit = Math.floor(Math.random() * 500) + 50;
        const totalAmount = quantity * pricePerUnit;
        const discountPercentage = Math.floor(Math.random() * 20);
        const finalAmount = totalAmount - (totalAmount * (discountPercentage / 100));

        const gender = Math.random() > 0.5 ? 'Male' : 'Female';
        const name = gender === 'Male'
            ? ['Aarav', 'Arjun', 'Rahul', 'Rohit', 'Aditya', 'Karan', 'Rohan', 'Siddharth', 'Kunal', 'Varun', 'Aniket', 'Shreyas', 'Manish', 'Ayush', 'Pranav', 'Abhishek', 'Nikhil', 'Vivek', 'Yash', 'Sagar'][Math.floor(Math.random() * 20)]
            : ['Aisha', 'Ananya', 'Priya', 'Kavya', 'Riya', 'Nisha', 'Sakshi', 'Shruti', 'Pooja', 'Sneha', 'Aditi', 'Meera', 'Tanvi', 'Isha', 'Neha', 'Diya', 'Shreya', 'Divya', 'Kirti', 'Simran'][Math.floor(Math.random() * 20)];

        sales.push({
            customer: {
                id: `CUST${i}`,
                name: name,
                phone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
                gender: gender,
                age: Math.floor(Math.random() * 40) + 18,
                region: regions[Math.floor(Math.random() * regions.length)],
                type: Math.random() > 0.8 ? 'VIP' : 'Regular'
            },
            product: {
                id: `PROD${Math.floor(Math.random() * 100)}`,
                name: `Product ${Math.floor(Math.random() * 100)}`,
                brand: brands[Math.floor(Math.random() * brands.length)],
                category: categories[Math.floor(Math.random() * categories.length)],
                tags: [tagsList[Math.floor(Math.random() * tagsList.length)]]
            },
            quantity,
            pricePerUnit,
            discountPercentage,
            totalAmount,
            finalAmount,
            date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
            paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
            orderStatus: 'Completed',
            deliveryType: Math.random() > 0.5 ? 'Standard' : 'Express',
            store: { id: 'STORE01', location: 'Mumbai' },
            employee: { id: 'EMP001', name: 'Rajesh Kumar' }
        });
    }
    return sales;
};

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/retail_sales');
        console.log('Connected to DB...');

        await Sale.deleteMany({});
        console.log('Cleared existing data...');

        const salesData = generateRandomSales(100);
        await Sale.insertMany(salesData);
        console.log(`Seeded ${salesData.length} sales records.`);

        process.exit();
    } catch (error) {
        console.error('Seeding request failed', error);
        process.exit(1);
    }
};

seedData();

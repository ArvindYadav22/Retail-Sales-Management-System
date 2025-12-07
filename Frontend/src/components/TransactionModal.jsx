import React from 'react';

const TransactionModal = ({ sale, onClose }) => {
    if (!sale) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Transaction Details</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="detail-section">
                        <h3>Customer Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>ID</label>
                                <span>{sale.customer.id}</span>
                            </div>
                            <div className="detail-item">
                                <label>Name</label>
                                <span>{sale.customer.name}</span>
                            </div>
                            <div className="detail-item">
                                <label>Type</label>
                                <span>{sale.customer.type || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <label>Phone</label>
                                <span>{sale.customer.phone}</span>
                            </div>
                            <div className="detail-item">
                                <label>Email</label>
                                <span>{sale.customer.email || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <label>Region</label>
                                <span>{sale.customer.region}</span>
                            </div>
                            <div className="detail-item">
                                <label>Gender</label>
                                <span>{sale.customer.gender}</span>
                            </div>
                            <div className="detail-item">
                                <label>Age</label>
                                <span>{sale.customer.age}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Product Details</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Product ID</label>
                                <span>{sale.product.id}</span>
                            </div>
                            <div className="detail-item">
                                <label>Name</label>
                                <span>{sale.product.name}</span>
                            </div>
                            <div className="detail-item">
                                <label>Brand</label>
                                <span>{sale.product.brand}</span>
                            </div>
                            <div className="detail-item">
                                <label>Category</label>
                                <span>{sale.product.category}</span>
                            </div>
                            <div className="detail-item">
                                <label>Tags</label>
                                <span>{sale.product.tags ? sale.product.tags.join(', ') : 'None'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Financials</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Price per Unit</label>
                                <span>₹{sale.pricePerUnit?.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="detail-item">
                                <label>Quantity</label>
                                <span>{sale.quantity}</span>
                            </div>
                            <div className="detail-item">
                                <label>Total Amount</label>
                                <span>₹{sale.totalAmount?.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="detail-item">
                                <label>Discount</label>
                                <span>{sale.discountPercentage}%</span>
                            </div>
                            <div className="detail-item">
                                <label>Final Amount</label>
                                <span>₹{sale.finalAmount?.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Operational Info</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Date</label>
                                <span>{new Date(sale.date).toLocaleString()}</span>
                            </div>
                            <div className="detail-item">
                                <label>Payment Method</label>
                                <span>{sale.paymentMethod}</span>
                            </div>
                            <div className="detail-item">
                                <label>Order Status</label>
                                <span>{sale.orderStatus}</span>
                            </div>
                            <div className="detail-item">
                                <label>Delivery Type</label>
                                <span>{sale.deliveryType}</span>
                            </div>
                            <div className="detail-item">
                                <label>Store Location</label>
                                <span>{sale.store?.location || 'N/A'} (ID: {sale.store?.id})</span>
                            </div>
                            <div className="detail-item">
                                <label>Salesperson</label>
                                <span>{sale.employee?.name || 'N/A'} (ID: {sale.employee?.id})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;

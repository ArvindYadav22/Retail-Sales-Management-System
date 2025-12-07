import React, { useState, useEffect } from 'react';
import { fetchSales, fetchFilters } from '../services/api';
import TransactionModal from './TransactionModal';
import '../styles/App.css';

const Dashboard = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [selectedSale, setSelectedSale] = useState(null);
    const [showAgeFilter, setShowAgeFilter] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        region: '',
        category: '',
        paymentMethod: '',
        tags: '',
        gender: '',
        startDate: '',
        endDate: '',
        sortBy: 'date',
        order: 'desc'
    });
    const [options, setOptions] = useState({
        regions: [],
        categories: [],
        tags: [],
        paymentMethods: []
    });

    useEffect(() => {
        loadFilters();
    }, []);

    useEffect(() => {
        loadSales();
    }, [page, search, filters]);

    const loadFilters = async () => {
        try {
            const data = await fetchFilters();
            setOptions(data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadSales = async () => {
        setLoading(true);
        try {
            const params = { ...filters, search, page, limit: 10 };
            const data = await fetchSales(params);
            setSalesData(data.data);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const [expandedSections, setExpandedSections] = useState({
        services: true,
        invoices: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(1);
    };

    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="logo-area">
                    <span>Vault</span>
                </div>
                <div className="user-profile">
                    <div className="user-avatar">A</div>
                    <div className="user-info">
                        <span className="user-name">Arvind Yadav</span>
                    </div>
                </div>
                <div className="nav-links">
                    <div className="nav-item">Dashboard</div>
                    <div className="nav-item">Nexus</div>
                    <div className="nav-item">Intake</div>

                    <div className="nav-section">
                        <div
                            className="nav-item has-submenu"
                            onClick={() => toggleSection('services')}
                        >
                            Services
                            <span className={`arrow-icon ${expandedSections.services ? 'expanded' : ''}`}>^</span>
                        </div>
                        {expandedSections.services && (
                            <div className="submenu">
                                <div className="nav-item sub-item"> Pre-active</div>
                                <div className="nav-item sub-item active"> Active</div>
                                <div className="nav-item sub-item"> Blocked</div>
                                <div className="nav-item sub-item"> Closed</div>
                            </div>
                        )}
                    </div>

                    <div className="nav-section">
                        <div
                            className="nav-item has-submenu"
                            onClick={() => toggleSection('invoices')}
                        >
                            Invoices
                            <span className={`arrow-icon ${expandedSections.invoices ? 'expanded' : ''}`}>^</span>
                        </div>
                        {expandedSections.invoices && (
                            <div className="submenu">
                                <div className="nav-item sub-item"> Proforma Invoices</div>
                                <div className="nav-item sub-item"> Final Invoices</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="top-bar">
                    <h1 className="page-title">Sales Management System</h1>
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="Search Customer Name,Phone no."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="filter-bar">
                    <button
                        className="refresh-btn"
                        onClick={() => {
                            setFilters({
                                region: '',
                                category: '',
                                paymentMethod: '',
                                tags: '',
                                gender: '',
                                startDate: '',
                                endDate: '',
                                sortBy: 'date',
                                order: 'desc'
                            });
                            setSearch('');
                            setPage(1);
                        }}
                        title="Reset Filters"
                    >
                        ↻
                    </button>

                    <div className="filter-item">
                        <select name="region" onChange={handleFilterChange} value={filters.region}>
                            <option value="">Customer Region</option>
                            {options.regions.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>

                    <div className="filter-item">
                        <select name="gender" onChange={handleFilterChange} value={filters.gender}>
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="filter-item">
                        <select
                            name="ageRange"
                            value={
                                filters.minAge && filters.maxAge ? `${filters.minAge}-${filters.maxAge}` :
                                    filters.minAge === '60' ? '60+' : ''
                            }
                            onChange={(e) => {
                                const val = e.target.value;
                                let min = '', max = '';
                                if (val) {
                                    const parts = val.split('-');
                                    min = parts[0];
                                    max = parts[1] || '';
                                    if (val === '60+') { min = '60'; max = ''; }
                                }
                                setFilters(prev => ({ ...prev, minAge: min, maxAge: max }));
                                setPage(1);
                            }}
                        >
                            <option value="">Age Range</option>
                            <option value="0-18">0 - 18</option>
                            <option value="19-25">19 - 25</option>
                            <option value="26-35">26 - 35</option>
                            <option value="36-45">36 - 45</option>
                            <option value="46-60">46 - 60</option>
                            <option value="60+">60+</option>
                        </select>
                    </div>

                    <div className="filter-item">
                        <select name="category" onChange={handleFilterChange} value={filters.category}>
                            <option value="">Product Category</option>
                            {options.categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="filter-item">
                        <select name="tags" onChange={handleFilterChange} value={filters.tags}>
                            <option value="">Tags</option>
                            {options.tags && options.tags.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="filter-item">
                        <select name="paymentMethod" onChange={handleFilterChange} value={filters.paymentMethod}>
                            <option value="">Payment Method</option>
                            {options.paymentMethods.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div className="filter-item">
                        {!filters.startDate && !showDatePicker ? (
                            <select
                                value=""
                                onChange={(e) => {
                                    if (e.target.value === 'pick') {
                                        setShowDatePicker(true);
                                    }
                                }}
                            >
                                <option value="">Date</option>
                                <option value="pick">dd/mm/yyyy</option>
                            </select>
                        ) : (
                            <input
                                type="date"
                                autoFocus
                                value={filters.startDate || ''}
                                onBlur={() => {
                                    if (!filters.startDate) setShowDatePicker(false);
                                }}
                                onChange={(e) => {
                                    setFilters(prev => ({
                                        ...prev,
                                        startDate: e.target.value,
                                        endDate: e.target.value
                                    }));
                                    setPage(1);
                                }}
                                className="date-filter-input"
                            />
                        )}
                    </div>

                    <div className="filter-item sort-item">
                        <select name="sortBy" onChange={handleFilterChange} value={filters.sortBy}>
                            <option value="date">Sort by: Date</option>
                            <option value="totalAmount">Sort by: Amount</option>
                            <option value="quantity">Sort by: Quantity</option>
                            <option value="customer.name">Sort by: Customer Name</option>
                        </select>
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-label">Total units sold </div>
                        <div className="stat-value">
                            10
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Total Amount </div>
                        <div className="stat-value">
                            ₹89,000 <span className="stat-subtext">(19 SRs)</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Total Discount </div>
                        <div className="stat-value">
                            ₹15000 <span className="stat-subtext">(45 SRs)</span>
                        </div>
                    </div>
                </div>

                <div className="table-container">
                    {loading ? <p style={{ padding: '20px' }}>Loading...</p> : (
                        <>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Date</th>
                                        <th>Customer ID</th>
                                        <th>Customer name</th>
                                        <th>Phone Number</th>
                                        <th>Gender</th>
                                        <th>Age</th>
                                        <th>Product Category</th>
                                        <th>Quantity</th>
                                        <th>Total Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesData.length > 0 ? salesData.map(sale => (
                                        <tr key={sale._id}>
                                            <td>{sale._id.slice(-7)}</td>
                                            <td>{new Date(sale.date).toISOString().split('T')[0]}</td>
                                            <td>{sale.customer.id}</td>
                                            <td>{sale.customer.name}</td>
                                            <td>{sale.customer.phone} </td>
                                            <td>{sale.customer.gender}</td>
                                            <td>{sale.customer.age}</td>
                                            <td>{sale.product.category}</td>
                                            <td>{sale.quantity.toString().padStart(2, '0')}</td>
                                            <td>₹{sale.finalAmount.toLocaleString('en-IN')}</td>
                                            <td>
                                                <button
                                                    className="view-btn"
                                                    onClick={() => setSelectedSale(sale)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="11" style={{ textAlign: 'center' }}>No results found</td></tr>}
                                </tbody>
                            </table>

                            <div className="pagination-container">
                                <span className="pagination-info">Page {page} of {totalPages}</span>
                                <div className="pagination-controls">
                                    <button className="page-btn" onClick={() => setPage(1)} disabled={page === 1}>«</button>
                                    <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                                    <button className="page-btn active">{page}</button>
                                    <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                                    <button className="page-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {
                selectedSale && (
                    <TransactionModal
                        sale={selectedSale}
                        onClose={() => setSelectedSale(null)}
                    />
                )
            }
        </div>
    );
};

export default Dashboard;

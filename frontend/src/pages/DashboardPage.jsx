import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


function DashboardPage() {
    const [deals, setDeals] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('token');
    let userId = '';

    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
    }

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/api/deals', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setDeals(res.data))
                .catch(err => console.error(err));

            axios.get('http://localhost:5000/api/auth/sellers')
                .then(res => setSellers(res.data))
                .catch(err => console.error(err));
        }
    }, [token]);

    const handleCreateDeal = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/deals', {
                title,
                description,
                price,
                sellerId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDeals([...deals, res.data.deal]);
            setTitle('');
            setDescription('');
            setPrice('');
            setSellerId('');
            setMessage('Deal created successfully!');
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.error || 'Failed to create deal');
        }
    };

    const handleStatusChange = async (dealId, newStatus) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/deals/${dealId}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setDeals(deals.map(d => d._id === dealId ? res.data.deal : d));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Dashboard</h2>
            <p>Loaded sellers: {JSON.stringify(sellers)}</p>

            <form onSubmit={handleCreateDeal}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                /><br /><br />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                /><br /><br />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                /><br /><br />
                <select
                    style={{ color: 'black', backgroundColor: 'white' }}
                    value={sellerId}
                    required
                    onChange={(e) => setSellerId(e.target.value)}
                >
                    <option value="">Select Seller</option>
                    {sellers.map(s => (
                        <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                </select><br /><br />
                <button type="submit">Create Deal</button>
            </form>
            <p>{message}</p>
            <h3>Your Deals</h3>
            <ul>
                {deals.map(deal => (
                    <li key={deal._id}>
                        <strong>{deal.title}</strong> — ${deal.price} — {deal.status} <br />
                        Buyer: {deal.buyer?.name} | Seller: {deal.seller?.name}
                        {deal.seller?._id === userId && (
                            <>
                                <br />
                                <select
                                    value={deal.status}
                                    onChange={(e) => handleStatusChange(deal._id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DashboardPage;

import { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // This would be replaced with actual API call
        // const data = await orderAPI.getByUser();
        
        // Mock data for demonstration
        const mockOrders = [
          {
            _id: '1',
            orderNumber: 'VNO001',
            status: 'delivered',
            totalAmount: 245.00,
            items: [{ name: 'Noir Essence', quantity: 1, price: 245.00 }],
            createdAt: new Date('2024-01-15').toISOString()
          },
          {
            _id: '2',
            orderNumber: 'VNO002',
            status: 'processing',
            totalAmount: 180.00,
            items: [{ name: 'Lumière d\'Or', quantity: 1, price: 180.00 }],
            createdAt: new Date('2024-01-20').toISOString()
          }
        ];
        
        setOrders(mockOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};
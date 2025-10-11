import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Visibility, ShoppingBag } from '@mui/icons-material';
import { useOrders } from '../../hooks/useOrders';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Orders = () => {
  const { orders, loading } = useOrders();

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'warning',
      'processing': 'info',
      'shipped': 'primary',
      'delivered': 'success',
      'cancelled': 'error'
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return <LoadingSpinner message="Loading orders..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 8 }}>
          <CardContent>
            <ShoppingBag sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              No orders yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Start exploring our luxury fragrance collection
            </Typography>
            <Button variant="contained" size="large">
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {/* Order Summary Cards */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" gutterBottom>
                      {orders.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Orders
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main" gutterBottom>
                      {orders.filter(o => o.status === 'delivered').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Delivered
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main" gutterBottom>
                      {orders.filter(o => o.status === 'processing').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Processing
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main" gutterBottom>
                      ${orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Spent
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Orders Table */}
          <Grid item xs={12}>
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order #</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Items</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            #{order.orderNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            ${order.totalAmount.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            startIcon={<Visibility />}
                            size="small"
                            variant="outlined"
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Orders;
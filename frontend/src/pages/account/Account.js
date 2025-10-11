import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar
} from '@mui/material';
import {
  Person,
  Email,
  CalendarToday,
  ShoppingBag,
  Favorite,
  Settings
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../hooks/useOrders';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Account = () => {
  const { user } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const [activeSection, setActiveSection] = useState('overview');

  if (!user) {
    return <LoadingSpinner message="Loading account..." />;
  }

  const recentOrders = orders.slice(0, 3);

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag },
    { label: 'Wishlist Items', value: user.wishlist?.length || 0, icon: Favorite },
    { label: 'Member Since', value: new Date(user.createdAt).getFullYear(), icon: CalendarToday }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
        My Account
      </Typography>

      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}
              >
                <Person sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>

            <List>
              {[
                { key: 'overview', label: 'Overview', icon: Person },
                { key: 'orders', label: 'Order History', icon: ShoppingBag },
                { key: 'wishlist', label: 'Wishlist', icon: Favorite },
                { key: 'settings', label: 'Settings', icon: Settings }
              ].map((item) => (
                <ListItem
                  key={item.key}
                  button
                  selected={activeSection === item.key}
                  onClick={() => setActiveSection(item.key)}
                >
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {activeSection === 'overview' && (
            <Box>
              {/* Stats Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <stat.icon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h4" component="div" gutterBottom>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Recent Orders */}
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5">Recent Orders</Typography>
                  <Button variant="outlined">View All</Button>
                </Box>

                {ordersLoading ? (
                  <LoadingSpinner message="Loading orders..." />
                ) : recentOrders.length > 0 ? (
                  <List>
                    {recentOrders.map((order) => (
                      <ListItem key={order._id} divider>
                        <ListItemText
                          primary={`Order #${order.orderNumber}`}
                          secondary={`Placed on ${new Date(order.createdAt).toLocaleDateString()} • Total: $${order.totalAmount}`}
                        />
                        <Button variant="text" size="small">
                          View Details
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <ShoppingBag sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      No orders yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Start exploring our fragrance collection
                    </Typography>
                    <Button variant="contained">
                      Start Shopping
                    </Button>
                  </Box>
                )}
              </Paper>
            </Box>
          )}

          {activeSection === 'orders' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Order History
              </Typography>
              {/* Order history content would go here */}
            </Paper>
          )}

          {activeSection === 'wishlist' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                My Wishlist
              </Typography>
              {/* Wishlist content would go here */}
            </Paper>
          )}

          {activeSection === 'settings' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Account Settings
              </Typography>
              {/* Settings content would go here */}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
} from "@mui/material";
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Import the hooks - adjust the path based on your project structure
import { useCart } from "../../../contexts/CartContext";

const CartDrawer = ({ open, onClose }) => {
  // Safe context usage with fallbacks
  const {
    cart = [],
    updateQuantity = () => {},
    removeFromCart = () => {},
    getCartTotal = () => 0,
    getCartItemsCount = () => 0,
  } = useCart?.() || {};

  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    onClose();
    navigate("/shop");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400 },
          p: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">
          Shopping Cart ({getCartItemsCount()})
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {cart.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={handleContinueShopping}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflow: "auto" }}>
            {cart.map((item) => (
              <ListItem
                key={item._id}
                divider
                sx={{
                  alignItems: "flex-start",
                  gap: 2,
                  py: 2,
                }}
                disableGutters
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    flexShrink: 0,
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "grey.100",
                    mr: 2,
                  }}
                >
                  <img
                    src={
                      item.images?.[0]?.url || "/images/placeholder-product.jpg"
                    }
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle1" fontWeight={600} noWrap>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    ${Number(item.price).toFixed(2)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item._id, (item.quantity || 1) - 1)
                      }
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <TextField
                      size="small"
                      value={item.quantity || 1}
                      inputProps={{
                        style: { textAlign: "center", width: 36, padding: 4 },
                      }}
                      variant="outlined"
                      disabled
                      sx={{ width: 48 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item._id, (item.quantity || 1) + 1)
                      }
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removeFromCart(item._id)}
                  sx={{ ml: 1, alignSelf: "center" }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: "auto", pt: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                ${getCartTotal().toFixed(2)}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCheckout}
              sx={{ mb: 1 }}
            >
              Proceed to Checkout
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;

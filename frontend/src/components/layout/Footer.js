import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ fontFamily: 'Playfair Display, serif' }}
            >
              VINOIR
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Luxury fragrances crafted with passion and precision. 
              Experience the art of fine scent-making with our exclusive collection.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Shop
            </Typography>
            <Link href="/shop" color="text.secondary" display="block" gutterBottom>
              All Products
            </Link>
            <Link href="/shop?category=perfume" color="text.secondary" display="block" gutterBottom>
              Perfumes
            </Link>
            <Link href="/shop?category=cologne" color="text.secondary" display="block" gutterBottom>
              Colognes
            </Link>
            <Link href="/shop?featured=true" color="text.secondary" display="block" gutterBottom>
              Featured
            </Link>
          </Grid>

          {/* Support */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link href="/contact" color="text.secondary" display="block" gutterBottom>
              Contact Us
            </Link>
            <Link href="/shipping" color="text.secondary" display="block" gutterBottom>
              Shipping Info
            </Link>
            <Link href="/returns" color="text.secondary" display="block" gutterBottom>
              Returns
            </Link>
            <Link href="/faq" color="text.secondary" display="block" gutterBottom>
              FAQ
            </Link>
          </Grid>

          {/* Company */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Link href="/about" color="text.secondary" display="block" gutterBottom>
              About Us
            </Link>
            <Link href="/careers" color="text.secondary" display="block" gutterBottom>
              Careers
            </Link>
            <Link href="/press" color="text.secondary" display="block" gutterBottom>
              Press
            </Link>
            <Link href="/sustainability" color="text.secondary" display="block" gutterBottom>
              Sustainability
            </Link>
          </Grid>

          {/* Legal */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Link href="/privacy" color="text.secondary" display="block" gutterBottom>
              Privacy Policy
            </Link>
            <Link href="/terms" color="text.secondary" display="block" gutterBottom>
              Terms of Service
            </Link>
            <Link href="/cookies" color="text.secondary" display="block" gutterBottom>
              Cookie Policy
            </Link>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 3, mt: 3 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} VINOIR. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
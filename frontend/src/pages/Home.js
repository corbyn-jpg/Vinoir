import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { productAPI } from '../services/api';
import ProductCard from '../components/ui/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await productAPI.getFeatured();
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const heroSlides = [
    {
      title: "Elegance in Every Drop",
      subtitle: "Discover our exclusive collection of luxury fragrances",
      image: "/images/hero-1.jpg",
      cta: "Shop Now",
      link: "/shop"
    },
    {
      title: "Craftsmanship Redefined",
      subtitle: "Handcrafted scents for the discerning individual",
      image: "/images/hero-2.jpg",
      cta: "Explore",
      link: "/about"
    },
    {
      title: "Seasonal Collection",
      subtitle: "New arrivals for the modern connoisseur",
      image: "/images/hero-3.jpg",
      cta: "Discover",
      link: "/shop?new=true"
    }
  ];

  return (
    <Box>
      {/* Hero Slider */}
      <Box sx={{ height: '80vh', overflow: 'hidden' }}>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: '80vh',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                <Container maxWidth="md">
                  <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 300 }}>
                    {slide.title}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
                    {slide.subtitle}
                  </Typography>
                  <Button
                    component={Link}
                    to={slide.link}
                    variant="contained"
                    size="large"
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      backgroundColor: 'white',
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'grey.100'
                      }
                    }}
                  >
                    {slide.cta}
                  </Button>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Featured Collection
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our most sought-after fragrances, carefully curated for the modern individual
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featuredProducts.slice(0, 4).map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            to="/shop"
            variant="outlined"
            size="large"
            sx={{ px: 4 }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Brand Story */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom>
                The Art of Fragrance
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                At Vinoir, we believe that a fragrance is more than just a scent—it's a memory, 
                an emotion, a statement. Our master perfumers combine traditional techniques 
                with innovative approaches to create unique olfactory experiences.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Each bottle tells a story, from the carefully selected ingredients to the 
                exquisite packaging. We source our materials from around the world, ensuring 
                the highest quality and sustainability.
              </Typography>
              <Button
                component={Link}
                to="/about"
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
              >
                Our Story
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/brand-story.jpg"
                alt="Brand Story"
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 2
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
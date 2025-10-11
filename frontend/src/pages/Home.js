import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ui/ProductCard';
import { productAPI } from '../services/api';

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
      subtitle: "Discover our exclusive collection of luxury fragrances crafted with passion and precision",
      image: "/images/heroes/hero-1.jpg",
      cta: "Shop Now",
      link: "/shop"
    },
    {
      title: "The Art of Fragrance",
      subtitle: "Masterfully crafted scents that tell stories and create lasting memories",
      image: "/images/heroes/hero-2.jpg",
      cta: "Our Story", 
      link: "/about"
    },
    {
      title: "Seasonal Collection",
      subtitle: "New arrivals for the modern connoisseur - limited editions now available",
      image: "/images/heroes/hero-3.jpg",
      cta: "Discover",
      link: "/shop?new=true"
    }
  ];

  return (
    <Box>
      {/* Hero Slider */}
      <Box sx={{ height: { xs: '60vh', md: '80vh' }, overflow: 'hidden' }}>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          style={{ height: '100%' }}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <HeroSection
                title={slide.title}
                subtitle={slide.subtitle}
                buttonText={slide.cta}
                buttonLink={slide.link}
                backgroundImage={slide.image}
                overlayOpacity={0.4}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
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
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
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
                src="/images/heroes/brand-story.jpg"
                alt="Brand Story"
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
            Our Commitment
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {[
            {
              title: "Natural Ingredients",
              description: "We source the finest natural ingredients from sustainable farms around the world.",
              image: "/images/elements/rose.jpg"
            },
            {
              title: "Artisan Craftsmanship", 
              description: "Each fragrance is handcrafted by master perfumers with decades of experience.",
              image: "/images/elements/bottle-black.jpg"
            },
            {
              title: "Sustainable Luxury",
              description: "Luxury should not come at the expense of our planet. We're committed to eco-friendly practices.",
              image: "/images/heroes/about-story.jpg"
            }
          ].map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <Box
                  component="img"
                  src={value.image}
                  alt={value.title}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover'
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
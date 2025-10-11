import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  Chip
} from '@mui/material';
import { Spa, Eco, Diamond, LocalFlorist } from '@mui/icons-material';

import HeroSection from '../components/HeroSection';

// Import founder images
import marioImg from '../assets/founders/mario.jpg';
import corbynImg from '../assets/founders/corbyn.jpg';
import tristianImg from '../assets/founders/tristian.jpg';

const About = () => {
  const teamMembers = [
    {
      name: "Mario Surprise Ojo",
      role: "Creative Director",
      bio: "With over 15 years of experience in luxury branding and a passion for natural aromas, Mario leads our scent development and creative vision.",
      expertise: ["Floral Notes", "Oriental Blends", "Modern Classics"],
      image: marioImg
    },
    {
      name: "Corbyn Robinson",
      role: "Master Perfumer",
      bio: "Corbyn's expertise in extracting and blending natural essences brings our wilderness-inspired fragrances to life.",
      expertise: ["Sustainable Sourcing", "Quality Control", "Innovation"],
      image: corbynImg
    },
    {
      name: "Tristian Leech",
      role: "Operations Director",
      bio: "Tristian ensures our sustainable sourcing and maintains relationships with our exclusive clientele worldwide.",
      expertise: ["Supply Chain", "Client Relations", "Sustainability"],
      image: tristianImg
    }
  ];

  const values = [
    {
      icon: <Spa sx={{ fontSize: 40 }} />,
      title: "Natural Ingredients",
      description: "We source the finest natural ingredients from around the world, ensuring purity and sustainability."
    },
    {
      icon: <Eco sx={{ fontSize: 40 }} />,
      title: "Eco-Conscious",
      description: "Our packaging is 100% recyclable, and we're committed to reducing our environmental footprint."
    },
    {
      icon: <Diamond sx={{ fontSize: 40 }} />,
      title: "Luxury Craftsmanship",
      description: "Each fragrance is carefully crafted by our master perfumers using traditional techniques."
    },
    {
      icon: <LocalFlorist sx={{ fontSize: 40 }} />,
      title: "Artisanal Quality",
      description: "We believe in small-batch production to maintain the highest quality standards."
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection
        title="The Art of Fragrance"
        subtitle="Discover the passion, craftsmanship, and stories behind Vinoir"
        backgroundImage="/images/heroes/about-story.jpg"
        overlayOpacity={0.5}
      />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Our Story */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Founded in 2018, Vinoir emerged from a simple belief: that fragrance should be an experience, 
              not just a scent. Our journey began in a small studio in Paris, where our founders combined 
              their passion for perfumery with a commitment to sustainable luxury.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Today, we continue to honor traditional craftsmanship while embracing innovation. Each bottle 
              represents hours of meticulous work, from sourcing rare ingredients to perfecting complex 
              accords that evolve beautifully throughout the day.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/heroes/brand-story.jpg"
              alt="Our Story"
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 2
              }}
            />
          </Grid>
        </Grid>

        {/* Our Values */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontFamily: 'Playfair Display', mb: 6 }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Team */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontFamily: 'Playfair Display', mb: 6 }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      src={member.image}
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3
                      }}
                    />
                    <Typography variant="h5" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {member.bio}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                      {member.expertise.map((skill, skillIndex) => (
                        <Chip key={skillIndex} label={skill} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sustainability */}
        <Paper sx={{ p: 6, textAlign: 'center', background: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
            Commitment to Sustainability
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
            We're dedicated to preserving the environment while creating beautiful fragrances. 
            From ethically sourced ingredients to eco-friendly packaging, every decision is made 
            with our planet in mind. Join us in our journey towards a more sustainable future.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
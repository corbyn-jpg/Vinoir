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

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Master Perfumer",
      bio: "With over 15 years of experience in luxury fragrance creation, Sarah brings artistry and precision to every scent.",
      expertise: ["Floral Notes", "Oriental Blends", "Modern Classics"]
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      bio: "Marcus combines traditional perfumery with contemporary design to create unforgettable olfactory experiences.",
      expertise: ["Concept Development", "Brand Strategy", "Visual Identity"]
    },
    {
      name: "Dr. Elena Petrova",
      role: "Head of Research",
      bio: "Elena's background in chemistry and botany ensures the highest quality and sustainability in our ingredients.",
      expertise: ["Sustainable Sourcing", "Quality Control", "Innovation"]
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
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>
            The Art of Fragrance
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
            Crafting luxury scents that tell stories and create memories
          </Typography>
        </Container>
      </Box>

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
              src="/images/about-story.jpg"
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
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3,
                        bgcolor: 'primary.main'
                      }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
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
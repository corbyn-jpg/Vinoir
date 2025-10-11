import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  backgroundImage, 
  videoSrc,
  overlayOpacity = 0.4 
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        height: { xs: "60vh", md: "80vh" },
        minHeight: "500px",
      }}
    >
      {/* Background Video or Image */}
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Box
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      )}

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontFamily: "Playfair Display, serif",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            maxWidth: "800px",
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              fontFamily: "Playfair Display, serif",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              maxWidth: "600px",
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </Typography>
        )}

        {buttonText && buttonLink && (
          <Button
            component={Link}
            to={buttonLink}
            variant="outlined"
            size="large"
            sx={{
              color: "white",
              borderColor: "white",
              borderWidth: 2,
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontFamily: "Playfair Display, serif",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "white",
                borderWidth: 2,
                transform: "translateY(-2px)",
                transition: "all 0.3s ease",
              },
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};

// Default props for common usage
HeroSection.defaultProps = {
  backgroundImage: "/images/heroes/hero-1.jpg", // Your spritz.jpeg
};

export default HeroSection;
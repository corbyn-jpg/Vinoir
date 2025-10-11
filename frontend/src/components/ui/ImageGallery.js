import React, { useState } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  IconButton,
  Stack
} from '@mui/material';
import { Close, NavigateBefore, NavigateNext } from '@mui/icons-material';

const ImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const mainImage = images?.[selectedImage] || { url: '/images/placeholder-product.jpg' };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            width: '100%',
            height: 400,
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            backgroundColor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => openLightbox(selectedImage)}
        >
          <img
            src={mainImage.url}
            alt={mainImage.altText || productName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </Box>
      </Box>

      {images && images.length > 1 && (
        <ImageList cols={4} gap={8} sx={{ m: 0 }}>
          {images.map((image, index) => (
            <ImageListItem key={index} sx={{ cursor: 'pointer' }}>
              <Box
                sx={{
                  border: selectedImage === index ? 2 : 1,
                  borderColor: selectedImage === index ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  overflow: 'hidden',
                  height: 80
                }}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image.url}
                  alt={image.altText || `${productName} ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {/* Lightbox Modal */}
      <Modal
        open={lightboxOpen}
        onClose={closeLightbox}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)'
        }}
      >
        <Box sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
          <IconButton
            onClick={closeLightbox}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)'
              }
            }}
          >
            <Close />
          </IconButton>

          {images && images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  zIndex: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)'
                  }
                }}
              >
                <NavigateBefore />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  zIndex: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)'
                  }
                }}
              >
                <NavigateNext />
              </IconButton>
            </>
          )}

          <img
            src={mainImage.url}
            alt={mainImage.altText || productName}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain'
            }}
          />

          {images && images.length > 1 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 2,
                p: 1
              }}
            >
              {images.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: selectedImage === index ? 'primary.main' : 'grey.400',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ImageGallery;
import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button
} from '@mui/material';
import { Clear } from '@mui/icons-material';

const emojiOptions = [
  '😀', '😊', '🥰', '😎', '🤩', '😍', '🤗', '😇', '🥳', '😋',
  '🌹', '🌸', '🌺', '🌷', '💐', '🌼', '🪷', '🌻', '🍀', '🌿',
  '🍃', '🌱', '🌲', '🌳', '🌴', '🌵', '🎄', '🪴', '🍂', '🍁',
  '⭐', '🌟', '✨', '💫', '🌈', '🔥', '💧', '🌊', '☀️', '🌙',
  '🦋', '🐦', '🐬', '🐠', '🦄', '🐝', '🦋', '🐳', '🦢', '🦜',
  '🍎', '🍇', '🍓', '🍊', '🍋', '🍉', '🍒', '🍑', '🥭', '🍍',
  '💎', '🔮', '💍', '👑', '🎀', '🎁', '🎉', '🎊', '🏆', '🥇'
];

const EmojiSelector = ({ 
  selectedEmojis = [], 
  setSelectedEmojis, 
  maxLength = 5,
  disabled = false 
}) => {
  const handleEmojiClick = (emoji) => {
    if (selectedEmojis.length >= maxLength || selectedEmojis.includes(emoji)) return;
    setSelectedEmojis(prev => [...prev, emoji]);
  };

  const handleRemoveEmoji = (index) => {
    setSelectedEmojis(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setSelectedEmojis([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Selected Emojis Display */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Your Emoji Password
        </Typography>
        <Box sx={{ minHeight: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          {selectedEmojis.length > 0 ? (
            selectedEmojis.map((emoji, index) => (
              <Paper
                key={index}
                sx={{
                  position: 'relative',
                  padding: 2,
                  fontSize: '1.5rem',
                  backgroundColor: 'primary.light',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                {emoji}
                {!disabled && (
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveEmoji(index)}
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      backgroundColor: 'error.main',
                      color: 'white',
                      width: 24,
                      height: 24,
                      '&:hover': {
                        backgroundColor: 'error.dark'
                      }
                    }}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                )}
              </Paper>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              No emojis selected yet
            </Typography>
          )}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {selectedEmojis.length} / {maxLength} emojis selected
        </Typography>
        
        {!disabled && selectedEmojis.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleClearAll}
            startIcon={<Clear />}
            sx={{ mt: 1 }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Emoji Grid */}
      <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
        <Grid container spacing={1}>
          {emojiOptions.map((emoji, index) => (
            <Grid item xs={2} sm={1} key={index}>
              <Paper
                elevation={1}
                sx={{
                  padding: 1,
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  cursor: disabled ? 'default' : 'pointer',
                  opacity: disabled ? 0.6 : 1,
                  backgroundColor: selectedEmojis.includes(emoji) ? 'primary.main' : 'background.paper',
                  color: selectedEmojis.includes(emoji) ? 'white' : 'text.primary',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: disabled ? 'none' : 'scale(1.1)',
                    backgroundColor: selectedEmojis.includes(emoji) ? 'primary.dark' : 'grey.100'
                  }
                }}
                onClick={() => !disabled && handleEmojiClick(emoji)}
              >
                {emoji}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Instructions */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
        Select up to {maxLength} emojis to create your unique password
      </Typography>
    </Box>
  );
};

export default EmojiSelector;
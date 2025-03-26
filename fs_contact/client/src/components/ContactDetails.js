import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

const ContactDetails = ({ contact, open, onClose }) => {
  if (!contact) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Contact Details</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {contact.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {contact.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Phone: {contact.phone}
          </Typography>
          {contact.address && (
            <Typography variant="body1" color="text.secondary">
              Address: {contact.address}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactDetails; 
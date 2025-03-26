import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const API_URL = 'http://localhost:5001/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      setError('Failed to fetch contacts. Please try again later.');
      console.error('Error fetching contacts:', error);
    }
  };

  const handleAddContact = async (contact) => {
    try {
      await axios.post(`${API_URL}/contacts`, contact);
      await fetchContacts();
    } catch (error) {
      throw new Error('Failed to add contact. Please try again.');
    }
  };

  const handleUpdateContact = async (id, contact) => {
    try {
      await axios.put(`${API_URL}/contacts/${id}`, contact);
      await fetchContacts();
      setEditingContact(null);
    } catch (error) {
      throw new Error('Failed to update contact. Please try again.');
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      await fetchContacts();
    } catch (error) {
      throw new Error('Failed to delete contact. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Contact Manager
          </Typography>
          
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          
          <ContactForm 
            onSubmit={handleAddContact}
            editingContact={editingContact}
            onUpdate={handleUpdateContact}
            onCancel={() => setEditingContact(null)}
          />

          <ContactList
            contacts={contacts}
            onEdit={setEditingContact}
            onDelete={handleDeleteContact}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

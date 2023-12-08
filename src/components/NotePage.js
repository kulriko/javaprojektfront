import React, { useEffect, useState } from 'react';
import NoteList from './NoteList';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
const cors = require('cors');
const NotePage = ({ token, handleAddNote, username }) => {
  const [notes, setNotes] = useState([]);
  console.log('Token NotePage:', token);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/notes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Current token:', token);
          console.log('Token:', data);
          setNotes(data);
        } else {
          console.log('Current token: nieok', token);
          console.error('Błąd pobierania notatek');
        }
      } catch (error) {
        console.log('Current token: error', error , token);
        console.error('Wystąpił błąd podczas pobierania notatek', error);
      }
    };

    fetchNotes();
  }, [token]);

  const handleAddNoteAndUpdateList = async (note) => {
    try {
      await handleAddNote(note);
      console.log(token);
  
      const response = await fetch('http://localhost:8080/api/v1/notes/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setNotes(data);
      console.log(data);
    } catch (error) {
      console.error('Error adding note and updating list:', error);
    }
  };
  
  
  const handleLogout = () => {
    // Usunięcie tokena uwierzytelniającego (np. token JWT)
    localStorage.removeItem('token');
    // Odświeżenie strony
    window.location.reload();
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#F7D65A' }}>
        <Container>
          <Navbar.Brand>
            <img height="30" className="d-block w-100"
              src={require('../images/logo-no-background.png')}
              alt="NoteIt logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle className = "mb-2" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Button variant="danger" className="text-white fw-bold text-with-outline mt-2 me-2 mb-2" onClick={handleLogout}>
              Wyloguj
              </Button>{' '}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <NoteList
          notes={notes}
          username={username}
          accessToken={token}
          handleAddNote={handleAddNoteAndUpdateList}
        />
      </div>
    </>
  );
};
export default NotePage;

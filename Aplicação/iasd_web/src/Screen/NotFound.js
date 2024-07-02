import React from 'react';
import { styled } from '@mui/system';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@mui/system';

// Keyframes for bouncing animation
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

// Styled components using MUI system
const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const Icon = styled('span')({
  fontSize: '3rem',
  marginBottom: '16px',
  animation: `${bounce} 2s infinite`,
});

const NotFound = () => {
  return (
    <Container>
      <Icon role="img" aria-label="404" style={{
        fontSize: '8rem',
        marginBottom: '16px',
        animation: `${bounce} 2s infinite`,
      
      }}>
        ✝
      </Icon>
      <Typography variant="h4" gutterBottom>
        Opa! parece que essa página não existe...
      </Typography>
      <Typography variant="body1" gutterBottom>
        A página que você está procurando pode ter sido removida, seu nome alterado ou está temporariamente indisponível.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Voltar para a página inicial
      </Button>
    </Container>
  );
};

export default NotFound;

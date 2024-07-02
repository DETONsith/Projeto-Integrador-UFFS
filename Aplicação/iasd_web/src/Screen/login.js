import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try{
      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: data.get('username'),
            password: data.get('password')
        })
    })
    .then(response => {
      if(response.status === 401){
        console.log('Usuário ou senha inválidos');
        setError(true);
        alert('Usuário ou senha inválidos');
        return;
      }
      if(response.status === 500){
        console.log('Erro no servidor');
        setError(true);
        alert('Erro no servidor');
        return;
      }
      if(response.status === 400){
        console.log('Campos faltando');
        setError(true);
        alert('Campos faltando');
        return;
      }
      if(response.status === 200){
        setError(false);
        var data = response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        document.location.href = '/home';
      }
      
    })
    }
    catch(e){
      console.log(e);
      alert('Erro ao tentar fazer login');
    }
    

    
  };

  function spinicon(){
    document.getElementById('icon').style.animation = 'App-logo-spin 2s linear infinite';
  }


  const [errorhappened, setError] = React.useState(false);
  const [errormessage, setErrorMessage] = React.useState('');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: errorhappened?'red':'black'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar no sistema
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome de usuário"
              name="username"
              autoComplete="username"
              autoFocus
              sx={{ outlineColor: errorhappened?'red':'black'}}
              error={errorhappened}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errorhappened}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar usuário"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


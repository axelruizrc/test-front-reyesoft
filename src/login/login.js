import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './login.css';
import logo from '../images/reyesoft-logo.png';
import loginRequest from '../request/request';


const Login = ({ onLogin, setName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    const requestBody = {
      email,
      password 
    };

    try {
      const response = await loginRequest(requestBody);
      console.log('response', response);
      if (!response?.status === "error") {
        setDialogMessage('Credenciales inválidas');
        setOpenDialog(true);
      } else {
        console.log(setName);
        setName(response.name);
        onLogin({ email, password });
        setLoggedIn(true);
        localStorage.setItem('TOKEN', 'true');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setDialogMessage('Error al intentar iniciar sesión');
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  return (
    <div className="login-container">
      <img src={logo} alt="Reyesoft Logo" style={{ width: '100px', height: '150px' }} />

      <form>
        <TextField
          label="Correo electrónico"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin} style={{ backgroundColor: '#FF8000', color: 'white' }}>
          Iniciar Sesión
        </Button>
      </form>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  CircularProgress,
  List,
  Typography,
  Card,
  CardContent,
  Divider,
  Link as MuiLink,
  Button,
} from '@mui/material';

const Systems = ({ isLoggedIn, onLogout, name }) => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCotizaciones = async () => {
      const apiUrl = 'https://api.saldo.com.ar/json/rates/banco';

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('No se pudo obtener las cotizaciones');
        }

        const data = await response.json();
        setCotizaciones(data);
      } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCotizaciones();
  }, []);

  const handleLogout = () => {
    onLogout();
    localStorage.setItem('TOKEN', 'false')
    navigate('/login');
  };

  const handleDetailsToggle = (systemKey) => {
    setSelectedSystem((prevSelectedSystem) =>
      prevSelectedSystem === systemKey ? null : systemKey
    );
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="systems-container">
      <Typography variant="h4" align="center" gutterBottom>
        Cotizaciones
      </Typography>
      {loading ? (
        <CircularProgress style={{ margin: '20px auto', display: 'block' }} />
      ) : (
        <List>
          {Object.entries(cotizaciones).map(([key, value], index) => (
            <Card key={index} variant="outlined" style={{ margin: '10px 0' }}>
              <CardContent>
                <Typography variant="h6">{key}</Typography>
                {selectedSystem === key && (
                  <>
                    <Divider style={{ margin: '10px 0' }} />
                    <Typography variant="body2">Compra: {value.bid}</Typography>
                    <Typography variant="body2">Venta: {value.ask}</Typography>
                    <Typography variant="body2">Moneda: {value.currency}</Typography>
                    <Typography variant="body2">
                      Compra: <MuiLink href={value.bid_url} target="_blank" rel="noopener noreferrer">Más información</MuiLink>
                    </Typography>
                    <Typography variant="body2">
                      Venta: <MuiLink href={value.ask_url} target="_blank" rel="noopener noreferrer">Más información</MuiLink>
                    </Typography>
                    <Button onClick={() => handleDetailsToggle(key)}>Ocultar Detalles</Button>
                  </>
                )}
                {selectedSystem !== key && (
                  <Button onClick={() => handleDetailsToggle(key)}>Ver Detalles</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </List>
      )}
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
      <Typography variant="body1">¡Bienvenido, {name}!</Typography>
        <Button onClick={handleLogout}>Cerrar Sesión</Button>
      </div>
    </div>
  );
};

export default Systems;

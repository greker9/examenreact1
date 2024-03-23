import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const FormularioNotas = () => {
  const [notas, setNotas] = useState({
    primerParcial: '',
    segundoParcial: '',
    tercerParcial: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const validarNota = (nota, maximo) => {
    const valor = parseFloat(nota);
    if (isNaN(valor)) {
      return 'La nota debe ser un número.';
    }
    if (valor < 0 || valor > maximo) {
      return `La nota debe estar entre 0 y ${maximo}.`;
    }
    return '';
  };

  const calcularNotaFinal = () => {
    const notaFinal = 
      parseFloat(notas.primerParcial)  +
      parseFloat(notas.segundoParcial) +
      parseFloat(notas.tercerParcial) /3;

    if (notaFinal < 60) {
      setMensaje('Reprobado');
    } else if (notaFinal <= 80) {
      setMensaje('Bueno');
    } else if (notaFinal <= 90) {
      setMensaje('Muy Bueno');
    } else {
      setMensaje('Sobresaliente');
    }
  };

  const handleChange = (e) => {
    setNotas({ ...notas, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    const errores = {
      primerParcial: validarNota(notas.primerParcial, 30),
      segundoParcial: validarNota(notas.segundoParcial, 30),
      tercerParcial: validarNota(notas.tercerParcial, 40),
    };

    // Verificar si hay errores
    if (errores.primerParcial || errores.segundoParcial || errores.tercerParcial) {
      setError('Por favor, ingrese notas válidas.');
      setMensaje('');
      return;
    }

    setError('');
    calcularNotaFinal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Primer Parcial (máximo 30%)</label>
          <input
            type="number"
            className="form-control"
            name="primerParcial"
            value={notas.primerParcial}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Segundo Parcial (máximo 30%)</label>
          <input
            type="number"
            className="form-control"
            name="segundoParcial"
            value={notas.segundoParcial}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tercer Parcial (máximo 40%)</label>
          <input
            type="number"
            className="form-control"
            name="tercerParcial"
            value={notas.tercerParcial}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Calcular Nota Final</button>
      </form>
      {error && <Alert variant="danger">{error}</Alert>}
      {mensaje && <Alert variant="info">{mensaje}</Alert>}
    </div>
  );
};

export default FormularioNotas;

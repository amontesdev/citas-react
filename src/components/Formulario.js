import React, { Fragment, useState } from "react";
import uuid from "uuid/v4";
import PropTypes from 'prop-types'
const Formulario = ({ crearCita }) => {
  const [cita, updateCita] = useState({
    mascota: "",
    dueño: "",
    fecha: "",
    hora: "",
    sintomas: ""
  });

  const [error, updateError] = useState(false);

  const updateState = e => {
    updateCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  const { mascota, dueño, fecha, hora, sintomas } = cita;

  const submitCita = e => {
    e.preventDefault();
    if (
      mascota.trim() === "" ||
      dueño.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      updateError(true);
      return;
    }
    updateError(false);
    cita.id = uuid();
    crearCita(cita);
    updateCita({
      mascota: "",
      dueño: "",
      fecha: "",
      hora: "",
      sintomas: ""
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      {error ? (
        <p className="alerta-error">Algunos de los campos esta vacio.</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre de Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          onChange={updateState}
          value={mascota}
        />
        <label>Nombre del dueño</label>
        <input
          type="text"
          name="dueño"
          className="u-full-width"
          placeholder="Nombre del dueño"
          onChange={updateState}
          value={dueño}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={updateState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={updateState}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={updateState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}
export default Formulario;

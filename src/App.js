import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
function App() {

  let citasIniciales = JSON.parse(localStorage.getItem("citas"))
  if(!citasIniciales){
    citasIniciales = [] 
  }

  const [citas, savecitas] = useState(citasIniciales);

  const crearCita = cita => {
    savecitas([...citas, cita]);
  };
  const eliminarCita = id =>{
    let citasTemp = citas.filter(cita => cita.id != id)
    savecitas(citasTemp)
  }
  const titulo = citas.length === 0 ? 'No hay citas': 'Administra tus citas';
  useEffect(()=>{
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas',[] )
    }
  }, [citas])
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

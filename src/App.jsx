import { useState, useEffect } from "react";
import { Header, Formulario, ListaPacientes } from "./components";

function App() {

  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes])

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente =>  paciente.id !== id );
    const respuesta = confirm("¿Deseas eliminar este paciente?");
    if(respuesta){
      setPacientes( pacientesActualizados );
    }
  }
  
  return (
   <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario 
          paciente = { paciente }
          pacientes = { pacientes }
          setPacientes = { setPacientes }
          setPaciente = { setPaciente }
        />
        <ListaPacientes 
          pacientes  = { pacientes }  
          setPaciente = { setPaciente }
          eliminarPaciente = { eliminarPaciente } 
        />
      </div>
   </div>
  )
}

export default App

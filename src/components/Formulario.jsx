import { ErrorMessage } from "./ErrorMessage";
import { useEffect, useState } from "react";

export const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [mascota, setMascota] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {

    if(Object.keys(paciente).length > 0 ) {

      const { mascota, propietario, email, fecha, sintomas } = paciente;

      setMascota(mascota);
      setPropietario(propietario);
      setEmail(email);
      setFecha(fecha);
      setSintomas(sintomas);
    }
  }, [paciente])
  
  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha  = Date.now().toString(36);

    return random + fecha 
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if([mascota, propietario, fecha, email, sintomas].includes('') ) {
      console.log('Debes llenar todos los campos');
      setError(true);
      return;
    }
    setError(false);

    const objetoPacientes = {
      mascota, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }
    if( paciente.id ) {
      objetoPacientes.id = paciente.id;
      const pacientesActualizados = pacientes.map( pacienteState => 
        pacienteState.id === paciente.id ? objetoPacientes : pacienteState 
      )
      setPacientes(pacientesActualizados);
      setPaciente({});
      
    }else{
      objetoPacientes.id = generarId();
      setPacientes([...pacientes, objetoPacientes ]);
    }
    
    setMascota('');
    setPropietario('');
    setFecha('');
    setEmail('');
    setSintomas('');
  }
  
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={ handleSubmit }  
      >
        { error && <ErrorMessage error="Todos los campos son obligatorios"/> }

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
        
          <input 
            id="mascota"
            type="text" 
            placeholder="Nombre de la Mascota"  
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ mascota }   
            onChange={ ({target}) => setMascota(target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
        
          <input 
            id="propietario"
            type="text" 
            placeholder="Nombre del Propietario"  
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ propietario }   
            onChange={ ({target}) => setPropietario(target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email Propietario</label>
        
          <input 
            id="email"
            type="email" 
            placeholder="Email del Propietario"  
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ email }   
            onChange={ ({target}) => setEmail(target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
        
          <input 
            id="alta"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ fecha }   
            onChange={ ({target}) => setFecha(target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
        
          <textarea 
            id="sintomas"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ sintomas }   
            onChange={ ({target}) => setSintomas(target.value) }
          />
        </div>

        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value= { paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  )
}

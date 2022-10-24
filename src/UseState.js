import React from "react";


const SECURITY_CODE = 'paradigma';


function UseState({name}){
    const stateDefault = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    };

    /* ESTADOS COMPUESTOS */
    const [state, setState] = React.useState(stateDefault);


    /**
     * Función que establece el estado de error o de confirmación según el parámetro recibido.
     * @param {*} validation True, establece el estado en 'confirmado'. False, establece el estado en 'error'.
     */
    function toggleConfirmErrorState(validation){
        setState({
            ...state, 
            loading: false, 
            error: !validation,
            confirmed: validation
        });
    }


    /**
     * Función que resetea el estado.
     */
    function resetState(){
        setState(stateDefault)
    }


    React.useEffect(()=>{
        console.log('Empezando el efecto')

        // Evita que se cargue esta parte del código en la primera carga
        if (state.loading){
            // Simula el tiempo de espera como si se estuviera esperando una respuesta desde el backend
            setTimeout(() => {
                console.log('VALIDANDO')
                // Actualización semideclarativa del estado.
                toggleConfirmErrorState(state.value === SECURITY_CODE);
                console.log('FIN VALIDACIÓN')
            }, 3000);
        }

        console.log('Finalizando el efecto')
    }, [state.loading]);
    // Se carga el efecto cada vez que se cambie el estado de 'loading'


    let result;

    if (!state.deleted && !state.confirmed){
        result = (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>

                {state.loading ? (<p>Cargando...</p>) : state.error && (<p>ERROR: El código es incorrecto</p>)}

                <input 
                    placeholder="Código de seguridad"
                    value={state.value}
                    // Actualización imperativa del estado
                    onChange={(event)=> setState({
                        ...state, 
                        value: event.target.value
                    })}
                />
                <button
                    // Actualización imperativa del estado
                    onClick={()=> setState({
                        ...state, 
                        loading: true
                    })}
                >
                    Comprobar
                </button>
            </div>
        );
    }
    // Estado de confirmación
    else if (!state.deleted && state.confirmed){
        result = (
            <div>
                <p>¿Seguro que quieres eliminar este {name}?</p>
                <button
                    // Actualización imperativa del estado
                    onClick={()=> setState({
                        ...state,
                        deleted: true
                    })}
                >
                    Sí, eliminar
                </button>
                <button
                    // Actualización semideclarativa del estado.
                    onClick={()=> resetState()}
                >
                    No, volver
                </button>
            </div>
        );
    }
    // Estado de eliminación y recuperación
    else{
        result = (
            <div>
                <h2>Eliminado con éxito</h2>
                <button
                    // Actualización semideclarativa del estado.
                    onClick={()=> resetState()}
                >
                    Restablecer UseState
                </button>
            </div>
        );
    }
    /* ESTADOS COMPUESTOS */


    return result;



    /* ESTADOS SIMPLES
    
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    React.useEffect(()=>{
        console.log('Empezando el efecto')

        // Evita que se cargue esta parte del código en la primera carga
        if (loading){
            // Simula el tiempo de espera como si se estuviera esperando una respuesta desde el backend
            setTimeout(() => {
                console.log('VALIDANDO')
                setError(value !== SECURITY_CODE);
                setLoading(false);
                console.log('FIN VALIDACIÓN')
            }, 3000);
        }

        console.log('Finalizando el efecto')
    }, [loading]);
    // Se carga el efecto cada vez que se cambie el estado de 'loading'


    return(
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>

            {loading ? (<p>Cargando...</p>) : error && (<p>ERROR: El código es incorrecto</p>)}

            <input 
                placeholder="Código de seguridad"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <button
                onClick={()=>{setLoading(true)}}
            >
                Comprobar
            </button>
        </div>
    ); 
    ESTADOS SIMPLES */
}

export {UseState};
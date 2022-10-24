import React from "react";


const SECURITY_CODE = 'paradigma';


/* REDUCER CON ACTION TYPES */
const actionTypes = {
    error: 'ERROR',
    check: 'CHECK',
    confirm: 'CONFIRM',
    reset: 'RESET',
    delete: 'DELETE',
    write: 'WRITE'
};

const reducerObject = (state, payload)=>({
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.check]: {
        ...state,
        error: false,
        loading: true
    },
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.reset]:{
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    },
    [actionTypes.delete]:{
        ...state,
        confirmed: false,
        deleted: true

    },
    [actionTypes.write]:{
        ...state,
        value: payload

    }
});

const reducer = (state, action)=>{
    if (reducerObject(state)[action.type])
        return reducerObject(state, action.payload)[action.type];
    else
        return state;
}


function UseReducer({name}){
    const stateDefault = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    };


    /* ESTADOS COMPUESTOS */
    const [state, dispatch] = React.useReducer(reducer, stateDefault);


    React.useEffect(()=>{
        console.log('Empezando el efecto')

        // Evita que se cargue esta parte del código en la primera carga
        if (state.loading){
            // Simula el tiempo de espera como si se estuviera esperando una respuesta desde el backend
            setTimeout(() => {
                console.log('VALIDANDO')
                // Actualización semideclarativa del estado.
                if (state.value === SECURITY_CODE)
                    dispatch({type:actionTypes.confirm});
                else
                    dispatch({type:actionTypes.error})
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
                    onChange={(event)=> dispatch({type:actionTypes.write, payload:event.target.value})}
                />
                <button
                    onClick={()=> dispatch({type:actionTypes.check})}
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
                    onClick={()=> dispatch({type:actionTypes.delete})}
                >
                    Sí, eliminar
                </button>
                <button
                    onClick={()=> dispatch({type:actionTypes.reset})}
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
                    onClick={()=> dispatch({type:actionTypes.reset})}
                >
                    Restablecer UseState
                </button>
            </div>
        );
    }


    return result;
}

export {UseReducer};
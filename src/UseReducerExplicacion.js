// Para usar un reducer es necesario tener estados compuestos

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
};


// El reducer recibe dos parámetros, el estado compuesto y una acción
// const reducer = (state, action)=>{
// };

// Hay que validar el action.type (action tiene las propiedades type y payload)
const reducerSwitch = (state, action)=>{
    let objResult = {...state};

    // Nos dice cual es el nuevo estado compuesto de la aplicación
    switch (action.type.toUpperCase()) {
        // Se modifica un objeto dependiendo del action.type
        case 'ERROR':
            objResult.error = true;
            objResult.loading = false;
            break;
        // Se modifica un objeto dependiendo del action.type
        case 'CHECK':
            objResult.error = false;
            objResult.loading = true;
            break;
    }

    return objResult;
};


// También se pueden usar objetos para el reducer en lugar de un switch o bloques if-else
// Para esto se divide el reducer en 2, un objeto reducer con los estados y el propio reducer
const reducerObject = (state)=>({
    'ERROR': {
        ...state,
        error: true,
        loading: false
    },
    'CHECK': {
        ...state,
        error: false,
        loading: true
    }
});

// Valida si el action.type existe
const reducer = (state, action)=>{
    if (reducerObject(state)[action.type])
        return reducerObject(state)[action.type];
    else
        return state;
    
}
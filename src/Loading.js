import React from "react";


class Loading extends React.Component{
    // Método del ciclo de vida. Cuando se oculte el componente se realizará esta acción
    componentWillUnmount(){
        console.log('Método WillUnmount');
    }


    render(){
        return(
            <p>Cargando...</p>
        );
    }
}

export {Loading};
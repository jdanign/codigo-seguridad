import React from "react";
import {Loading} from './Loading';


const SECURITY_CODE = 'paradigma';


class ClassState extends React.Component{
    // En los componentes de clases solo se puede crear un estado.
    // Cada propiedad de ese estado si puede hacer de estado independiente para tener varios estados.
    constructor(props){
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false
        }
    }


    // Método del ciclo de vida
    componentDidMount(){
        console.log('Método DidMount');
    }

    // Método del ciclo de vida. Cada vez que el componente se actualice
    componentDidUpdate(){
        console.log('Método DidUpdate');

        if (this.state.loading){
            // Simula el tiempo de espera como si se estuviera esperando una respuesta desde el backend
            setTimeout(() => {
                console.log('VALIDANDO')
                this.setState({loading: false, error: this.state.value !== SECURITY_CODE})
                console.log('FIN VALIDACIÓN')
            }, 3000);
        }
    }


    render(){

        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {this.state.loading ? (<Loading/>) : this.state.error && (<p>ERROR: El código es incorrecto</p>)}
                <input 
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(event)=>{
                        this.setState({value: event.target.value});
                    }}
                />
                <button
                    //onClick={()=>this.setState(prevState =>({error: !prevState.error}))}
                    onClick={()=>this.setState({loading: true})}
                >
                    Comprobar
                </button>
            </div>
        );
    }
}

export {ClassState};
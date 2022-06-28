import { Link } from "react-router-dom";

const RestrictPage = (props) => {
    if (props.isLogged){
        if (props.isVerified){
            return props.children
        }
    }    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%'
        }}>
            <h3>Acesso restrito, faça o seu login. Se já estiver logado, verifique seu email.</h3>
            <Link to="/" className="nav-link">Home</Link>
        </div>
    )    
}

export default RestrictPage
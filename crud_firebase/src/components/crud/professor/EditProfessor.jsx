import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
import FirebaseContext from "../../../utils/FirebaseContext";
//import axios from "axios";

import RestrictPage from "../../../utils/RestrictPage";


const EditProfessorPage = ({ setShowToast, setToast }) =>
<FirebaseContext.Consumer>
{(firebase) => {
        return(
            <RestrictPage isLogged = {firebase.getUser() != null} isVerified = {firebase.getUser() != null && firebase.getUser().emailVerified != false} >
                <EditProfessor
                    firebase={firebase} 
                    setShowToast={setShowToast}
                    setToast = {setToast} />
            </RestrictPage>    
        )
        }}
</FirebaseContext.Consumer>

function EditProfessor(props) {

    const [name, setName] = useState("")
    const [university, setUniversity] = useState("")
    const [degree, setDegree] = useState("Graduado")
    const [validate, setValidate] = useState({ name: '', course: '', ira: '' })
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            /*
            axios.get(`http://localhost:3002/crud/professors/retrieve/` + params.id)
            .then(
                (response) => {
                setName(response.data.name)
                setUniversity(response.data.university)
                setDegree(response.data.degree)
                }
            )
            .catch((error) => console.log(error))
            */
            FirebaseProfessorService.retrieve_promise(
                props.firebase.getFirestoreDb(),
                (professor) => {
                    setName(professor.name)
                    setUniversity(professor.university)
                    setDegree(professor.degree)
                },
                params.id
            )
        }, [params.id, props.firebase]
    )
    
    const validateFields = () => {
        let res = true
        setValidate({name:'',university:'', degree:''})

        if(name === '' || university === '' || degree === ''){
            props.setToast({header:'Erro!',body:'Preencha todos os campos.'})
            props.setShowToast(true)
            setLoading(false)
            res = false
            let validateObj = {name:'',university:'',degree:''}
            if(name === '') validateObj.name = 'is-invalid'
            if(university === '') validateObj.university = 'is-invalid'
            if(degree === '') validateObj.degree = 'is-invalid'
            setValidate(validateObj)
        }
        return res
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        if(!validateFields()) return
        const updatedProfessor = { name, university, degree }
        /*
        axios.put(`http://localhost:3002/crud/professors/update/`+ params.id, updatedProfessor)
        .then (
           (response) => navigate("/listProfessor")
        )
        .catch((error) => console.log(error))
        */
        FirebaseProfessorService.update(
            props.firebase.getFirestoreDb(),
            () => {
                props.setToast({ header: 'Sucesso!', body: `Professor ${name} editado com sucesso` })
                props.setShowToast(true)
                navigate("/listProfessor")
            },
            params.id,
            updatedProfessor)
    }

    const renderSubmitButton = () => {
        if (loading) {
            return (
                <div style={{ paddingTop: 20 }}>
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span style={{ marginLeft: 10 }}>Carregando...</span>
                    </button>
                </div>
            )
        }
        return (
            <>
                <div className="form-group" style={{ paddingTop: 20 }}>
                    <input type="submit" value="Efetuar Edição" className="btn btn-primary" />
                </div>
            </>
        )
    }


    return (
        <>
            <main>
                <h2>
                    Editar Professor
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            className={`form-control ${validate.name}`}
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Universidade: </label>
                        <input type="text"
                            className={`form-control ${validate.university}`}
                            value={university ?? ""}
                            name="university"
                            onChange={(event) => { setUniversity(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Titulação: </label>
                        <input type="text"
                            className={`form-control ${validate.degree}`}
                            value={degree ?? 0}
                            name="degree"
                            onChange={(event) => { setDegree(event.target.value) }} />
                    </div>
                    {renderSubmitButton()}
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default EditProfessorPage
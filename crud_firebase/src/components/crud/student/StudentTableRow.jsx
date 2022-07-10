import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FirebaseService from "../../../services/FirebaseStudentService";

const StudentTableRow = (props) => {
    const {_id,name,course,ira} = props.student
    const [loading, setLoading] = useState(false)

    function deleteStudent() {
        setLoading(true)
        if (window.confirm(`Deseja excluir o elemento de ID: ${_id}?`)) {
            //axios.delete(`http://localhost:3001/students/${_id}`)
            /*axios.delete(`http://localhost:3002/crud/students/delete/${_id}`)
                .then(response => props.deleteStudentById(_id))
                .catch(error => console.log(error))*/
            FirebaseService.delete(
                props.firestore,
                ()=>{
                    setLoading(false)
                    props.setToast({ header: 'Sucesso!', body: 'Estudante ' + _id + ' apagado com sucesso!', bg:'success'})
                    props.setShowToast(true)
                },
                _id
            )

        }
    }

    const renderSubmitButton = () => {
        if (loading) {
            return (
                
                    <button className="btn btn-danger" type="button" disabled style={{width:'75px'}}>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        
                    </button>
                
            )
        }
        return (
             
                <button className="btn btn-danger" style={{width:'75px'}}  onClick={() => deleteStudent()}>Apagar</button>
            
        )
    }


    return (
        <tr>
            <td>
                {_id}
            </td>
            <td>
                {name}
            </td>
            <td>
                {course}
            </td>
            <td>
                {ira}
            </td>
            <td style={{textAlign:"center"}}>
                <Link to={`/editStudent/${_id}`} className="btn btn-primary">Editar</Link>
            </td>
            <td style={{textAlign:"center"}}>
                {renderSubmitButton()}
            </td>
        </tr>
    )
}

export default StudentTableRow
import { useState,useRef, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import employeeService from "../services/employee.service";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const AddEmployeeFormStrap = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');

    const [errorEmployee, setErrorEmployee] = useState({ email: '' });

    const [validateName, setValidateName] = useState('');
    const history = useHistory();
    const { id } = useParams();
    const emailField=useRef(null);

    const otherField=useRef(null);

    const patchEmployee = (e) => {

        employeeService.patch(1).then(response => {
            console.log('Employee data patch successfully', response.data);
            history.push('/');
        })
        .catch(error => {
            console.log('Something went wrong', error);
        }) 
    };

    const saveEmployee = (e) => {
        // e.preventDefault();\
        const emailValidationValue = emailValidation();

        if (emailValidationValue === true) {

            const employee = { name, location, email, id };
            if (id) {
                //update
                employeeService.update(employee)
                    .then(response => {
                        console.log('Employee data updated successfully', response.data);
                        history.push('/');
                    })
                    .catch(error => {
                        console.log('Something went wrong', error);
                    })
            } else {
                //create
                employeeService.create(employee)
                    .then(response => {
                        console.log("employee added successfully", response.data);
                        history.push("/");
                    })
                    .catch(error => {
                        console.log('something went wroing', error);
                    })
            }
        }
    }
    /* get errorEmployee and update value passed for ex email: 'wrong email' */
    const updateErrors = (updatedValue) => {
        setErrorEmployee(errorEmployee => ({
            ...errorEmployee,
            ...updatedValue
        }));

    }


    const emailValidation = () => {


        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let updatedValue = { email: '' };
        updateErrors(updatedValue);


            if (!email || re.test(email) === false) {


                updatedValue = { email: 'wrong email' };
                updateErrors(updatedValue);
                handlerFocus();
         
                return false;
            }
        
        return true;
    };


    const handlerFocus = () => {
        if (!emailField || !emailField.current) { return; }

            emailField.current.focus();// Good!
            const timer = setTimeout(() => {
                otherField.current.focus();
              }, 3000);
              return () => clearTimeout(timer);
      };
    
    useEffect(() => {

        if (id) {
            employeeService.get(id)
                .then(employee => {
                    setName(employee.data.name);
                    setLocation(employee.data.location);
                    setEmail(employee.data.email);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])
    return (
        <div className="container">
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
                    <h2>Add Employee</h2>
                </Col>
            </Row>
            <hr />

            <Row className="mt-4">
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input name="name" id="name" type="text" value={name} placeholder="Enter name"
                                onChange={(e) => {
                                    if (e.target.value && e.target.value !== "") {
                                        setValidateName("has-success'");
                                    } else {
                                        setValidateName("has-danger'");
                                    }
                                    setName(e.target.value)
                                }
                                }
                            ></Input>
                            <Label for="name">{validateName}</Label>

                        </FormGroup>

                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input name="location" id="location" type="text" value={location} placeholder="Enter location" onChange={(e) => setLocation(e.target.value)}></Input>

                        </FormGroup>


                        <FormGroup className={errorEmployee && errorEmployee.email!==''? 'errorClass' : 'okClass'}>
                            <Label for="email">Location</Label>
                            <Input name="email" innerRef={emailField} id="email" type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}></Input>
                            <Label for="email"   >{errorEmployee && errorEmployee.email ? errorEmployee.email : ''}</Label>
                        </FormGroup>
                        <input type="text" ref={otherField}></input>
                        <Button onClick={(e) => saveEmployee(e)}>Submit</Button><div >
                    <button onClick={(e) => patchEmployee(e)} className="btn btn-primary">Patch</button>
                </div>
                    
                    </Form></Col></Row>





            <hr />
            <Link to="/">Back to List</Link>
        </div>
    )
}

export default AddEmployeeFormStrap;
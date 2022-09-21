import React, { useState } from 'react';
import Link from 'next/link';
import {useSession,signIn,signOut} from "next-auth/react"
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { 
    Button 
} from '@material-ui/core';
import TextField from '@mui/material/TextField';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyDcg95HwW9HTWD30oL2nM8VmuZwikEPxmE",
        authDomain: "fcoin-login.firebaseapp.com",
        projectId: "fcoin-login",
        storageBucket: "fcoin-login.appspot.com",
        messagingSenderId: "959411497554",
        appId: "1:959411497554:web:f8a315f7a0ec7d4d83cd8b",
        measurementId: "G-YTFX5CJ8JC"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      async function handleGoogleSignin() {         
        //signIn('google',{callbackUrl:"http://localhost:3000/"})
      }
  return (
    <MDBContainer fluid className="p-3 my-5">

        <MDBRow className='w-100 d-flex justify-content-center'>
            <MDBCol col='2' sm='4'>
            <img src="https://elements-video-cover-images-0.imgix.net/files/c8a5bb5a-ce5f-42a9-b0e3-60dbb242dbd6/inline_image_preview.jpg?auto=compress%2Cformat&fit=min&h=225&w=400&s=d01c608792d79d4d41237ff1eab46155" class="img-fluid" style={{height:700}} alt="Phone image" />
            </MDBCol>
            <MDBCol col='3' sm='4'>

                <div className='d-flex flex-row mt-2'>
                    <img className="mx-2" src="https://raw.githubusercontent.com/FcoinCrypto/Fcoin/main/logo/1024x1024fcoin.png" style={{width:60,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                    <span className="h1 fw-bold mb-0">Fcoin</span>
                </div>

                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Connectez-vous à votre compte ou inscrivez-vous</h5>

                <Button 
                    style={{
                        borderRadius: 35,
                        backgroundColor: "#00853d",
                        color:"white"
                    }}
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    onClick={handleGoogleSignin()}
                > 
                    <img className="mx-2" src="https://cdn-icons-png.flaticon.com/512/2504/2504739.png" style={{width:20,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />
                    Se connecter avec google
                </Button> 

                <br/><br/>

                <Button 
                    style={{
                        borderRadius: 35,
                        backgroundColor:"#1f80b3"
                    }}
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    
                > 
                    <img className="mx-2" src="https://cdn-icons-png.flaticon.com/512/124/124010.png" style={{width:20,backgroundColor:'white',borderRadius:50}} alt="Facebook image" />Se connecter avec facebook
                </Button> 

                <br/><br/>
                <Link href="api/hello">
                    <a>Auth</a>
                </Link>
                <br/><br/>
                <Formik 
                        enableReinitialize 
                        initialValues={{ 
                            email: '', 
                            password: '' 
                        }} 
                        validationSchema={Yup.object().shape({ 
                            email: Yup.string().email('Merci de corriger votre Email').required('Merci de renseigner votre Email'), 
                            password: Yup.string().min(5, 'Your password must contain between 4 and 60 characters.').max(60, 'Your password must contain between 4 and 60 characters.').required('Merci de renseigner votre mot de passe'), 
                        })} 
                        onSubmit={async (values, { 
                            resetForm, 
                            setErrors, 
                            setStatus, 
                            setSubmitting 
                        }) => { 
                            try { 
                                // NOTE: Make API request 
                                // await wait(200); 
                                resetForm(); 
                                setStatus({ success: true }); 
                                setSubmitting(false); 
                                console.log("test",values) 
                            } catch (err) { 
                                console.error(err); 
                                setStatus({ success: false }); 
                                setErrors({ submit: err.message }); 
                                setSubmitting(false); 
                            } 
                        }} 
                    > 
                        {({ 
                            errors, 
                            handleBlur, 
                            handleChange, 
                            handleSubmit, 
                            isSubmitting, 
                            touched, 
                            values 
                        }) => (
                        <form onSubmit={handleSubmit}> 
                        <TextField 
                            error={Boolean(touched.email && errors.email)} 
                            helperText={touched.email && errors.email} 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.email} 
                            fullWidth 
                            label="Email" 
                            name="email" 
                            required 
                            variant="outlined"
                        />
                        <div></div>
                        <TextField 
                            error={Boolean(touched.password && errors.password)} 
                            helperText={touched.password && errors.password} 
                            type="password" 
                            onBlur={handleBlur} 
                            onChange={handleChange} 
                            value={values.password} 
                            fullWidth
                            style={{marginTop : 23, marginBottom : 23}}
                            label="Password" 
                            name="password" 
                            required 
                            variant="outlined"             
                        />


                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div>

                            <div className='text-center'>
                            <Button
                                style={{
                                    borderRadius: 35,
                                    backgroundColor: "#1f80b3",
                                }} 
                                fullWidth 
                                variant="contained" 
                                color="primary" 
                                disabled={isSubmitting} 
                                type="submit" 
                            > 
                                Se connecter 
                            </Button> 
                            </div> 
                            </form>
                    )}
                </Formik> 
            </MDBCol>
        </MDBRow>

    </MDBContainer>
  );
}

export default App;

export const getServerSideProps = async (email,password) => { 
    
      const options = {
        method: "POST",    
      };
     const res = await fetch('http://localhost:1337/api/user-logins/2',options); 
    console.log('res'); 
    return { props: { data : res } }; 
  };
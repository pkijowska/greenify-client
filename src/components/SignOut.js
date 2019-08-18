import React from 'react';
import { Redirect } from 'react-router-dom'

const SignOut = () => {
  localStorage.removeItem('jwt');
  return <Redirect to='/signin' />
}

export default SignOut;

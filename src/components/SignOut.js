import React from 'react';
import { Redirect } from 'react-router-dom'

const SignOut = () => {
  localStorage.removeItem('jwt');
  window.location.reload();
  return <Redirect to='/signin' />
}

export default SignOut;

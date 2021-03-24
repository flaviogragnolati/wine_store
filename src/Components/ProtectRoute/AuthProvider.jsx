import React, { useEffect } from 'react';
import { tryToLoginStatusSelector } from '../../selectors';
import { AuthContext } from './authContext';
import { useDispatch, useSelector } from 'react-redux';
import { tryToLogin } from '../../slices/tokenSlice';
import { Container, CircularProgress } from '@material-ui/core';
import { userLoginStatusSelector } from '../../selectors/index';

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const userStatus = useSelector(userLoginStatusSelector);
  const tryToLoginStatus = useSelector(tryToLoginStatusSelector); //idle

  const isLogged = () => {
    if (tryToLoginStatus === 'idle') {
      dispatch(tryToLogin());
    }
  };

  useEffect(() => {
    isLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryToLoginStatus, dispatch]);

  if (tryToLoginStatus === 'loading' || userStatus === 'loading') {
    return (
      <Container>
        <CircularProgress />
        <CircularProgress />
        <CircularProgress />
        <CircularProgress />
        <CircularProgress />
        <CircularProgress />
      </Container>
    );
  } else if (tryToLoginStatus !== 'succeded') {
    return (
      <AuthContext.Provider value={false}>{children}</AuthContext.Provider>
    );
  } else if (tryToLoginStatus === 'succeded') {
    return <AuthContext.Provider value={true}>{children}</AuthContext.Provider>;
  }

  return null;
}

export default AuthProvider;

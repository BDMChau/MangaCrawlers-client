import React from 'react'
import SignInService from './pages/SignIn/SignInService'
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <SignInService />
    </Provider>
  )
}

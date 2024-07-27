'use client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from '../redux/store'

const WithRedux = (WrappedComponent) => {


 

    return () => {

      return (<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <WrappedComponent />
          </PersistGate>
          </Provider>)
    } 
  
};

export default WithRedux;

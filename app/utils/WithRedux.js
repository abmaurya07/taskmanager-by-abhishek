'use client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from '../redux/store'

const WithRedux = ({children}) => {


 

    return   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        </PersistGate>;
        </Provider>
  
};

export default WithRedux;

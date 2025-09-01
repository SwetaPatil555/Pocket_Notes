import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createTheme, MantineProvider } from "@mantine/core";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "@mantine/core/styles.css";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

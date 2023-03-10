import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ModalProvider, Modal } from './context/Modal';
import { TagsMenuProvider } from './context/TagMenu';
import  FilterProvider  from './context/Filter';
import configureStore from './store';

const store = configureStore();

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ModalProvider>
      <FilterProvider>
      <TagsMenuProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
      </TagsMenuProvider>
      </FilterProvider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
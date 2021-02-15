import React from 'react';
import ReactDOM from 'react-dom';
import  {BrowserRouter}  from 'react-router-dom'

import MainRouter from './routes/MainRouter';

ReactDOM.render(
  <BrowserRouter>

     <MainRouter />
     
  </BrowserRouter>
   
    
,
  document.getElementById('root')
);

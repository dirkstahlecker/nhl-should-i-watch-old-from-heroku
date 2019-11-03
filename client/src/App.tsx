import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {

  private async getData(): Promise<any> //TODO
  {
    const response = await fetch('/api/hello');
    console.log(response);
    return response;
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Data found from server: 
          {
            this.getData()
          }
        </p>
      </div>
    );
  }
}

export default App;

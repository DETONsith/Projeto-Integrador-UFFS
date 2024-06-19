import logo from './logo.svg';
import './App.css';
import CustomizedTables from './Components/componente_de_teste';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CustomizedTables></CustomizedTables>
        <p>
          Teste acima os componentes que você vai criar em <b>iasd_web/src/Components</b>
        </p>
      </header>
    </div>
  );
}

export default App;

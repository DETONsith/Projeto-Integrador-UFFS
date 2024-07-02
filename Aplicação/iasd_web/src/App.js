import logo from './logo.svg';
import './App.css';
import CustomizedTables from './Components/componente_de_teste';
import CustomizedRegistration from './Components/registro';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CustomizedTables></CustomizedTables>
        <CustomizedRegistration></CustomizedRegistration>
        <p>
          Teste acima os componentes que você vai criar em <b>iasd_web/src/Components</b>
        </p>
      </header>
    </div>
  );
}

export default App;

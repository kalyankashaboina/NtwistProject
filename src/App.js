import logo from './logo.svg';
import './App.css';
import EmployeeTable from './Components/main';
import EmployeeForm from './Components/form';
import NavigateComponent from './Components/navigate';

function App() {

  const employees = [
    { name: 'John Doe', position: 'Software Engineer' },
    { name: 'Jane Smith', position: 'Product Manager' },
    { name: 'Sara Wilson', position: 'UX Designer' },
  ];
  return (
    <div className="App">
      {/* <EmployeeTable employees={employees} />
      <EmployeeForm/> */}

      <NavigateComponent/>
    </div>
  );
}

export default App;

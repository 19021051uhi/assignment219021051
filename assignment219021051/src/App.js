import './App.css';

function PeopleList(){

  const people = [

    {name: 'amir'},
    {name: 'azadeh'},
    {name: 'zahra'}

  ]

  return(

    <ol>
      {people.map((person) => <li key={person.name}>{person.name}</li>)}
    </ol>

  )
}

function App() {
  return (
    <div className="App">
      <PeopleList />
    </div>
  );
}


export default App;

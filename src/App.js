import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
// import logo from "./logo.svg";
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filtermonsters, setfiltermonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newfiltermonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setfiltermonsters(newfiltermonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder={'search monsters'}
      />

      <CardList monsters={filtermonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {
//             return { monsters: users };
//           },
//           () => {}
//         )
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();

//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     console.log('Erorr😗');
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     const filtermonster = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (

//       <div className="App">
//         <h1 className="app-title">monster rolodex</h1>
//         <SearchBox
//           className="monsters-search-box"
//           onChangeHandler={onSearchChange}
//           placeholder={"search monsters"}
//         />
//         <CardList monsters={filtermonster} />
//       </div>
//     );
//   }
// }

export default App;

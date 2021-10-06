import { useContext } from "react";
import uuid from "react-uuid";
import axios from 'axios';
import { AppStateContext } from "../appState/appState.context";
import { CardList } from "../cardList/cardList";
import "./homepage.css";

const HomePage = () => {
  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;
  let updatedState = [...appState];
  //let updatedState;

  const storedState = JSON.parse(localStorage.getItem("userData"));
  if (updatedState.length) updatedState = storedState.state;

  const handleListAdd = () => {
    //updatedState.push({ id: uuid(), title: "", cards: [] });
    axios.post('http://localhost:8080/feed/add-list')
    .then((res) => {
      console.log(res.data)
      updatedState = res.data.lists;
      dispatch({ type: "addList", value: updatedState });
     }).catch((error) => {
      console.log(error)
     });
   // dispatch({ type: "addList", value: updatedState });
  //    axios.get('http://localhost:8080/feed')
  //    .then(res => {
  //     dispatch({ type: "addList", value:res });
  //    })
  //    .catch((error) => {
  //     console.log(error)
  // });

  };

  return (
    <div className="homepage-container">
      <button className="listadd-btn" onClick={handleListAdd}>
        Add List
      </button>
      <div className="cardlist-container">
        {updatedState.map((cardlist) => (
          <CardList
            key={cardlist._id}
            cardlist={cardlist}
            cardlistIdx={cardlist._id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

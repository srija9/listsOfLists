import React, { useContext } from "react";
import uuid from "react-uuid";
import axios from 'axios';
import { TaskCard } from "../taskCard/taskCard";
import { AppStateContext } from "../appState/appState.context";
import "./cardList.css";

export const CardList = ({ cardlist}) => {
  const { tasks, title } = cardlist;
  const { stateAndDispatch } = useContext(AppStateContext);

  const [appState, dispatch] = stateAndDispatch;
  let updatedState = [...appState];
  const handleCardAdd = () => {
    // 
    axios.post('http://localhost:8080/feed/add-task/'+cardlist._id, { title: " ", description:" "})
    .then((res) => {
      console.log(res.data)
      updatedState = res.data.lists;
      dispatch({ type: "addCard", value: updatedState });
     }).catch((error) => {
      console.log(error)
     });
   // dispatch({ type: "addCard", value: updatedState });
  };

  const handleListRemove = () => {
    //updatedState.splice(cardlistIdx, 1);
    axios.post('http://localhost:8080/feed/delete-list/'+cardlist._id)
    .then((res) => {
      console.log(res.data)
      updatedState = res.data.lists;
      dispatch({ type: "removeList", value: updatedState });
     }).catch((error) => {
      console.log(error)
     });
    //dispatch({ type: "removeList", value: updatedState });
  };

  const handleListTitleChange = (e) => {
   // updatedState[cardlistIdx].title = e.target.value;
   axios.post('http://localhost:8080/feed/update-list/'+cardlist._id, {title:e.target.value})
    .then((res) => {
      console.log(res.data)
      updatedState = res.data.lists;
      dispatch({ type: "addListTitle", value: updatedState });
     }).catch((error) => {
      console.log(error)
     });
   // dispatch({ type: "addListTitle", value: updatedState });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, cardlist) => {
    const cardInsIdx = e.dataTransfer.getData("cardIdx");
    const cardlistInsIdx = e.dataTransfer.getData("cardListIdx");
    let insIdx = updatedState.findIndex(
      (listObj) => listObj.id === cardlist.id
    );
    insIdx = insIdx === -1 ? 0 : insIdx;
    updatedState[insIdx].cards.unshift(
      updatedState[cardlistInsIdx].cards[cardInsIdx]
    );

    updatedState[cardlistInsIdx].cards.splice(cardInsIdx, 1);
    dispatch({ type: "moveTask", value: updatedState });
  };

  return (
    <div
      className="card-list c-l-m"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, cardlist)}
    >
      <input
        className="card-list-name c-l-n-m"
        onChange={handleListTitleChange}
        placeholder="card list name"
        value={title}
      />
      <button className="listadd-btn l-b-m" onClick={handleListRemove}>
        Remove List
      </button>
      <span className="card-number c-n-m">
        {/* {updatedState[cardlist._id].tasks.length} */}
        {cardlist.tasks.length}
      </span>
      <div className="card-list-container c-l-c-m">
        {tasks.map((card, arr) => (
          <TaskCard
            key={card._id}
            card={card}
           // cardIdx={card._id}
             cardlistIdx={cardlist._id}
          />
        ))}
      </div>
      <button className="card-add-btn c-a-b-m" onClick={handleCardAdd}>
        +
      </button>
    </div>
  );
};

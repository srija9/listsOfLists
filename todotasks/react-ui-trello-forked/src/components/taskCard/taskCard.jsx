import { useContext } from "react";
import { AppStateContext } from "../appState/appState.context";
import "./taskCard.css";
import axios from 'axios';

export const TaskCard = ({ card, cardIdx, cardlistIdx }) => {
  const { title, description } = card;
  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;
  let updatedState = [...appState];

  const handleCardRemove = () => {
    // updatedState[cardlistIdx].cards.splice(cardIdx, 1);
    // dispatch({ type: "removeCard", value: updatedState });
    axios.post('http://localhost:8080/feed/delete-task/'+cardlistIdx+'/'+card._id)
    .then((res) => {
      console.log(res.data)
      updatedState = res.data.lists;
      dispatch({ type: "cardInput", value: updatedState });
     }).catch((error) => {
      console.log(error)
     });
  };

  const handleCardInput = (e) => {
    //updatedState[cardlistIdx].cards[cardIdx][e.target.name] = e.target.value;
    axios.post('http://localhost:8080/feed/update-task/'+card._id, e.target.name == "title" ? {title:e.target.value} :{description:e.target.value} )
    .then((res) => {
      console.log(res.data)
      updatedState = res.data.lists;
      dispatch({ type: "cardInput", value: updatedState });
     }).catch((error) => {
      console.log(error)
     });
   //dispatch({ type: "cardInput", value: updatedState });
  };

  const onDragStart = (e, taskObj) => {
    e.dataTransfer.setData("obj", taskObj.id);
    e.dataTransfer.setData("cardIdx", cardIdx);
    e.dataTransfer.setData("cardListIdx", cardlistIdx);
  };
  return (
    <div
      className="task-card t-c-m"
      onDragStart={(e) => onDragStart(e, card)}
      draggable
    >
      <button className="card-remove-btn c-r-b" onClick={handleCardRemove}>
        X
      </button>
      <br></br>
      <label>Title</label>
      <input
        name="title"
        onChange={handleCardInput}
        className="task-title t-t-m"
        value={title}
        placeholder="title"
      />
      <br></br>
      <label>Description</label>
      <textarea
        rows="4"
        cols="15"
        name="description"
        onChange={handleCardInput}
        className="task-description t-d-m"
        value={description}
        placeholder="description"
      ></textarea>
      <br></br>
    </div>
  );
};

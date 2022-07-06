import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodos,
  fetchTodos,
  patchTodos,
  postTodos,
} from "../../features/toDoReducer";
import style from "./main.module.css";
import CircularProgress from '@mui/material/CircularProgress';

const Main = () => {
  const toDos = useSelector((state) => state.toDos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (text !== "" && text[0] !== " ") {
      dispatch(postTodos(text));
    }
    setText("");
  };

  const handleRemove = (id) => {
    dispatch(deleteTodos(id));
  };

  const handleCompleted = (id, compleate) => {
    dispatch(patchTodos({ id, compleate }));
  };

  const loadItem = toDos.map((load) => load.text);

  return (
    <main>
      <div className={style.input_cont}>
        <form onSubmit={(e) => handleAddClick(e)}>
          <input type="text" onChange={(e) => handleText(e)} value={text} />
          <button className={style.add_btn} onClick={handleAddClick}>
            Добавить
          </button>
        </form>
      </div>
      <div className={style.addList}>
        <div>{error}</div>
        {loading ? <CircularProgress /> : null}
        {toDos.map((item, id) => {
          return (
            <div key={id} className={style.todo}>
              <button
                className={
                  item.compleate
                    ? style.completedNotActive
                    : style.completedActive
                }
                onClick={() => handleCompleted(item._id, item.compleate)}
              >
                ★
              </button>
              {item.text}
              <button onClick={() => handleRemove(item._id)}>X</button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Main;

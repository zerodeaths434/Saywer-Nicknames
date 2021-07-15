import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";

const url = "https://sawyernicknames.herokuapp.com/questions";
const nicknames = "https://sawyernicknames.herokuapp.com/nicknames";

const AppContext = React.createContext();

let answerArray;

let result = "";

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [nickname, setNickname] = useState([]);
  const [count, setCount] = useState(0);

  const fetchData = async (nicknames) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(nicknames).catch((err) => console.log(err));
    if (response) {
      const data = response.data;
      answerArray = Object.keys(data[0]);
      console.log(answerArray);
      if (data.length >= 0) {
        setNickname(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.questions;
      if (data.length > 0) {
        setQuestion(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkCharacter = (value) => {
    if (questions.length - count > 1) {
      let filteredArray = nickname.filter(
        (item) => item[answerArray[count + 1]].indexOf(value) !== -1
      );
      setNickname(filteredArray);
      setCount(count + 1);
      console.log(nickname);
      console.log(count);
      nextQuestion();
    } else {
      getResult();
    }
  };

  const getResult = () => {
    const randomIndex = Math.floor(Math.random() * nickname.length);
    if (nickname.length > 0) {
      result = `Your Sawyer Nickname is ${nickname[randomIndex].nickname}\n`;
    } else {
      result = "Your Sawyer Nickname is Gay";
    }
    nextQuestion();
    console.log(result);
  };

  const openModal = () => {
    setIsModelOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    fetchQuestions(url);
    fetchData(nicknames);
    setCount(0);
    setIsModelOpen(false);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const user = {
        name: name,
      };
      axios
        .post("https://sawyernicknames.herokuapp.com/user", user)
        .then((res) => console.log(res.data));
      if (name) {
        fetchQuestions(url);
        fetchData(nicknames);
        setError(false);
      } else {
        setError(true);
      }
    },
    [name]
  );

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        error,
        name,
        result,
        isModalOpen,
        setName,
        checkCharacter,
        nextQuestion,
        closeModal,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

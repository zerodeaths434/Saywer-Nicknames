import React from "react";
import Home from "./form";
import Modal from "./modal";
import Loading from "./Loading";
import { useGlobalContext } from "./context";

function App() {
  const {
    waiting,
    questions,
    loading,
    index,
    nextQuestion,
    checkCharacter,
  } = useGlobalContext();

  if (waiting) {
    return <Home />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, options } = questions[index];
  return (
    <main>
      <div className="sawyer"></div>
      <Modal />
      <section className="quiz">
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {options.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkCharacter(answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        {/*<button className="next-question" onClick={nextQuestion}>
          next question
        </button>*/}
      </section>
    </main>
  );
}

export default App;

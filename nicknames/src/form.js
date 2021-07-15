import React from "react";
import { useGlobalContext } from "./context";

function Home() {
  const { name, setName, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <div className="sawyer"></div>
      <div className="heading">SAWYER NICKNAME GENERATOR</div>
      <section>
        <form onSubmit={handleSubmit} className="form">
          <div className="title">ENTER YOUR NAME</div>
          <div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="omg">
            <button type="submit" onClick={handleSubmit} className="submit-btn">
              Submit
            </button>
          </div>
          <div className={error ? "noErrorMessage" : "errorMessage"}>
            SAWYER NEEDS TO KNOW YOUR NAME TO GIVE YOU A NICKNAME
          </div>
        </form>
      </section>
    </main>
  );
}

export default Home;

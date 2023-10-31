import styles from "./index.module.css";
import sqlLogo from "./assets/sql-logo.png";

import { useState } from "react";

const App = () => {
  const [queryDescription, setQueryDescription] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  const handleInputChange = (e) => setQueryDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generatedSqlQuery = await generateQuery();
    setSqlQuery(generatedSqlQuery);
  };

  const generateQuery = async () => {
    const response = await fetch(
      "https://sql-query-creator.onrender.com/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryDescription: queryDescription }),
      }
    );

    const data = await response.json();
    return data.response.trim();
  };

  return (
    <main className={styles.main}>
      <img src={sqlLogo} alt='logo of sql database' className={styles.icon} />
      <h3>Generate SQL query with AI</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='queryDescription'
          placeholder='Describe your query'
          onChange={handleInputChange}></input>
        <input type='submit' value='Generate your query'></input>
      </form>
      <pre>{sqlQuery}</pre>
    </main>
  );
};

export default App;
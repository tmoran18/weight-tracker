import React, { useState, useEffect } from "react";
import firebase, { auth, provider } from "./firebase.js";
import { addDays, addWeeks, format, compareAsc } from "date-fns";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Submit from "./components/Submit";
import LineGraph from "./components/LineGraph";
import axios from "axios";
import "./App.css";

function App() {
  const startDate = new Date("2020/07/20");
  const dateFormat = "dd/MM";
  const [weight, setWeight] = useState(null);
  const [pushups, setPushUps] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [weekIndex, setWeekIndex] = useState(null);

  // Onload get
  useEffect(() => {
    auth.onAuthStateChanged((user) => user && setUser(user));
    const weeksRef = firebase.database().ref("weeks");
    weeksRef.on("value", (snapshop) => {
      let weeks = snapshop.val();
      let dbData = [];
      // Get the length of data in DB
      const weeksLength = Object.keys(weeks);
      setWeekIndex(weeksLength.length);
      buildGraphData(weeks);
    });
  }, []);

  // Build an object to pass to the Line Graph
  const buildGraphData = (weeks) => {
    const graphData = [
      {
        id: "weight tracker",
        color: "#00b2ff",
        data: [],
      },
    ];
    const arrToSort = [];
    // Loop over the data objects
    Object.entries(weeks).forEach((entry) => {
      arrToSort.push(entry[1]);
    });

    const sortedArr = sortArr(arrToSort);
    sortedArr.forEach((element, index) => {
      // First element, give start date and first weight
      console.log(element);
      index === 0
        ? graphData[0].data.push({
            x: format(startDate, dateFormat),
            y: element.weight,
          })
        : // Else give a date + No. of weeks and format date and weight
          graphData[0].data.push({
            x: format(addWeeks(startDate, index), dateFormat),
            y: element.weight,
          });
    });
    setData(graphData);
    setLoading(false);
  };

  const sortArr = (arr) => arr.sort((a, b) => a.id - b.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weight) {
      alert("weight must not be empty");
    } else if (!pushups) {
      alert("pushups must not be empty");
    } else {
      writeDatabase();
      setWeight("");
      setPushUps("");
    }
  };

  const writeDatabase = (e) => {
    const weeksRef = firebase.database().ref("weeks");
    // Get state to write
    const week = {
      id: weekIndex,
      weight: weight,
      pushups: pushups,
    };
    weeksRef.push(week);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Input
          title={"Your weight this week"}
          onChange={(value) => setWeight(value)}
          value={weight}
          placeholder={"KG"}
        />
        <Input
          title={"How many Push Ups this week"}
          onChange={(value) => setPushUps(value)}
          value={pushups}
        />
      </div>
      <Submit handleSubmit={handleSubmit} />
      <div>{loading ? "loading" : <LineGraph graphData={data} />}</div>
    </div>
  );
}

export default App;

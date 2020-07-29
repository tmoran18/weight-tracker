import React, { useState, useEffect } from "react";
import { addDays, addWeeks, format, compareAsc } from "date-fns";
import Input from "./components/Input";
import Submit from "./components/Submit";
import LineGraph from "./components/LineGraph";
import axios from "axios";
import "./App.css";

function App() {
  const startDate = new Date("2020/07/20");
  const dateFormat = "dd/MM/yyyy";
  const [weight, setWeight] = useState(null);
  const [pushups, setPushUps] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Onload get
  useEffect(() => {
    axios
      .get("http://localhost:1337/trackers")
      .then(function (response) {
        setLoading(true);
        buildGraphData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Build an object to pass to the Line Graph
  const buildGraphData = (resData) => {
    const graphData = [
      {
        id: "weight tracker",
        color: "blue",
        data: [],
      },
    ];
    resData.forEach((element, index) => {
      // First element, give start date and first weight
      element.id === 1
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

  const postToStrapi = () => {
    axios({
      method: "post",
      url: "http://localhost:1337/trackers",
      data: {
        weight: weight,
        pushups: pushups,
      },
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weight) {
      alert("weight must not be empty");
    } else if (!pushups) {
      alert("pushups must not be empty");
    } else {
      postToStrapi();
    }
  };

  return (
    <div className="App">
      <h1>Hello React</h1>
      <Input
        title={"Your weight this week"}
        onChange={(value) => setWeight(value)}
      />
      <Input
        title={"How many Push Ups this week"}
        onChange={(value) => setPushUps(value)}
      />
      <Submit handleSubmit={handleSubmit} />
      <div>{loading ? "loading" : <LineGraph graphData={data} />}</div>
    </div>
  );
}

export default App;

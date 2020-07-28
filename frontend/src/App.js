import React, { useState, useEffect } from "react";
import { addDays, format, compareAsc } from "date-fns";
import Input from "./components/Input";
import Submit from "./components/Submit";
import LineGraph from "./components/LineGraph";
import axios from "axios";
import "./App.css";

function App() {
  const startDate = new Date("2020/07/20");

  const [weight, setWeight] = useState(null);
  const [pushups, setPushUps] = useState(null);
  const [startWeight, setStartWeight] = useState(null);
  const [date, setDate] = useState(null);
  const [data, setData] = useState([
    {
      id: "japan",
      color: "#00B2FF",
      data: [
        {
          x: "20th July 2020",
          y: 95.4,
        },
        {
          x: "27th July 2020",
          y: 95.6,
        },
        {
          x: "3rd August 2020",
          y: 94.5,
        },
        {
          x: "10th August 2020",
          y: 94,
        },
      ],
    },
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:1337/trackers")
      .then(function (response) {
        console.log(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const addWeeksToStartDate = () => {};
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
      <LineGraph data={data} />
    </div>
  );
}

export default App;

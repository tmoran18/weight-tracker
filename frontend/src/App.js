import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import LineGraph from "./components/LineGraph";
import axios from "axios";
import "./App.css";

function App() {
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
          x: "plane",
          y: 233,
        },
        {
          x: "helicopter",
          y: 98,
        },
        {
          x: "boat",
          y: 60,
        },
        {
          x: "train",
          y: 100,
        },
        {
          x: "subway",
          y: 74,
        },
        {
          x: "bus",
          y: 121,
        },
        {
          x: "car",
          y: 119,
        },
        {
          x: "moto",
          y: 40,
        },
        {
          x: "bicycle",
          y: 83,
        },
        {
          x: "horse",
          y: 142,
        },
        {
          x: "skateboard",
          y: 69,
        },
        {
          x: "others",
          y: 83,
        },
      ],
    },
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:1337/weight-records")
      .then(function (response) {
        console.log(response.data[0].weight);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
      <LineGraph data={data} />
    </div>
  );
}

export default App;

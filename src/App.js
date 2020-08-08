import React, { useState, useEffect } from "react";
import firebase, { auth, provider } from "./firebase.js";
import { addWeeks, format } from "date-fns";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import Input from "./components/Input";
import Submit from "./components/Submit";
import LineGraph from "./components/LineGraph";
import LineGraphRight from "./components/LineGraphRight";
import Stats from "./components/Stats";
import "./App.css";

function App() {
  const startDate = new Date("2020/07/20");
  const dateFormat = "dd/MM";
  const [weight, setWeight] = useState(null);
  const [pushups, setPushUps] = useState(null);
  const [data, setData] = useState([]);
  const [pushupData, setPushupData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [weekIndex, setWeekIndex] = useState(null);
  const [weeklyLoss, setWeeklyLoss] = useState(null);

  // Onload get data from firebase database
  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => user && setUser(user));
    const weeksRef = firebase.database().ref("weeks");
    weeksRef.on("value", (snapshop) => {
      let weeks = snapshop.val();
      // Get the length of data in DB
      const weeksLength = Object.keys(weeks);
      setWeekIndex(weeksLength.length);
      buildGraphData(weeks);
      setWeeklyLoss(weeklyLosses(weeks));
      let key = process.env.API_KEY;
      console.log(key);
    });
  }, []);

  const login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      setUser(user);
    });
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  // Build an object to pass to the Line Graph
  const buildGraphData = (weeks) => {
    // Create a graphData Object with empty data array for filling
    const graphData = [
      {
        id: "weight tracker",
        color: "#00b2ff",
        data: [],
      },
    ];

    const pushupGraphData = [
      {
        id: "weight tracker",
        color: "#ff0000",
        data: [],
      },
    ];

    // Sort the data by index
    const arr = sortData(weeks);

    // iterate of data to build line graph data object
    // manually set the start date for the first index
    // add 1 week onto date for all other indexes
    arr.forEach((element, index) => {
      // First element, give start date and first weight
      index === 0
        ? graphData[0].data.push({
            x: format(startDate, dateFormat),
            y: element.weight,
          }) &&
          pushupGraphData[0].data.push({
            x: format(startDate, dateFormat),
            y: element.pushups,
          })
        : // Else give a date + No. of weeks and format date and weight
          graphData[0].data.push({
            x: format(addWeeks(startDate, index), dateFormat),
            y: element.weight,
          }) &&
          pushupGraphData[0].data.push({
            x: format(addWeeks(startDate, index), dateFormat),
            y: element.pushups,
          });
    });
    setData(graphData);
    setPushupData(pushupGraphData);
    setLoading(false);
  };

  // Get the data for the weekly loss
  const weeklyLosses = (data) => {
    const weeklyLossData = sortData(data);
    return round(
      weeklyLossData[weeklyLossData.length - 2].weight -
        weeklyLossData[weeklyLossData.length - 1].weight,
      10
    );
  };

  // Rounding function that handles negative numbers
  const round = (value, precision) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };

  // Sort data by index ASC
  const sortData = (data) => {
    const dataToSort = [];
    Object.entries(data).forEach((entry) => {
      dataToSort.push(entry[1]);
    });
    // Return the array by sorting numerically by ID
    return dataToSort.sort((a, b) => a.id - b.id);
  };

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
      <header>
        <Navbar user={user} login={login} logout={logout} />
      </header>
      {user ? (
        <section>
          <span className="username">Welcome {user.displayName}</span>
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
          {loading ? (
            <Spinner />
          ) : (
            <div className="graph_container">
              <LineGraph graphData={data} />
              <LineGraphRight className="second" graphData={pushupData} />
              <Stats weeklyLoss={weeklyLoss} loading={loading} />
            </div>
          )}
        </section>
      ) : (
        <section className="login_msg">
          Please login with google to view this app
        </section>
      )}
    </div>
  );
}

export default App;

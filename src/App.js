import { useEffect, useState } from "react";
import "./App.css";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/women/22.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const getPerson = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
    // console.log(person);
  };
  useEffect(() => {
    try {
      getPerson();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleValue = (e) => {
    // console.log(e.target);
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      // console.log(newValue)
      setTitle(newValue)
      setValue(person[newValue])
    }
  };
  // console.log(person);
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="cotainer">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button type="button" className="btn" onClick={getPerson}>
            {loading ? "Loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;

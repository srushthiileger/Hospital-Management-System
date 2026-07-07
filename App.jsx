// frontend/apiDemo/src/App.jsx

import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  // Form State
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dof, setDof] = useState("");

  // Other States
  const [patients, setPatients] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  // Load Patients
  const loadPatients = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/hospital`);
      const data = await res.json();

      if (search === "") {
        setPatients(data);
      } else {
        setPatients(
          data.filter(
            (p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.Gender.toLowerCase().includes(search.toLowerCase())
          )
        );
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      setError("Server not running.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPatients();
  }, [search]);

  // Save Patient
  const savePatient = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !name ||
      !age ||
      !gender ||
      !phone ||
      !address ||
      !dof
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (phone.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    const patient = {
      name,
      age,
      Gender: gender,
      phone,
      Address: address,
      DOF: dof,
    };

    if (editId) {
      await fetch(`${API}/hospital/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
    } else {
      await fetch(`${API}/Ho`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
    }

    setName("");
    setAge("");
    setGender("Male");
    setPhone("");
    setAddress("");
    setDof("");
    setEditId(null);

    loadPatients();
  };

  // Edit Patient
  const editPatient = (p) => {
    setEditId(p.id);
    setName(p.name);
    setAge(p.age);
    setGender(p.Gender);
    setPhone(p.phone);
    setAddress(p.Address);
    setDof(p.DOF);
  };

  // Delete Patient
  const deletePatient = async (id) => {
    await fetch(`${API}/hospital/${id}`, {
      method: "DELETE",
    });

    loadPatients();
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <button onClick={() => setDark(!dark)}>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      <h1>Hospital Management</h1>

      <form onSubmit={savePatient}>
        <input
          placeholder="Name"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <small>{name.length}/40</small>

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          placeholder="Phone"
          maxLength="10"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, ""))
          }
        />

        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="date"
          value={dof}
          onChange={(e) => setDof(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">
          {editId ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      <hr />

      <h2>Patients</h2>

      <p>Last Updated: {lastUpdated}</p>

      <input
        placeholder="Search Name or Gender"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        patients.map((p) => (
          <div className="card" key={p.id}>
            <div className="avatar">
              {p.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3>{p.name}</h3>
              <p>Age: {p.age}</p>
              <p>Gender: {p.Gender}</p>
              <p>Phone: {p.phone}</p>
              <p>Address: {p.Address}</p>
              <p>DOF: {p.DOF}</p>
              <p>{p.registered_at}</p>
            </div>

            <div>
              <button onClick={() => editPatient(p)}>
                Edit
              </button>

              <button onClick={() => deletePatient(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
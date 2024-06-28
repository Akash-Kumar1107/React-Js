import React from 'react'
import { UserData } from './UserData.js';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(UserData); 
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt.length !== 0) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this record?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  }

  const handleSave = () => {
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    const newData = { id: newId, firstName, lastName, age };
    setData([...data, newData]);
    handleClear();
  }

  const handleUpdate = () => {
    const index = data.findIndex((item) => item.id === id);
    const updatedData = [...data];
    const existingItem = updatedData[index];

    // Update only non-empty fields
    if (firstName !== '') existingItem.firstName = firstName;
    if (lastName !== '') existingItem.lastName = lastName;
    if (age !== '') existingItem.age = age;

    updatedData[index] = existingItem;

    setData(updatedData);
    handleClear();
  }

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);
  }

  return (
    <div className='App'>

      <div style={{ display: "flex", justifyContent: 'center', marginBlock: "20px" }}>
        <div>
          <label>FirstName:
            <input type="text" placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </label>
        </div>

        <div>
          <label>LastName:
            <input type="text" placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </label>
        </div>

        <div>
          <label>Age:
            <input type="text" placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>

        <div>
          {
            !isUpdate ?
              <button onClick={handleSave} className='btn btn-primary'>Save</button>
              :
              <button onClick={handleUpdate} className='btn btn-primary'>Update</button>
          }
          <button onClick={handleClear} className='btn btn-danger'>Clear</button>
        </div>
      </div>

      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)} className='btn btn-primary'>Edit</button>
                    <button onClick={() => handleDelete(item.id)} className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

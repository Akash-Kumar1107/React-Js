import React from 'react'
import { UserData } from './UserData.js';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    setData(UserData); // Set UserData which should be an array of user objects
  }, []);

  const handleEdit = (id) =>{
    alert(id)
  }

  const handleDelete = (id) =>{
    alert(id)
  }

  return (
    <div className='App'>
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>id</td>
            <td>First Name</td>
            <td>Last Name</td> {/* Corrected typo */}
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
                    <button onClick={()=> handleEdit(item.id)} className='btn btn-primary'>Edit</button>
                    <button onClick={()=> handleDelete(item.id)} className='btn btn-danger'>Delete</button>
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

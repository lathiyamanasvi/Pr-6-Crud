import React, { useEffect, useState } from "react";
import './Crud.css';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function Crud() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState("");
  const [record, setRecord] = useState([]);
  const [edit,setEdit] = useState("");
  const id = Math.floor(Math.random() * 100);

  const handlesubmit = (e) => {
    e.preventDefault();
    let obj = { id, name, email, password, salary, city };
      if(edit){
        let all = [...record];
        let update= all.map((val)=>{
          if(val.id == edit){
            return{
              ...val,
              name : name,
              email : email,
              password : password,
              salary : salary,
              city : city
            }
          }
          return val;
        })
        localStorage.setItem('user',JSON.stringify(update));
        setRecord(update);
        alert("User Update");
        setEdit("");
      }
      else{
        let all = [...record, obj];
        setRecord(all);
        alert("User insert")
        localStorage.setItem("user", JSON.stringify(all));
      }
      setName("");
      setEmail("");
      setPassword("");
      setSalary("");
      setCity("");
  };

  useEffect(() => {
    let all = JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : [];
    setRecord(all);
  }, []);

  const deleterecord = (id) => {
    let all = [...record];
    let deleterecord = all.filter((val) => {
      return val.id != id;
    });

    localStorage.setItem("user", JSON.stringify(deleterecord));
    setRecord(deleterecord);
  };

  const editrecord = (id) => {
    let all = [...record];
    let single = all.find(val => val.id == id);
    setEdit(id);
    setName(single.name);
    setEmail(single.email);
    setPassword(single.password);
    setSalary(single.salary);
    setCity(single.city);
  }
  return (
    <div>
      <>
        <div className="container">
          <div>
            <center>
            <h2 className="shadow text-black py-3 w-50 mt-3" style={{backgroundColor:"#B7CEEC"}}>CRUD Operation</h2>
            </center>
            <form className="w-50 shadow p-5 mt-3" onSubmit={handlesubmit}>
                <label className="d-block">Name</label>
                <input type="text"  className="w-100 mb-3" onChange={(e) => setName(e.target.value)} value={name}/>

                <label className="d-block">Email</label>
                <input type="text"  className="w-100 mb-3" onChange={(e) => setEmail(e.target.value)} value={email}/>

                <label className="d-block">Password</label>
                <input type="text" className="w-100 mb-3" onChange={(e) => setPassword(e.target.value)} value={password}/>

                <label className="d-block">Salary</label>
                <input type="text" className="w-100 mb-3" onChange={(e) => setSalary(e.target.value)} value={salary}/>
    
                <label className="d-block">City</label>
                <input type="text" class="w-100 mb-3" onChange={(e) => setCity(e.target.value)} value={city}/>
  
                <center>
              {
                    edit ? (<input type="submit" className="btn btn-primary" value="edit"/>) : (<input type="submit" className="btn btn-primary" />)
              }
         
                </center>
            </form>
            <br></br>

            <h3 className="p-2 text-center">Manage Employee</h3>
            <table class="table table-striped mb-5">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Salary</th>
                  <th scope="col">City</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {record.map((val, i) => {
                  return (
                    <tr>
                      <td>{val.id}</td>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.password}</td>
                      <td>{val.salary}</td>
                      <td>{val.city}</td>
                      <td>
                        <button class="btn btn-danger me-2" onClick={() => deleterecord(val.id)}>
                          <MdDeleteForever />
                        </button>

                        <button class="btn btn-primary" onClick={() => editrecord(val.id)}>
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </div>
  );
}

export default Crud;

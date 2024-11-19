import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './app.css'
import './index.css'
const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('accessToken')); // Store the token in state
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const fetchEmployee = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/employee/getemployee', {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token in the Authorization header
            },
          });
          setEmployeeData(response.data);
          
        } catch (error) {
          console.error('Error fetching employee data', error);
        }
      }
    };

    fetchEmployee();
  }, [token]);


  const emailHider=()=>{
    if(employeeData.length>0){

      employeeData.forEach((emp)=>{
        emp.email.split('@')[0].substring(0,3)+'****@'+emp.email.split('@')[1]
      })
    }
  
  }
  emailHider()

  // Handle logout: clear token and employee data
  const logoutHandle = () => {
    localStorage.removeItem('accessToken'); 
    setEmployeeData([]); 
    setToken(null); };

const deleteEmpHandle=(id)=>{
console.log(id);

}
  return (
    <div>
      {token ? (
        <div>
          <button onClick={logoutHandle} className="bg-red-500 text-white p-2 mt-4">
            Logout
          </button>
          {employeeData.length > 0 ? (
           <div className="relative overflow-x-auto">
           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                       <th scope="col" className="px-6 py-3">
                           employee name
                       </th>
                       <th scope="col" className="px-6 py-3">
                           age
                       </th>
                       <th scope="col" className="px-6 py-3">
                           email
                       </th>
                       <th scope="col" className="px-6 py-3">
                           action
                       </th>
                   </tr>
               </thead>
               <tbody>
                {employeeData.map((emp)=>(

                 
                  <tr key={emp._key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                       <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {emp.empName}
                       </th>
                       <td className="px-6 py-4">
                       {emp.age}
                       </td>
                       <td className="px-6  py-4">

                       {emp.email.split('@')[0].substring(0,3)+'****@'+emp.email.split('@')[1]}
                       </td>
                       <td className="px-6 py-4">
                       <button onClick={()=> deleteEmpHandle(emp._id)}  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                       </td>
                   </tr>
                 ))}
               </tbody>
           </table>
       </div>
          ) : (
            <p>No employees found.</p>
          )}
          



        </div>
      ) : (
        <div>
          <p>Please log in</p>
          <button onClick={()=>navigate('/login')}> login</button>

          <button onClick={()=>navigate('/register')}> Register</button>
        </div>
      )}
    </div>
  );
};

export default Employee;
{/* <li key={employee._id} className="p-4 flex border-b">
<h2 className="text-3xl   underline font-bold">{employee.empName}</h2>
<p>Email: {employee.email}</p>
<p>Age: {employee.age}</p>
</li> */}
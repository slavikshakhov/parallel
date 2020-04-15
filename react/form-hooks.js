import React from 'react';
import { useForm } from 'react-hook-form';

export default function App(){
    const {register, handleSubmit, errors, watch} = useForm();

    const submitForm = (data) => {
        console.log(data);
        console.log(errors.name)
    }
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <input type="text" placeholder="name" name="name" ref={register({required: true, minLength: 8})} />
                {errors.name && errors.name.type === "required" && <p>Name required</p>}
                {errors.name && errors.name.type === "minLength" && <p>at least 8 char</p>}

            <input type="email" placeholder="email" name="email" ref={register({required: true})} />
                 {errors.email && <p>Email required</p>}


            <input type="password" placeholder="password" name="password"
                        ref={register({required: "pw required",
                                       min: {value: 3, message: "min 8 chars"}})} />
                {errors.password && <p>{errors.password.message}</p>}
            <input type="password" placeholder="password2" name="password2"
                    ref={register({
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,  message: 'invalid email address' },
                        validate: (value) => value === watch('password') || "passwords do not match"
                     })} />
            {errors.password2 && <p>{errors.password2.message}</p>}
            <input type="submit" value="submit" />
        </form>
    )
}
//pattern: /^[A-Za-z]/
//minLength, maxLength
//required

//****************************** REACTIVE **************************

import React, { useState } from 'react'
function AddTodo() {
  const [todo, setTodo] = useState('');
  return (
    <>
    <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholde="Add todo" />
    </>
  )

//**************** LIVE UPDATE based on state's value *********************

import React, { useState } from 'react'
function Search() {
  const [search, setSearch] = useState('');
  useEffect(() => {
    // You can use latest `search` state value now
    // For example you can filter todos based on seach value
    console.log(`You entered: ${search}`);
  });
  return (
    <>
    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholde="Search todos" />
    </>
  );

  //! ONLY UPDATE THIS stat's value, not the rest
  useEffect(() => { console.log(`You clicked ${count} times`); }, [count]); // Only re-run the effect if count changes

  //****************************************** RESET INPUTS *****************************************

  e.target.reset();   // !!! only resets inputs, html standard

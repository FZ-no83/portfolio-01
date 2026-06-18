import { useState } from "react";

export const Signup = () => {
    // const [firstname, setFirstname] = useState();
    // const [lastname, setLastname] = useState();
    const [formData, setFormData] = useState({ firstName: "", lastName: "" , password: ""});

    const handleChange = (evt) => {
        const fieldName = evt.target.name;
        const value = evt.target.value;

        setFormData((currData) => {
            // currData[fieldName] = value;
            return {...currData, [fieldName]: value };
        });
    };


    const handleSubmit = () => {
        // console.log(formData.lastName, formData.firstname);
        console.log(formData);
    };

    // const updateFirstname = (evt) => {
    //     //console.log(evt);
    //     setFirstname(evt.target.value);
    // };
    //     const updateLastname = (evt) => {
    //     //console.log(evt);
    //     setLastname(evt.target.value);
    // };

    return (
        <div>
            <h1>Page1</h1>
            <label htmlFor="lastname">名字</label>
            <input
                id="lastname"
                name="lastName"
                type="text" 
                placeholder="山田" 
                value={formData.lastname}
                onChange={handleChange} 
            />
            <label htmlFor="firstname">名前</label>
            <input
                id="firstname"
                name="firstName"
                type="text" 
                placeholder="太郎" 
                value={formData.firstname}
                onChange={handleChange} 
            />
            <label htmlFor="passward">パスワード</label>
            <input
                id="password"
                name="password"
                type="password" 
                placeholder="xxxxxxx" 
                value={formData.password}
                onChange={handleChange} 
            />
            <button>送信</button>
        </div>
    );
}

//export default Signup:
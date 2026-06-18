import axios from "axios";

export default function App() {
    const onClickUsers = () => {
        axios.get("https://....").then((res) => {
            console.log(res); 
        }).catch((err) => console.log(err));
    };

    const onClickUser1 = () => {
        alert("user1");
    };

    return (
        <div className="App">
            <button onClick={onClickUsers}>users</button>
            <button onClick={onClickUser1}>id=1のuser</button>
        </div>
    );
}

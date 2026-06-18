//import { BrowserRouter, Switch, Link } from "react-router-dom";
//import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";
//import { page404 } from "./Page404";

export const Router = () => {
    return (
        <BrowserRouter>
            {/* <div className='App'>
                <Link to="/">Home</Link>
                <br />
                <Link to="/page1">Page1</Link>
                <br />
                <Link to="/page2">Page2</Link>
                <br />

            </div> */}
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path="/page1" element={<Page1 />} />
                <Route exact path="/page2" element={<Page2 />} />
            </Routes>
        </BrowserRouter>
    );
}

//export default Router;

import { createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
    const { children } = props;
    //const contextName = "jakele";
    const [ userInfo, setUserInfo ] = useState(null);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
         {/* <UserContext.Provider value={{ contextName }}> */}
            {children}
        </UserContext.Provider>
    );
};

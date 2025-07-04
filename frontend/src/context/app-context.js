// 'use client';
// import { createContext, useContext, useEffect, useState } from 'react';

// const AppContext = createContext();

// export function AppProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <AppContext.Provider value={{ user, setUser, query, setQuery, logout }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useAppContext() {
//   return useContext(AppContext);
// }

import { useState } from 'react'
import { Provider } from "react-redux";
import vendorStore from "./redux/VendorStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainWrapper from "./components/MainWrapper"
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <>
      <Router>
        <Provider store={vendorStore}>
          <Routes>
            <Route path="/*" element={<MainWrapper />}></Route>
          </Routes>
        </Provider>
      </Router >
    </>
  )
}

export default App

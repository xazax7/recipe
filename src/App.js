// NOt needed
// import './App.css';

import { BrowserRouter, Route } from "react-router-dom"
import AllPosts from "./components/AllPosts.js"
import OnePost from "./components/OnePost.js"
import SortPosts from "./components/SortPosts.js"
import Nav from "./components/elements/Nav.js"
import Header from "./components/elements/Header.js";
import { Link } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={Header} />
        <Route component={Nav} />
        {/* Link to home */}
        <Route component={AllPosts} path="/" exact />

        {/* Find the 'slug' of the blog post that we will declare in our sanity studio, which will then be the link/url*/}
        <Route component={OnePost} exact path="/:slug" />

        {/* <Route component={SortPosts} path="/:slug" /> */}
        <Route path='/tags/:slug' exact component={(props) => <SortPosts {...props} key={window.location.pathname} />} />

      </div>
    </BrowserRouter>
  );
}

export default App;

// NOt needed
// import './App.css';

import { BrowserRouter, Route } from "react-router-dom"
import AllPosts from "./components/AllPosts.js"
import OnePost from "./components/OnePost.js"
import SortPosts from "./components/SortPosts.js"

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Link to home */}
        <Route component={AllPosts} path="/" exact />

        {/* Find the 'slug' of the blog post that we will declare in our sanity studio, which will then be the link/url*/}
        <Route component={OnePost} path="/:slug" />

        <Route component={SortPosts} path="/hot" />


      </div>
    </BrowserRouter>
  );
}

export default App;

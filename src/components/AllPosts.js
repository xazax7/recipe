import React, { useEffect, useState } from 'react';
import sanityClient from "../client.js";

import { Link } from "react-router-dom";

import Header from "./elements/Header"
import Nav from "./elements/Nav"
// import post from '../../recipeblog/schemas/post.js';
import FadeIn from 'react-fade-in';

export default function AllPosts() {
    // set up useState
    const [allPostsData,
        setAllPosts] = useState(null);

    // fetch all data from sanity with a groc query
    useEffect(() => {
        sanityClient.fetch( // GROC query
            // All(*) that have a type equal to post.
            // then query for:
            `*[_type == "post"]{
                title,
                slug,
                type,
                description,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`) // set all the data to setAllposts (setting the state)
            .then((data) => setAllPosts(data)).then(console.log("DONE")).catch(console.error);
        // [] makes sure it stops, doesn't continue running.
    }

        , []) // 

    if (!allPostsData) return (
        <>
            {/* <Link to={'/'}><button>‹ Back to all recipes</button></Link> */}
            {/* <div className="loading-text">Setting the table...</div> */}
            <div className="loading">🍴</div>
        </>
    );


    return <main className="main">

        <FadeIn transitionDuration="300" wrapperTag="h1" className="page-header">
            Latest Recipes
        </FadeIn>




        {/* Fade in for each individual post. delay=300 is added for each consecutive post */}
        <FadeIn transitionDuration="1000" className="post-list" wrapperTag="main" childClassName="post-small-container" delay="300">
            {allPostsData && allPostsData.map((post, index) => (
                <Link
                    to={'/' + post.slug.current}
                    key={post.slug.current}
                    className="post-small-link"
                >
                    <span className="post-small"
                        key={index}>
                        <img src={post.mainImage.asset.url}
                            height="300"
                            className="post-small-img"
                            alt="image for recipe" />
                        <span className="post-small-details">
                            <h2 className="post-small-title"> {post.title}</h2>
                            {post.description && <p className="post-small-description">{post.description}</p>}
                        </span>
                    </span>
                </Link>
            ))
            }
        </FadeIn>
    </main>
}
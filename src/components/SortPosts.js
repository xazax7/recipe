import React, { useEffect, useState } from 'react';
import sanityClient from "../client.js";
import { useParams, useLocation, Link } from "react-router-dom"
import FadeIn from "react-fade-in"

export default function SortPosts() {
    // set up useState
    const [allPostsData,
        setAllPosts] = useState(null);
    const { slug } = useParams();
    let location = useLocation();

    useEffect(() => {
        console.log("myparams", slug);

        sanityClient.fetch( // GROC query

            `*["${slug}" in type] {
                    title,
                    slug,
                    description,
                    mainImage {
                        asset-> {
                            _id,
                            url
                        }
                    }

                }

                `) // set all the data to setAllposts (setting the state)
            .then((data) => setAllPosts(data)).then(console.log("DONE")).catch(console.error);

    }

        , [])

    if (!allPostsData) return (
        <>
            {/* <Link to={'/'}><button>‹ Back to all recipes</button></Link> */}
            {/* <div className="loading-text">Setting the table...</div> */}
            {/* <h1>No recipes for {slug} yet!</h1> */}
            <main className="main"><FadeIn transitionDuration="100" className="loading">🍴</FadeIn></main>
        </>
    );


    return <main className="main">
        {allPostsData < 1 ? <FadeIn transitionDuration="300" childTag="h1" className="page-header">{`${slug} recipes coming soon!`}</FadeIn> : <FadeIn transitionDuration="300" wrapperTag="h1" className="page-header"><span className="page-header-small">Viewing</span>{slug}</FadeIn>}
        <FadeIn transitionDuration="1000" className="post-list" childClassName="post-small-container" delay="500">


            {allPostsData && allPostsData.map((post, index) => (
                <Link
                    to={'/' + post.slug.current}
                    key={post.slug.current}
                    className="post-small-link"
                >
                    {/* <span className="post-small"
                        key={index}> */}
                    <img src={post.mainImage.asset.url}
                        height="300"
                        className="post-small-img"
                        alt={post.title} />
                    <span className="post-small-details">
                        <h2 className="post-small-title"> {post.title}</h2>
                        {post.description && <p className="post-small-description">{post.description}</p>}
                    </span>
                    {/* </span> */}
                </Link>
            ))
            }
            {/* {

                allPostsData && allPostsData.map((post, index) => (

                    <Link
                        to={'/' + post.slug.current}
                        key={post.slug.current}
                        className="post-small-container">
                        <FadeIn transitionDuration="1000">
                            <span className="post-small" key={index}>
                                <img src={post.mainImage.asset.url}
                                    height="300"
                                    className="post-small-img"
                                    alt="image for recipe" />
                                <span className="post-small-details">
                                    <h2 className="post-small-title">
                                        {post.title}
                                    </h2>
                                    {post.description && <p className="post-small-description"> {post.description}</p>}
                                </span>
                            </span>
                        </FadeIn>
                    </Link>
                ))


            } */}




        </FadeIn></main>
}

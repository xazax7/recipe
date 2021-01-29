import React, { useEffect, useState } from 'react';
import sanityClient from "../client.js";
import { Link } from "react-router-dom";

export default function AllPosts() {
    // set up useState
    const [allPostsData, setAllPosts] = useState(null);

    // fetch all data from sanity with a groc query
    useEffect(() => {
        sanityClient.fetch(
            // GROC query
            // All(*) that have a type equal to post.
            // then query for:
            `*[_type == "post"]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                }

            }`
        )
            // set all the data to setAllposts (setting the state)
            .then((data) => setAllPosts(data))
            .catch(console.error);
        // [] makes sure it stops, doesn't continue running.
    }, [])
    // 

    return <div>
        <h2>Blog Posts</h2>
        <h3>Welcome to the bloggu</h3>
        <div>
            {allPostsData &&
                allPostsData.map((post, index) => (
                    <Link to={'/' + post.slug.current} key={post.slug.current}>
                        <span key={index}>
                            <img src={post.mainImage.asset.url} height="300" alt="main hero image for blog post" />
                            <span>
                                <h2>{post.title}</h2>
                            </span>
                        </span>
                    </Link>
                ))}
        </div>
    </div>
}
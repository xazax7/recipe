import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import sanityClient from "../client.js";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import Header from "./elements/Header";
import Nav from "./elements/Nav";
import FadeIn from "react-fade-in"


// sanity package to help with many images
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

// Youtube ID Finder
function youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

export default function OnePost() {
    // set state
    const [postData, setPostData] = useState(null);
    const { slug } = useParams();


    // use useeffect to grab data from our sanity client
    useEffect(() => {
        sanityClient.fetch(
            // All slugs.current that is equal to the slug we are clicking on $.
            //AKA find jusut the slug we are clicking on
            `*[slug.current == $slug]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                body,
                description,
                youtube,
                ingredients,
                prepTime,
                cookTime,
                servings,
                ingredients,
                type,
                longerDesc
            }`,
            // indicate we are looking at a slug
            { slug }
        )
            .then((data) => setPostData(data[0]))
            .catch(console.error)
    }, [slug]);



    if (!postData) return (
        <>
            {/* <Link to={'/'}><button>‹ Back to all recipes</button></Link> */}
            {/* <div className="loading-text">Setting the table...</div> */}
            <main className="main"><FadeIn transitionDuration="100" className="loading">🍴</FadeIn></main>
        </>
    );

    return (



        <FadeIn transitionDuration="1000" className="main" wrapperTag="main" delay="500">

            <div className="recipe">
                {/* recipe-back-btn */}
                {/* <Link to={'/'} className="btn recipe-back-btn" >‹ Back to all recipes</Link > */}
                {/* recipe-img */}
                {postData.mainImage &&
                    <img src={urlFor(postData.mainImage).width(300).url()} alt="main image of post" className="recipe-img" />
                }

                {/* recipe-info */}
                <div className="recipe-info">
                    <h2 className="recipe-title">{postData.title}</h2>
                    <span className="recipe-quote">{postData.description}</span>
                    <span>Prep:{postData.prepTime}</span>
                    <span>Cook:{postData.cookTime}</span>
                    <span>Servings:{postData.servings}</span>
                    <a className="btn-link" href={`https://www.youtube.com/watch?v=${youtubeParser(postData.youtube)}`}>Watch how it's made on Youtube</a>
                </div>


                {/* recipe-video-desc */}
                <div className="recipe-desc">

                    {/* recipe-desc */}
                    {postData.longerDesc && <BlockContent
                        blocks={postData.longerDesc}
                        projectId={sanityClient.clientConfig.projectId}
                        dataset={sanityClient.clientConfig.dataset}
                    />}
                </div>

                {/* recipe-ingredients */}
                <div className="recipe-ingredients">
                    <h2>Ingredients</h2>
                    <BlockContent
                        blocks={postData.ingredients}
                        projectId={sanityClient.clientConfig.projectId}
                        dataset={sanityClient.clientConfig.dataset}
                    />
                </div>
                <div className="recipe-steps">
                    <h2>Steps</h2>
                    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/1MjwG7YzMFY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    <BlockContent
                        blocks={postData.body}
                        projectId={sanityClient.clientConfig.projectId}
                        dataset={sanityClient.clientConfig.dataset}
                    />
                </div>
            </div>
        </FadeIn>
    )
}
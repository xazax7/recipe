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
            <div className="loading">🍴</div>
        </>
    );

    return (

        <FadeIn transitionDuration="1500" wrapperTag="main" className="recipe-page main">
            <Link to={'/'} className="btn back-btn">‹ Back to all recipes</Link>
            <h2 className="recipe-page-title">{postData.title}</h2>
            <blockquote><span>“</span>{postData.description}<span>”</span></blockquote>


            <div className="recipe-page-details">
                {postData.mainImage &&
                    <img src={urlFor(postData.mainImage).width(500).url()} alt="main image of post" className="recipe-page-img" />
                }
                <div className="recipe-page-details__text">
                    <span><strong>Prep:</strong> {postData.prepTime}</span>
                    <span><strong>Cook:</strong> {postData.cookTime}</span>
                    <span><strong>Servings:</strong> {postData.servings}</span>
                </div>
            </div>


            <div>
                {/* Youtube video */}
                {postData.youtube && <iframe width="560" height="315" src={`https://www.youtube.com/embed/${youtubeParser(postData.youtube)}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
                {/* {postData.ingredients && <div>{postData.ingredients}</div>} */}

                {postData.longerDesc && <div className="recipe-page-description"><BlockContent
                    blocks={postData.longerDesc}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                /></div>}


                {/* Ingredients are rendered as <p> */}
                <div className="ingredients-list">
                    <h2 className="ingredients-list-header recipe-header">Ingredients</h2>
                    <BlockContent
                        blocks={postData.ingredients}
                        projectId={sanityClient.clientConfig.projectId}
                        dataset={sanityClient.clientConfig.dataset}
                    />
                </div>
                <div className="steps">
                    <h2 className="steps-header recipe-header">Steps</h2>
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
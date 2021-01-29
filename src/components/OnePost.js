import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";


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
                "name": author->name,
                "authorImage":author->image,
                youtube
            }`,
            // indicate we are looking at a slug
            { slug }
        )
            .then((data) => setPostData(data[0]))
            .catch(console.error)
    }, [slug]);



    if (!postData) return <div>Loading...</div>;

    return (
        <div>
            {/* Header title/author starts */}
            <div>
                <h2>{postData.title}</h2>
                <div>
                    {/* <img src={postData.mainImage.asset.url} /> */}
                    <img src={urlFor(postData.authorImage).width(100).url()}
                        alt="Thumbnail image of author" />
                    <h4>{postData.name}</h4>
                </div>
            </div>
            {/* Header title/author stops */}

            <img src={urlFor(postData.mainImage).width(500).url()} alt="main image of post" />
            <div>

                {/* Youtube video */}
                {postData.youtube && <iframe width="560" height="315" src={`https://www.youtube.com/embed/${youtubeParser(postData.youtube)}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}

                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/1MjwG7YzMFY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                <BlockContent
                    blocks={postData.body}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                />
            </div>
        </div>
    )
}
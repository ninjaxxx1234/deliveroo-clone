import { createClient } from "@sanity/client";
import urlBuilder from "@sanity/image-url";
let sanityQuery = (query, params) => createClient.fetch(query, params);
import React from 'react'
import client from './sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export const getFeaturedRestaurants = () => {
  return sanityQuery(`
  *[_type == "featured"] {
    ...,
    restaurants[]->{
      ...,
      dishes[]->{
        ...
      },
      type->{
        name
      }
    }
  }
  `)
}

export const getCategories = () => {
  return sanityQuery(`
      *[_type == 'category']
  `);
}

export const getFeaturedRestaurantById = ()=>{
  return sanityQuery(`
  *[_type == "featured" && _id == "295b3419-b3ac-4a8d-b6fc-d82ed32fe04c"] {
    restaurants[]->{
      _id,
      name,
      address,
      image,
      ...,
      
      dishes[]->{
        // Details of dishes if needed
      }
    },
    type->{
      name
    }
  }
  
        
  `)
}

function urlFor(source) {
  return builder.image(source)
}
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";


// sanity client
export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_ID,
  dataset: "production",
  apiVersion: "2021-11-16", // use current UTC date - see "specifying API version"!
  token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
  ignoreBrowserTokenWarning: true,
});


//img sanity code
const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

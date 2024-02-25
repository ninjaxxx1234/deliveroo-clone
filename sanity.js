import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: 'gqhqfjvx',
  dataset: 'production',
  useCdn: true,
  apiVersion: "2021-03-25"
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source).url();

export default client
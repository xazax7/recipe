import sanityClient from "@sanity/client"
import { defaultCipherList } from "constants"

export default sanityClient({
    projectId: "1lhhpzey",
    dataset: "production"
})
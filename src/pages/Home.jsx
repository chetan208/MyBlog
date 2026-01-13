import { About, Header,ContactUs } from "../components"
import ExploreBlogs from "../components/ExploreBlogs"
import Hero from "./Hero"


export default function Home(){
    return(
        <div>
        <Hero/>
        <ExploreBlogs/>
        <About/>
        <ContactUs/>
        </div>
    )
}
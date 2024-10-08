import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
import Hero from "../../components/hero/Hero";
import Category from "../../components/cotegory/Cotegory"; 
import Brand from "../../components/brand/Brand";
import Beauty from "../../components/beauty/Beauty";
import Shelves from "../../components/shelvis/Shelvis"; 
import Footer from "../../components/footer/Footer";
import Timeout from "../../components/timeout/Timeout";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <Search/>
            <Category />
            <Timeout />
            <Hero />
            <Brand />
            <Beauty />
            <Shelves /> 
            <Footer />
        </div>
    )
}

export default Home;

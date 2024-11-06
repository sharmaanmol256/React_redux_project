import { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
    document.title = "SCSDB | Homepage";
    const [wallpaper, setwallpaper] = useState(null);
    const [trending, settrending] = useState(null);
    const [category, setcategory] = useState("all");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            let randomdata =
                data.results[(Math.random() * data.results.length).toFixed()];
            setwallpaper(randomdata);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`);
            settrending(data.results);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        GetTrending();
        !wallpaper && GetHeaderWallpaper();
    }, [category]);

    return wallpaper && trending ? (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-black">
            {/* Mobile Menu Button */}
            <button 
                className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#6556CD] p-2 rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
            </button>

            {/* Sidenav - Hidden on mobile by default, shown when menu is opened */}
            <div className={`${isMobileMenuOpen ? 'fixed inset-0 z-40 bg-black/90' : 'hidden'} md:block md:w-[20%]`}>
                <Sidenav />
            </div>

            {/* Main Content */}
            <div className="w-full md:w-[80%] h-full overflow-auto overflow-x-hidden">
                {/* Top Navigation */}
                <div className="sticky top-0 z-30 bg-black/50 backdrop-blur-sm">
                    <Topnav />
                </div>

                {/* Header Section */}
                <div className="w-full">
                    <Header data={wallpaper} />
                </div>

                {/* Trending Section */}
                <div className="px-4 md:px-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5">
                        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400">
                            Trending
                        </h1>

                        <div className="w-full sm:w-auto">
                            <Dropdown
                                title="Filter"
                                options={["tv", "movie", "all"]}
                                func={(e) => setcategory(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Horizontal Cards Section */}
                    <div className="w-full overflow-hidden">
                        <HorizontalCards data={trending} />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default Home;

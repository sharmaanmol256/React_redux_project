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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className="flex h-screen bg-black overflow-hidden">
            {/* Sidebar toggle for mobile */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-white"
                >
                    <i className={`ri-${isSidebarOpen ? 'close' : 'menu'}-line text-xl`}></i>
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed lg:relative lg:block w-[20%] h-screen bg-black z-40 transform transition-transform duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <Sidenav />
            </div>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden">
                {/* Topnav */}
                <div className="sticky top-0 z-30 bg-black/50 backdrop-blur-sm">
                    <Topnav />
                </div>

                {/* Header */}
                <Header data={wallpaper} />

                {/* Trending Section */}
                <div className="px-5">
                    <div className="flex justify-between items-center py-5">
                        <h1 className="text-3xl font-semibold text-zinc-400">
                            Trending
                        </h1>
                        <Dropdown
                            title="Filter"
                            options={["tv", "movie", "all"]}
                            func={(e) => setcategory(e.target.value)}
                        />
                    </div>

                    {/* Horizontal Cards */}
                    <HorizontalCards data={trending} />
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    ) : (
        <Loading />
    );
};

export default Home;

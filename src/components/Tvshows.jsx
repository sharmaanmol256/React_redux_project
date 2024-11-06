import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const Tvshows = () => {
    document.title = "SCSDB | Tv Shows";
    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today");
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const GetTv = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if (data.results.length > 0) {
                settv((prevState) => [...prevState, ...data.results]);
                setpage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const refreshHandler = () => {
        if (tv.length === 0) {
            GetTv();
        } else {
            setpage(1);
            settv([]);
            GetTv();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return tv.length > 0 ? (
        <div className="w-full min-h-screen bg-[#1F1E24]">
            {/* Header Section */}
            <div className="p-4 md:px-[5%] w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Title and Back Button */}
                    <div className="flex items-center space-x-2 text-zinc-400">
                        <i
                            onClick={() => navigate(-1)}
                            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer text-xl md:text-2xl"
                        ></i>
                        <h1 className="text-xl md:text-2xl font-semibold">
                            TV Shows
                            <small className="ml-2 text-sm text-zinc-600">
                                ({category.replace(/_/g, ' ')})
                            </small>
                        </h1>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-[80%]">
                        {/* Search Bar */}
                        <div className="w-full md:flex-1">
                            <Topnav />
                        </div>

                        {/* Category Dropdown */}
                        <div className="w-full md:w-auto">
                            <Dropdown
                                title="Category"
                                options={[
                                    "on_the_air",
                                    "popular",
                                    "top_rated",
                                    "airing_today",
                                ]}
                                func={(e) => setcategory(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <InfiniteScroll
                dataLength={tv.length}
                next={GetTv}
                hasMore={hasMore}
                loader={
                    <div className="text-white text-center p-4">
                        <div className="animate-pulse flex justify-center items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                }
                endMessage={
                    <div className="text-white text-center p-4">
                        <b>No more shows to load</b>
                    </div>
                }
            >
                <div className="px-4 md:px-0">
                    <Cards data={tv} title="tv" />
                </div>
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Tvshows;

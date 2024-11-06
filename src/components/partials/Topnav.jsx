import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const Topnav = () => {
    const [query, setquery] = useState("");
    const [searches, setsearches] = useState([]);

    const GetSerches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setsearches(data.results);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        GetSerches();
    }, [query]);

    return (
        <div className="w-full md:w-[80%] h-[10vh] relative flex mx-auto items-center px-4">
            <i className="text-zinc-400 text-xl md:text-3xl ri-search-line"></i>
            <input
                onChange={(e) => setquery(e.target.value)}
                value={query}
                className="w-full md:w-[50%] text-zinc-200 mx-3 md:mx-10 p-3 md:p-5 text-base md:text-xl outline-none border-none bg-transparent"
                type="text"
                placeholder="search anything"
            />
            {query.length > 0 && (
                <i
                    onClick={() => setquery("")}
                    className="text-zinc-400 text-xl md:text-3xl ri-close-fill cursor-pointer"
                ></i>
            )}

            {query.length > 0 && (
                <div className="z-[100] absolute w-full md:w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-0 md:left-[5%] overflow-auto rounded-lg shadow-xl">
                    {searches.map((s, i) => (
                        <Link
                            to={`/${s.media_type}/details/${s.id}`}
                            key={i}
                            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-4 md:p-10 flex justify-start items-center border-b-2 border-zinc-100"
                        >
                            <img
                                className="w-[8vh] md:w-[10vh] h-[8vh] md:h-[10vh] object-cover rounded mr-3 md:mr-5 shadow-lg"
                                src={
                                    s.backdrop_path || s.profile_path
                                        ? `https://image.tmdb.org/t/p/original/${
                                              s.backdrop_path || s.profile_path
                                          }`
                                        : noimage
                                }
                                alt=""
                            />
                            <span className="text-sm md:text-base line-clamp-2 md:line-clamp-1">
                                {s.name ||
                                    s.title ||
                                    s.original_name ||
                                    s.original_title}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Topnav;

import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
    return (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
                    data.backdrop_path || data.profile_path
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="w-full h-[40vh] md:h-[50vh] flex flex-col justify-end items-start p-4 md:p-[5%]"
        >
            <h1 className="w-full md:w-[70%] text-2xl md:text-5xl font-black text-white">
                {data.name ||
                    data.title ||
                    data.original_name ||
                    data.original_title}
            </h1>
            <p className="w-full md:w-[70%] mt-2 md:mt-3 mb-2 md:mb-3 text-sm md:text-base text-white">
                {data.overview.slice(0, 200)}...
                <Link
                    to={`/${data.media_type}/details/${data.id}`}
                    className="text-blue-400"
                >
                    more
                </Link>
            </p>
            <p className="text-white text-sm md:text-base">
                <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
                {data.release_date || "No Information"}
                <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "}
                {data.media_type.toUpperCase()}
            </p>
            <Link
                to={`/${data.media_type}/details/${data.id}/trailer`}
                className="mt-3 md:mt-5 bg-[#6556CD] p-3 md:p-4 rounded text-white text-sm md:text-base"
            >
                Watch Trailer
            </Link>
        </div>
    );
};

export default Header;

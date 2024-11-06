import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const Cards = ({ data, title }) => {
    return (
        <div className="flex flex-wrap justify-center md:justify-start w-full min-h-screen p-4 md:px-[5%] bg-[#1F1E24]">
            {/* Scroll to top button */}
            <Link
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-5 right-5 z-50 flex justify-center items-center w-10 h-10 md:w-[5vh] md:h-[5vh] bg-[#6556cd] rounded-lg shadow-lg"
            >
                <i className="text-white ri-arrow-up-line text-xl"></i>
            </Link>

            {data.map((c, i) => (
                <Link
                    to={`/${c.media_type || title}/details/${c.id}`}
                    className="relative w-[140px] sm:w-[160px] md:w-[25vh] m-2 md:mr-[5%] md:mb-[5%]"
                    key={i}
                >
                    <img
                        className="w-full h-[200px] md:h-[40vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
                        src={
                            c.poster_path || c.backdrop_path || c.profile_path
                                ? `https://image.tmdb.org/t/p/original/${
                                      c.poster_path ||
                                      c.backdrop_path ||
                                      c.profile_path
                                  }`
                                : noimage
                        }
                        alt=""
                    />
                    <h1 className="text-lg md:text-2xl text-zinc-300 mt-3 font-semibold line-clamp-2">
                        {c.name ||
                            c.title ||
                            c.original_name ||
                            c.original_title}
                    </h1>

                    {c.vote_average && (
                        <div className="absolute right-[-10%] bottom-[25%] rounded-full text-sm md:text-xl font-semibold bg-yellow-600 text-white w-10 h-10 md:w-[5vh] md:h-[5vh] flex justify-center items-center">
                            {(c.vote_average * 10).toFixed()}<sup>%</sup>
                        </div>
                    )}
                </Link>
            ))}
        </div>
    );
};

export default Cards;

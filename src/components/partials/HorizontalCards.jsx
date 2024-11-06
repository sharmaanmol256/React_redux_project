import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const HorizontalCards = ({ data, title }) => {
    return (
        <div className="w-full overflow-x-auto overflow-y-hidden mb-5 p-2 md:p-5">
            <div className="flex gap-4">
                {data.length > 0 ? (
                    data.map((d, i) => (
                        <Link
                            to={`/${d.media_type || title}/details/${d.id}`}
                            key={i}
                            className="min-w-[200px] sm:min-w-[250px] md:min-w-[15%] h-[35vh] bg-zinc-900 rounded-lg shadow-lg"
                        >
                            <img
                                className="w-full h-[55%] object-cover rounded-t-lg"
                                src={
                                    d.backdrop_path || d.poster_path
                                        ? `https://image.tmdb.org/t/p/original${
                                              d.backdrop_path || d.poster_path
                                          }`
                                        : noimage
                                }
                                alt=""
                            />
                            <div className="text-white p-3 h-[45%] overflow-y-auto">
                                <h1 className="text-lg md:text-xl font-semibold line-clamp-1">
                                    {d.name ||
                                        d.title ||
                                        d.original_name ||
                                        d.original_title}
                                </h1>
                                <p className="text-sm md:text-base">
                                    {d.overview.slice(0, 50)}...
                                    <span className="text-zinc-500"> more</span>
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <h1 className="text-2xl md:text-3xl mt-5 text-white font-black text-center w-full">
                        Nothing to show
                    </h1>
                )}
            </div>
        </div>
    );
};

export default HorizontalCards;

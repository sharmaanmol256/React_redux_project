import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
    document.title = "SCSDB | Person Details";
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.person);
    const dispatch = useDispatch();
    const [category, setcategory] = useState("movie");

    useEffect(() => {
        dispatch(asyncloadperson(id));
        return () => {
            dispatch(removeperson());
        };
    }, [id]);

    return info ? (
        <div className="p-4 md:px-[10%] w-full min-h-screen bg-[#1F1E24]">
            {/* Navigation */}
            <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-4 md:gap-10 text-lg md:text-xl">
                <Link
                    onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></Link>
            </nav>

            <div className="w-full flex flex-col md:flex-row gap-8">
                {/* Left Section - Profile */}
                <div className="w-full md:w-[20%]">
                    <img
                        className="w-full md:w-auto md:h-[35vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
                        src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
                        alt=""
                    />
                    
                    <hr className="my-6 border-none h-[2px] bg-zinc-500" />
                    
                    {/* Social Media Links */}
                    <div className="text-xl md:text-2xl text-white flex gap-5 flex-wrap">
                        {info.externalid.wikidata_id && (
                            <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
                                <i className="ri-earth-fill hover:text-[#6556CD]"></i>
                            </a>
                        )}
                        {info.externalid.facebook_id && (
                            <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
                                <i className="ri-facebook-circle-fill hover:text-[#6556CD]"></i>
                            </a>
                        )}
                        {info.externalid.instagram_id && (
                            <a target="_blank" href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
                                <i className="ri-instagram-fill hover:text-[#6556CD]"></i>
                            </a>
                        )}
                        {info.externalid.twitter_id && (
                            <a target="_blank" href={`https://twitter.com/${info.externalid.twitter_id}`}>
                                <i className="ri-twitter-x-fill hover:text-[#6556CD]"></i>
                            </a>
                        )}
                    </div>

                    {/* Personal Information */}
                    <div className="mt-6 space-y-4">
                        <h1 className="text-xl md:text-2xl text-zinc-400 font-semibold">
                            Personal Info
                        </h1>

                        <div className="space-y-1">
                            <h2 className="text-lg text-zinc-400 font-semibold">Known For</h2>
                            <p className="text-zinc-400">{info.detail.known_for_department}</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-lg text-zinc-400 font-semibold">Gender</h2>
                            <p className="text-zinc-400">{info.detail.gender === 2 ? "Male" : "Female"}</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-lg text-zinc-400 font-semibold">Birthday</h2>
                            <p className="text-zinc-400">{info.detail.birthday}</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-lg text-zinc-400 font-semibold">Deathday</h2>
                            <p className="text-zinc-400">
                                {info.detail.deathday ? info.detail.deathday : "Still Alive"}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-lg text-zinc-400 font-semibold">Place Of Birth</h2>
                            <p className="text-zinc-400">{info.detail.place_of_birth}</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-lg text-zinc-400 font-semibold">Also Known As</h2>
                            <p className="text-zinc-400">{info.detail.also_known_as.join(", ")}</p>
                        </div>
                    </div>
                </div>

                {/* Right Section - Details */}
                <div className="w-full md:w-[80%] md:pl-[5%]">
                    <h1 className="text-4xl md:text-6xl text-zinc-400 font-black mb-6">
                        {info.detail.name}
                    </h1>

                    <div className="mb-8">
                        <h2 className="text-xl text-zinc-400 font-semibold mb-3">Biography</h2>
                        <p className="text-zinc-400">{info.detail.biography}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg text-zinc-400 font-semibold mb-4">Known For</h2>
                        <HorizontalCards data={info.combinedCredits.cast} />
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-xl text-zinc-400 font-semibold">Acting</h2>
                            <Dropdown
                                title="Category"
                                options={["tv", "movie"]}
                                func={(e) => setcategory(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 list-disc text-zinc-400 w-full max-h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 rounded-lg p-4">
                            {info[category + "Credits"].cast.map((c, i) => (
                                <li
                                    key={i}
                                    className="hover:text-white p-4 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
                                >
                                    <Link to={`/${category}/details/${c.id}`}>
                                        <span>
                                            {c.name || c.title || c.original_name || c.original_title}
                                        </span>
                                        {c.character && (
                                            <span className="block ml-4 mt-2 text-sm">
                                                Character Name: {c.character}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default PersonDetails;

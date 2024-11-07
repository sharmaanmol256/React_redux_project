import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import noimage from "/noimage.jpeg";
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const TvDetails = () => {
    document.title = "SCSDB | Tv Show Details";
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.tv);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncloadtv(id));
        return () => {
            dispatch(removetv());
        };
    }, [id]);

    return info ? (
        <div className="relative w-full min-h-screen">
            {/* Background Overlay */}
            <div 
                className="fixed top-0 left-0 w-full h-full z-0"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 p-4 md:px-[10%]">
                {/* Navigation */}
                <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-4 md:gap-10 text-lg md:text-xl">
                    <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"></Link>
                    {info.detail.homepage && (
                        <a target="_blank" href={info.detail.homepage} className="hover:text-[#6556CD]">
                            <i className="ri-external-link-fill"></i>
                        </a>
                    )}
                    {info.externalid.wikidata_id && (
                        <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} className="hover:text-[#6556CD]">
                            <i className="ri-earth-fill"></i>
                        </a>
                    )}
                    {info.externalid.imdb_id && (
                        <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`} className="hover:text-[#6556CD]">
                            imdb
                        </a>
                    )}
                </nav>

                {/* Poster and Details */}
                <div className="w-full flex flex-col md:flex-row gap-8">
                    <img
                        className="w-full md:w-auto md:h-[50vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
                        src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
                        alt=""
                    />

                    <div className="content text-white">
                        <h1 className="text-3xl md:text-5xl font-black flex flex-wrap items-center gap-2">
                            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
                            <small className="text-xl md:text-2xl font-bold text-zinc-200">
                                ({info.detail.first_air_date.split("-")[0]})
                            </small>
                        </h1>

                        <div className="mt-3 mb-5 flex flex-wrap items-center gap-3">
                            <span className="rounded-full text-lg md:text-xl font-semibold bg-yellow-600 text-white w-12 h-12 md:w-[5vh] md:h-[5vh] flex justify-center items-center">
                                {(info.detail.vote_average * 10).toFixed()}<sup>%</sup>
                            </span>
                            <span className="font-semibold text-xl md:text-2xl">
                                User Score
                            </span>
                            <div className="flex flex-wrap gap-3 text-sm md:text-base">
                                <span>{info.detail.first_air_date}</span>
                                <span>{info.detail.genres.map(g => g.name).join(", ")}</span>
                                <span>{info.detail.runtime}min</span>
                            </div>
                        </div>

                        {info.detail.tagline && (
                            <h2 className="text-lg md:text-xl font-semibold italic text-zinc-200">
                                {info.detail.tagline}
                            </h2>
                        )}

                        <div className="mt-6">
                            <h2 className="text-xl md:text-2xl mb-2">Overview</h2>
                            <p className="text-sm md:text-base">{info.detail.overview}</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl md:text-2xl mb-2">TV Show Languages</h2>
                            <p className="text-sm md:text-base mb-6">{info.translations.join(", ")}</p>
                        </div>

                        <Link 
                            className="inline-block px-4 py-3 md:p-5 bg-[#6556CD] rounded-lg hover:bg-[#5346bd] transition-colors"
                            to={`${pathname}/trailer`}
                        >
                            <i className="text-xl ri-play-fill mr-3"></i>
                            Play Trailer
                        </Link>
                    </div>
                </div>

                {/* Watch Providers */}
                <div className="w-full md:w-[80%] flex flex-col gap-5 mt-10">
                    {info.watchproviders?.flatrate && (
                        <div className="flex flex-wrap gap-5 items-center text-white">
                            <h2 className="text-base md:text-lg w-full md:w-auto">Available on Platforms</h2>
                            <div className="flex flex-wrap gap-3">
                                {info.watchproviders.flatrate.map((w, i) => (
                                    <img
                                        key={i}
                                        title={w.provider_name}
                                        className="w-10 h-10 md:w-[5vh] md:h-[5vh] object-cover rounded-md"
                                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                        alt={w.provider_name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {info.watchproviders?.rent && (
                        <div className="flex flex-wrap gap-5 items-center text-white">
                            <h2 className="text-base md:text-lg w-full md:w-auto">Available on Rent</h2>
                            <div className="flex flex-wrap gap-3">
                                {info.watchproviders.rent.map((w, i) => (
                                    <img
                                        key={i}
                                        title={w.provider_name}
                                        className="w-10 h-10 md:w-[5vh] md:h-[5vh] object-cover rounded-md"
                                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                        alt={w.provider_name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {info.watchproviders?.buy && (
                        <div className="flex flex-wrap gap-5 items-center text-white">
                            <h2 className="text-base md:text-lg w-full md:w-auto">Available to Buy</h2>
                            <div className="flex flex-wrap gap-3">
                                {info.watchproviders.buy.map((w, i) => (
                                    <img
                                        key={i}
                                        title={w.provider_name}
                                        className="w-10 h-10 md:w-[5vh] md:h-[5vh] object-cover rounded-md"
                                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                        alt={w.provider_name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Seasons */}
                <div className="mt-10">
                    <hr className="mb-5 border-none h-[2px] bg-zinc-500" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Seasons</h2>
                    <div className="w-full overflow-x-auto pb-4">
                        <div className="flex gap-4">
                            {info.detail.seasons.length > 0 ? (
                                info.detail.seasons.map((s, i) => (
                                    <div key={i} className="flex-shrink-0 w-[180px] md:w-[15vh]">
                                        <img
                                            className="w-full h-[270px] md:h-[30vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
                                            src={s.poster_path ? `https://image.tmdb.org/t/p/original/${s.poster_path}` : noimage}
                                            alt={s.name}
                                        />
                                        <h3 className="text-lg md:text-2xl text-zinc-300 mt-3 font-semibold">
                                            {s.name}
                                        </h3>
                                    </div>
                                ))
                            ) : (
                                <h3 className="text-2xl md:text-3xl text-white font-black text-center w-full">
                                    Nothing to show
                                </h3>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="mt-10">
                    <hr className="mb-5 border-none h-[2px] bg-zinc-500" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Recommendations & Similar Shows
                    </h2>
                    <HorizontalCards
                        data={info.recommendations.length > 0 ? info.recommendations : info.similar}
                    />
                </div>
            </div>
            <Outlet />
        </div>
    ) : (
        <Loading />
    );
};

export default TvDetails;

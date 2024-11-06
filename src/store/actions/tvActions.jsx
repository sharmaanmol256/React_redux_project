// Actions
export { removetv } from "../reducers/tvSlice";
import { loadtv, setLoading, setError } from "../reducers/tvSlice";
import axios from "../../utils/axios";

// Constants for API endpoints
const TV_ENDPOINTS = {
    details: (id) => `/tv/${id}`,
    externalIds: (id) => `/tv/${id}/external_ids`,
    recommendations: (id) => `/tv/${id}/recommendations`,
    similar: (id) => `/tv/${id}/similar`,
    translations: (id) => `/tv/${id}/translations`,
    videos: (id) => `/tv/${id}/videos`,
    watchProviders: (id) => `/tv/${id}/watch/providers`
};

// Helper function to handle API calls
const fetchTvData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch ${endpoint}: ${error.message}`);
    }
};

// Main async action
export const asyncloadtv = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        // Fetch all data concurrently
        const [
            detail,
            externalid,
            recommendations,
            similar,
            translations,
            videos,
            watchproviders
        ] = await Promise.all([
            fetchTvData(TV_ENDPOINTS.details(id)),
            fetchTvData(TV_ENDPOINTS.externalIds(id)),
            fetchTvData(TV_ENDPOINTS.recommendations(id)),
            fetchTvData(TV_ENDPOINTS.similar(id)),
            fetchTvData(TV_ENDPOINTS.translations(id)),
            fetchTvData(TV_ENDPOINTS.videos(id)),
            fetchTvData(TV_ENDPOINTS.watchProviders(id))
        ]);

        // Process and structure the data
        const theultimatedetails = {
            detail,
            externalid,
            recommendations: recommendations.results || [],
            similar: similar.results || [],
            translations: translations.translations
                ?.map(t => t.english_name)
                .filter(Boolean) || [],
            videos: videos.results?.find(m => m.type === "Trailer") || null,
            watchproviders: watchproviders.results?.IN || null
        };

        dispatch(loadtv(theultimatedetails));
    } catch (error) {
        console.error("Error loading TV details:", error);
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

// Add a type for better type checking
export const TV_ACTION_TYPES = {
    LOAD_TV: 'tv/loadTv',
    SET_LOADING: 'tv/setLoading',
    SET_ERROR: 'tv/setError',
    REMOVE_TV: 'tv/removeTv'
};

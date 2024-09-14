import { defineStore } from "pinia";
import { useMovieStore } from "./movie.store.js";
import { ref } from "vue";

const url =
    "https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";

export const useSearchStore = defineStore("searchStore", () => {
    const loader = ref(false);
    const movies = ref([]);

    const getMovies = async (search) => {
        try {
            loader.value = true;
            const res = await fetch(`${url}${search}`);
            const data = await res.json();
            movies.value = data.results;
        } catch (error) {
            console.log(error)
        } finally {
            loader.value = false;
        }
    };

    const addToUserMovies = (object) => {
        const movieStore = useMovieStore();
        movieStore.movies.push({ ...object, isWatched: false });
        movieStore.activeTab = 1;
    };

    return {
        loader,
        movies,
        getMovies,
        addToUserMovies,
    };
});
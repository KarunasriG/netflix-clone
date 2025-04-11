import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];
    res.json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMovieTailers(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    console.error("Error fetching movie trailers:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMovieDetails(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.json({
      success: true,
      content: data,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarMovies(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`
    );
    res.status(200).json({
      success: true,
      similar: data.results,
    });
  } catch (error) {
    console.error("Error fetching similar movies:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMoviesByCategory(req, res) {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US`
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.error("Error fetching movies by category:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

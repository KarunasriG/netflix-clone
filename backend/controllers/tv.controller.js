import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results.length)];
    res.json({
      success: true,
      content: randomTv,
    });
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTvTailers(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    console.error("Error fetching Tv Show trailers:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTvDetails(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.json({
      success: true,
      content: data,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.error("Error fetching Tv Show details:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarTvs(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`
    );
    res.status(200).json({
      success: true,
      similar: data.results,
    });
  } catch (error) {
    console.error("Error fetching similar Tv Shows :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTvsByCategory(req, res) {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US`
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.error("Error fetching Tv shows by category:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

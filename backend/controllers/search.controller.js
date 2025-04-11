import User from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const person = response.results[0];

    // Check if this person already exists in searchHistory
    const user = await User.findById(req.user._id);
    const alreadyExists = user.searchHistory.some(
      (item) => item.id === person.id && item.searchType === "person"
    );

    if (!alreadyExists) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: person.id,
            image: person.profile_path,
            title: person.name,
            searchType: "person",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.error("Error in searchperson controller :", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const movie = response.results[0];

    // Check if the movie already exists in searchHistory
    const user = await User.findById(req.user._id);
    const alreadyExists = user.searchHistory.some(
      (item) => item.id === movie.id && item.searchType === "movie"
    );

    if (!alreadyExists) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: movie.id,
            image: movie.poster_path,
            title: movie.title,
            searchType: "movie",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.error("Error in search movie controller :", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const tv = response.results[0];

    // Check if the TV show already exists in searchHistory
    const user = await User.findById(req.user._id);
    const alreadyExists = user.searchHistory.some(
      (item) => item.id === tv.id && item.searchType === "tv"
    );

    if (!alreadyExists) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: tv.id,
            image: tv.poster_path,
            title: tv.name,
            searchType: "tv",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      content: response.results,
    });
  } catch (error) {
    console.error("Error fetching tv:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({
      success: true,
      content: req.user.searchHistory,
    });
  } catch (error) {
    console.error("Error fetching search history:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let id = parseInt(req.params.id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { searchHistory: { id: id } },
    });
    res.status(200).json({
      success: true,
      message: "Item removed from search history",
    });
  } catch (error) {
    console.error("Error removing item from search history:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

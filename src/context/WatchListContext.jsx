import { createContext } from "react";
import { useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListProvider = ({children}) => {
    const [watchlist, setWatchlist] = useState([]);
    const [genreList, setGenreList] = useState([]);

     useEffect(() => {
    
        let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=7facf11aee2da010ab5ca0261c8b58f1`
    
        // if(search){
        //   url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=7facf11aee2da010ab5ca0261c8b58f1`
        // }
    
        fetch(url)
        .then((response) => response.json())
        .then((data) => setGenreList(data.genres || []))
      }, [])

    const toggleWatchlist = (movie) => {
        const index = watchlist.findIndex((m) => m.id === movie.id);

        if(index === -1){
            setWatchlist([...watchlist, movie])
        }else{
            setWatchlist([
                ...watchlist.slice(0, index),
                ...watchlist.slice(index + 1)
            ]);
        }
    }
     console.log("watchList", watchlist)

    return (
        <WatchListContext.Provider value={{watchlist, toggleWatchlist, genreList}}>
            {children}
        </WatchListContext.Provider>
    )
}
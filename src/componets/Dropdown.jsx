import { useEffect, useState } from "react";
import './Dropdown.css';

function Dropdown({ searchcity, setSearchCity, display, setDisplay }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [results, setResults] = useState([]);
    

    useEffect(() => {
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchcity}&apiKey=${process.env.REACT_APP_AUTOCOMPLETE_APIKEY}`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.features.length === 0) {
                        setIsLoaded(false)
                    } else {
                        setIsLoaded(true);
                        setResults(result.features);
// 
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [searchcity]);




    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div>
                <ul className={display ? "city-lists" : "city-lists hidden"}>
                    {searchcity.length > 0 ? results.map((result, index) => (
                        <li
                            onClick={() => {
                                setSearchCity(result.properties.city);
                                setDisplay(false);
                            }}
                            className="city-list"
                            key={index}>
                            {result.properties.city}, <span className="country-code" >{result.properties.country_code}</span></li>
                    )) : <p></p>}
                </ul>
            </div>
        );
    }
}

export default Dropdown;

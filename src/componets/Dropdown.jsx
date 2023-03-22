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
                    {searchcity.length > 0 ? Array.from(new Set(results.filter(result => result.properties.city && result.properties.country_code).map(result => `${result.properties.city},${result.properties.country_code}`))).map((city, index) => (
                        <li
                            onClick={() => {
                                const [selectedCity, selectedCountryCode] = city.split(',');
                                setSearchCity(selectedCity);
                                setDisplay(false);
                            }}
                            className="city-list"
                            key={index}>
                            {city}
                        </li>
                    )) : <p></p>}
                </ul>
            </div>
        );
    }
}

export default Dropdown;

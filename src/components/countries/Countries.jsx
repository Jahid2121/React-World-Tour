import { useEffect } from "react";
import { useState } from "react";
import Country from "../country/Country";
import './Countries.css'

const Countries = () => {
    const [countries, setCountries] = useState([])

    const [visitedFlags, setVisitedFlags] = useState([])

    const [visitedCountries, setVisitedCountries] =useState([])

    const handleVisitedCountry = country => {
        console.log('Add this to your visited countries')
        console.log(country)
      const newVisitedCountries = [...visitedCountries, country]
      setVisitedCountries(newVisitedCountries)
    }

    const handleVisitedFlags = flag => {
        const newVisitedFlags = [...visitedFlags, flag]
        setVisitedFlags(newVisitedFlags)
    }

    useEffect(()=> {
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => setCountries(data))
    }, [])
    
    return (
<div>
    <h3>Countries: {countries.length}</h3>
    {/* Visited countries */}
    <div>
    <h5>Visited Countries: {visitedCountries.length}</h5>
    <ul>
        {
            visitedCountries.map(country => <li key={country.cca3}>{country.name?.common}</li>)
        }
        
    </ul>
    </div>
    <div className="flag-container">
        {
            visitedFlags.map((flag, idx) => <img key={idx} src={flag}></img> )
        }
    </div>
    <div className="country-container">
        {/* display countries */}
    {
        countries.map(country => <Country handleVisitedCountry={handleVisitedCountry} key={country.cca3}
            handleVisitedFlags={handleVisitedFlags}
             country={country}/>)
    }
    </div>
    
    
</div>
    );
};

export default Countries;
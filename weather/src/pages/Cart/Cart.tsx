import React, {useEffect, useState} from "react";
import cart from "./Cart.module.css"
import {IWeather} from "@/pages/api/redux_types";

export default function Cart () {

    const [location, setLocation] = useState(null);
    const [v_data, setData] = useState(null);

    function getWeather <IWeather> (city: string) : Promise<IWeather> {
        const url = 'http://api.weatherapi.com/v1/current.json?key=203f79b78a4f427ebd8212359232508&q='+city+'&aqi=no'
        console.log(url)
        return fetch(url)
            .then((response) => response.json())
            .then((data) => data as IWeather);
    }

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch('http://api.weatherapi.com/v1/current.json?key=203f79b78a4f427ebd8212359232508&q=Limassol&aqi=no');
            // const data = await response.json();
            const data = await getWeather<IWeather>('Valencia Spain')
            console.log('data')
            console.log(data)
            setData(data)

        }
        fetchData();
    }, []);

    console.log('v_data')
    console.log(v_data)

    return (
    <div>
        <h1>{v_data ? v_data.location.region : ''}</h1>
        <div className={cart.data}>
            <h1>{v_data ? v_data.current.temp_c : ''}</h1>
        </div>
    </div>
    )
}
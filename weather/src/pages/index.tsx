import Head from 'next/head'
import {useEffect, useState} from "react";
import {IWeather} from "@/pages/api/redux_types";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
       <div>
           <h1>{v_data ? v_data.current.temp_c : ''}</h1>
           <h1>{v_data ? v_data.location.region : ''}</h1>
       </div>
      </main>
    </>
  )
}

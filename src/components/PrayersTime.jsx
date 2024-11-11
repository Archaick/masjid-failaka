import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '@mantine/core';
import './PrayersTime.css'

const PrayersTime = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);

  const fetchPrayerTimes = async (date) => {
    try {
      const latitude = -6.2088;  // Latitude for Jakarta
      const longitude = 106.8456;  // Longitude for Jakarta
      const method = 20;  // KEMENAG - Kementerian Agama Republik Indonesia

      const response = await axios.get(`https://api.aladhan.com/v1/timings/${date}`, {
        params: { latitude, longitude, method },
      });

      console.log('a request has made')

      const timings = response.data.data.timings;
      const filteredTimings = {
        Fajr: timings.Fajr,
        Sunrise: timings.Sunrise,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      };

      // Convert each time to AM/PM format
      const formattedTimings = {};
      Object.entries(filteredTimings).forEach(([prayer, time]) => {
        formattedTimings[prayer] = formatToAMPM(time);
      });

      setTimeout(() => {
        setPrayerTimes(formattedTimings);
      }, 3000)

    } catch (err) {
      console.error('Error retrieving prayer times:', err);
    }
  };

  const formatToAMPM = (time) => {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  // makes request on today as an argument for every mounting on function fetchPrayerTimes
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-'); // Format date as DD-MM-YYYY
    fetchPrayerTimes(today);
  }, []);

  return (
    <div className='marquee-container'>
      {prayerTimes ? (
        <ul>
          {Object.entries(prayerTimes).map(([prayer, time]) => (
            <li key={prayer}>
              {prayer}: {time}
            </li>
          ))}
        </ul>
      ) : (
        <Loader size='lg' type='bars' color='#4ecca3'/>
      )}
    </div>
  );
};

export default PrayersTime;

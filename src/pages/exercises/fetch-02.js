import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { setupWorker, rest } from 'msw';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

chai.use(spies);

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { after, before, beforeEach, describe, it } = window;

    const response = {
      properties: {
        periods: [
          {
            number: 1,
            name: 'Today',
            startTime: '2020-11-22T07:00:00-05:00',
            endTime: '2020-11-22T18:00:00-05:00',
            isDaytime: true,
            temperature: 54,
            temperatureUnit: 'F',
            temperatureTrend: null,
            windSpeed: '13 mph',
            windDirection: 'E',
            icon: 'https://api.weather.gov/icons/land/day/ovc/rain,30?size=medium',
            shortForecast: 'Cloudy then Chance Very Light Rain',
            detailedForecast:
              'A chance of rain and a chance of drizzle after noon. Cloudy, with a high near 54. East wind around 13 mph. Chance of precipitation is 30%.',
          },
          {
            number: 2,
            name: 'Tonight',
            startTime: '2020-11-22T18:00:00-05:00',
            endTime: '2020-11-23T06:00:00-05:00',
            isDaytime: false,
            temperature: 53,
            temperatureUnit: 'F',
            temperatureTrend: 'rising',
            windSpeed: '13 mph',
            windDirection: 'SE',
            icon: 'https://api.weather.gov/icons/land/night/rain,70/rain,90?size=medium',
            shortForecast: 'Very Light Rain Likely',
            detailedForecast:
              'Rain likely and drizzle likely before 1am, then rain showers. Cloudy. Low around 53, with temperatures rising to around 56 overnight. Southeast wind around 13 mph. Chance of precipitation is 90%. New rainfall amounts between a quarter and half of an inch possible.',
          },
          {
            number: 3,
            name: 'Monday',
            startTime: '2020-11-23T06:00:00-05:00',
            endTime: '2020-11-23T18:00:00-05:00',
            isDaytime: true,
            temperature: 56,
            temperatureUnit: 'F',
            temperatureTrend: 'falling',
            windSpeed: '10 to 17 mph',
            windDirection: 'W',
            icon: 'https://api.weather.gov/icons/land/day/rain_showers,80/bkn?size=medium',
            shortForecast: 'Rain Showers then Partly Sunny',
            detailedForecast:
              'Rain showers before noon. Partly sunny. High near 56, with temperatures falling to around 45 in the afternoon. West wind 10 to 17 mph. Chance of precipitation is 80%. New rainfall amounts between a quarter and half of an inch possible.',
          },
        ],
      },
    };

    const worker = setupWorker(
      rest.get('https://api.weather.gov/gridpoints/OKX/35,33/forecast', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.status(200, 'OK'), ctx.json(response));
      })
    );

    describe('getWeather()', function() {
      before(function() {
        worker.start();
      });

      beforeEach(function() {
        const weather = document.querySelector('#weather');

        while (weather.firstChild) weather.firstChild.remove();
      });

      after(function() {
        worker.stop();
      });

      it("sends a fetch request to 'https://api.weather.gov/gridpoints/OKX/35,33/forecast'", async function() {
        const fetchSpy = chai.spy.on(window, 'fetch');

        // eslint-disable-next-line no-undef
        await getWeather();
        expect(fetchSpy, 'A fetch to the API was not found').to.have.been.called.with(
          'https://api.weather.gov/gridpoints/OKX/35,33/forecast'
        );
      });

      it('displays the first forecast', async function() {
        // eslint-disable-next-line no-undef
        await getWeather();

        const forecast = document.querySelectorAll('#weather .forecast')[0];

        const responseForecast = response.properties.periods[0];

        expect(forecast.querySelector('h2').textContent, 'h2 textContent').to.equal(
          responseForecast.name
        );
        expect(forecast.querySelector('h3').textContent, 'h3 textContent').to.equal(
          responseForecast.shortForecast
        );
        expect(forecast.querySelector('img').src, 'img src').to.equal(responseForecast.icon);
        expect(forecast.querySelector('.detail').textContent, 'p.detail textContent').to.equal(
          responseForecast.detailedForecast
        );
        expect(forecast.querySelector('.temp').textContent, 'p.temp textContent').to.include(
          responseForecast.temperature
        );
      });

      it('displays the second forecast', async function() {
        // eslint-disable-next-line no-undef
        await getWeather();

        const forecast = document.querySelectorAll('#weather .forecast')[1];

        const responseForecast = response.properties.periods[1];

        expect(forecast.querySelector('h2').textContent, 'h2 textContent').to.equal(
          responseForecast.name
        );
        expect(forecast.querySelector('h3').textContent, 'h3 textContent').to.equal(
          responseForecast.shortForecast
        );
        expect(forecast.querySelector('img').src, 'img src').to.equal(responseForecast.icon);
        expect(forecast.querySelector('.detail').textContent, 'p.detail textContent').to.equal(
          responseForecast.detailedForecast
        );
        expect(forecast.querySelector('.temp').textContent, 'p.temp textContent').to.include(
          responseForecast.temperature
        );
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <div className="exercise">
        <section id="weather"></section>
      </div>
    </Layout>
  );
}

export default Exercise;

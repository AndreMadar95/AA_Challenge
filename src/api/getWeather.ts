import dayjs from "dayjs";
import { Cities } from "../App";

type WeatherData = {
    [key: string]: {
        temp: number;
        weather: {
            description: string;
            icon: string;
        };
    };
};

type WeatherApiFormattedResponse = Promise<WeatherData>;
export const getWeatherData = async ({ city }: { city: Cities }) => {
    return fetch(
        `${process.env.OPENWEATHERMAP_API_URL}/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`
    )
        .then((resp) => resp.json())
        .then(({ list }) => {
            const rv = {};
            list.forEach((item) => {
                const formatedDate = dayjs(item.dt_txt).format("YYYY-MM-DD");
                if (rv[formatedDate]) {
                    return;
                }
                rv[formatedDate] = {
                    temp: item.main.temp,
                    weather: {
                        description: item.weather[0].main,
                        icon: item.weather[0].icon,
                    },
                };
            });

            return rv as WeatherApiFormattedResponse;
        });
};
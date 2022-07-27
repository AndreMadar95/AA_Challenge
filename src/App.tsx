import { Tab } from "@headlessui/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useRef, useState } from "react";
import isToday from "dayjs/plugin/isToday";
import { useResizeObserver } from "./hooks/useResizeObserver";
import { LargeCard, LargeCardWrapper } from "./components/LargeCard";
import { SmallCard } from "./components/SmallCard";
import { getWeatherData } from "./api/getWeather";

dayjs.extend(isToday);
dayjs().format();

const CITIES: Array<Cities> = ["MOSCOW", "TORONTO", "TOKYO"];
const dayMap = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat",
};

export type Cities = "MOSCOW" | "TORONTO" | "TOKYO";

const WeatherPanel = ({ city }: { city: Cities }) => {
  const { data, isLoading, isError } = useQuery(
    [city],
    () => getWeatherData({ city }),
  );

  const { width } = useResizeObserver();

  if (isError) {
    return (
      <LargeCardWrapper classNames="min-h-screen md:min-h-fixed-xl">
        <h3 className="text-red-400">
          Uh oh, something went wrong please refresh the page.
        </h3>
      </LargeCardWrapper>
    );
  }

  const dataLength = useMemo(
    () => (!isLoading ? Object.keys(data).length : 0),
    [isLoading, data]
  );
  
  const WeatherInfo = isLoading ? (
    <LargeCardWrapper classNames="min-h-screen md:min-h-fixed-xl">
      <h3>Loading...</h3>
    </LargeCardWrapper>
  ) : (
    <>
      {Object.entries(data).map(([key, val]) => {
        const isToday = dayjs(key).isToday();
        return (
          <>
            {(dayjs(key).isToday() || width < 1024) && (
              <LargeCardWrapper>
                <LargeCard
                  weather={val.weather.description}
                  temperature={val.temp}
                  icon={val.weather.icon}
                  text={isToday ? "Today" : dayMap[dayjs(key).get("day")]}
                />
              </LargeCardWrapper>
            )}
          </>
        );
      })}

      {width >= 1024 && (
        <div className="flex w-full h-full lg:flex-row">
          {Object.entries(data).map(([key, val], index) => (
            <>
              {!dayjs(key).isToday() && (
                <SmallCard
                  text={dayMap[dayjs(key).get("day")]}
                  icon={val.weather.icon}
                  weather={val.weather.description}
                  temperature={val.temp}
                  border={
                    index !== dataLength - 1 ? "border-r-2 border-white" : ""
                  }
                />
              )}
            </>
          ))}
        </div>
      )}
    </>
  );

  return <div className="h-full lg:min-h-fixed-xl">{WeatherInfo}</div>;
};

const TabPanelWrapper = ({ children }: { children: React.ReactNode }) => {
  const panelClasses = "w-full border-2 border-white rounded-md shadow-lg";
  return <Tab.Panel className={panelClasses}>{children}</Tab.Panel>;
};

export function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <main className="font-mono p-2 w-full h-full md:w-3/4 lg:w-1/2 flex md:justify-center md:items-center flex-col md:m-auto lg:max-w-xl min-h-screen">
        <Tab.Group>
          <Tab.List className={`flex gap-8 px-5 w-full justify-center mb-6`}>
            {CITIES.map((city) => (
              <Tab as={React.Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? `text-piction-blue font-bold`
                        : `text-oslo-gray`
                    }`}
                  >
                    {city}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={"w-full"}>
            {CITIES.map((city) => (
              <TabPanelWrapper>
                <WeatherPanel city={city} />
              </TabPanelWrapper>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </main>
    </QueryClientProvider>
  );
}

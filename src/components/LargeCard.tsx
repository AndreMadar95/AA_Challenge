export type LargeCardProps = {
  weather: string;
  temperature: number;
  icon: string;
  text?: string;
};

export const LargeCard = ({
  temperature,
  weather,
  icon,
  text = "Today",
}: LargeCardProps) => {
  return (
    <>
      <h1 className="text-center w-full text-oslo-gray">{text}</h1>
      <img
        src={`${process.env.OPENWEATHERMAP_ICON_URL}/${icon}@4x.png`}
        alt={`${weather} icon`}
        width={100}
        height={100}
        loading="eager"
      />

      <div>
        <p className="text-3xl font-bold leading-5 font-temperature">
          {Math.floor(temperature)}&deg;
        </p>
        <p className="text-2xl">Clouds</p>
      </div>
    </>
  );
};

export const LargeCardWrapper = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-center p-5 pb-8 flex-wrap border-b-2 border-white ${classNames}`}
    >
      {children}
    </div>
  );
};
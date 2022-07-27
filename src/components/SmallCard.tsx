import { LargeCardProps } from "./LargeCard";

type SmallCardProps = LargeCardProps & {
  border?: string;
};

export const SmallCard = ({
  text,
  weather,
  temperature,
  border = "",
  icon,
}: SmallCardProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full p-4 ${border}`}
    >
      <h3 className="text-oslo-gray">{text}</h3>
      <img
        src={`${process.env.OPENWEATHERMAP_ICON_URL}/${icon}@2x.png`}
        alt={`${weather} icon`}
        loading="eager"
        height={82}
        width={82}
      />
      <p className="font-bold font-temperature text-xl">
        {Math.floor(temperature)}&deg;
      </p>
    </div>
  );
};

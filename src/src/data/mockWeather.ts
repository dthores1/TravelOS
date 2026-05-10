export interface DestinationWeather {
  city: string;
  temp: number;
  unit: 'F' | 'C';
  summary: string;
  pack: string;
  iconName: 'sun' | 'cloud' | 'cloudSun' | 'snow' | 'rain';
}

export const destinationWeather: Record<string, DestinationWeather> = {
  'trip-sea-ord': {
    city: 'Chicago, IL',
    temp: 42,
    unit: 'F',
    summary: 'Chilly with partial clouds',
    pack: 'Pack a warm coat.',
    iconName: 'cloudSun'
  },
  'trip-ord-jfk': {
    city: 'New York, NY',
    temp: 51,
    unit: 'F',
    summary: 'Light drizzle this evening',
    pack: 'Bring a compact umbrella.',
    iconName: 'rain'
  },
  'trip-jfk-ywg': {
    city: 'Winnipeg, MB',
    temp: 18,
    unit: 'F',
    summary: 'Snow flurries, bitter cold',
    pack: 'Heavy parka, gloves, base layers.',
    iconName: 'snow'
  }
};
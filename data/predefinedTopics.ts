import { PredefinedTopic } from '../types';

export const PREDEFINED_TOPICS: PredefinedTopic[] = [
  {
    id: 'animals',
    label: 'Zvířata',
    icon: '🦁',
    color: 'bg-orange-100 border-orange-300 text-orange-800',
    items: [
      { english: 'Dog', czech: 'Pes', visualDescription: 'A happy dog', emoji: '🐕' },
      { english: 'Cat', czech: 'Kočka', visualDescription: 'A cute cat', emoji: '🐈' },
      { english: 'Elephant', czech: 'Slon', visualDescription: 'A big gray elephant', emoji: '🐘' },
      { english: 'Lion', czech: 'Lev', visualDescription: 'A lion with a mane', emoji: '🦁' },
      { english: 'Monkey', czech: 'Opice', visualDescription: 'A playful monkey', emoji: '🐒' },
      { english: 'Bird', czech: 'Pták', visualDescription: 'A colorful bird', emoji: '🐦' },
      { english: 'Fish', czech: 'Ryba', visualDescription: 'A swimming fish', emoji: '🐟' },
      { english: 'Rabbit', czech: 'Králík', visualDescription: 'A cute rabbit', emoji: '🐇' },
      { english: 'Bear', czech: 'Medvěd', visualDescription: 'A big bear', emoji: '🐻' },
      { english: 'Mouse', czech: 'Myš', visualDescription: 'A small mouse', emoji: '🐁' }
    ]
  },
  {
    id: 'transport',
    label: 'Doprava',
    icon: '🚗',
    color: 'bg-blue-100 border-blue-300 text-blue-800',
    items: [
      { english: 'Car', czech: 'Auto', visualDescription: 'A red car', emoji: '🚗' },
      { english: 'Bus', czech: 'Autobus', visualDescription: 'A yellow bus', emoji: '🚌' },
      { english: 'Train', czech: 'Vlak', visualDescription: 'A fast train', emoji: '🚆' },
      { english: 'Airplane', czech: 'Letadlo', visualDescription: 'A flying airplane', emoji: '✈️' },
      { english: 'Bicycle', czech: 'Kolo', visualDescription: 'A bicycle', emoji: '🚲' },
      { english: 'Boat', czech: 'Loď', visualDescription: 'A boat on water', emoji: '⛵' },
      { english: 'Rocket', czech: 'Raketa', visualDescription: 'A space rocket', emoji: '🚀' },
      { english: 'Truck', czech: 'Náklaďák', visualDescription: 'A big truck', emoji: '🚛' },
      { english: 'Helicopter', czech: 'Vrtulník', visualDescription: 'A flying helicopter', emoji: '🚁' },
      { english: 'Motorcycle', czech: 'Motorka', visualDescription: 'A fast motorcycle', emoji: '🏍️' }
    ]
  },
  {
    id: 'food',
    label: 'Jídlo',
    icon: '🍎',
    color: 'bg-red-100 border-red-300 text-red-800',
    items: [
      { english: 'Apple', czech: 'Jablko', visualDescription: 'A red apple', emoji: '🍎' },
      { english: 'Banana', czech: 'Banán', visualDescription: 'A yellow banana', emoji: '🍌' },
      { english: 'Pizza', czech: 'Pizza', visualDescription: 'A slice of pizza', emoji: '🍕' },
      { english: 'Ice Cream', czech: 'Zmrzlina', visualDescription: 'A cone of ice cream', emoji: '🍦' },
      { english: 'Bread', czech: 'Chleba', visualDescription: 'A loaf of bread', emoji: '🍞' },
      { english: 'Cheese', czech: 'Sýr', visualDescription: 'A piece of cheese', emoji: '🧀' },
      { english: 'Hamburger', czech: 'Hamburger', visualDescription: 'A tasty hamburger', emoji: '🍔' },
      { english: 'Carrot', czech: 'Mrkev', visualDescription: 'An orange carrot', emoji: '🥕' },
      { english: 'Strawberry', czech: 'Jahoda', visualDescription: 'A red strawberry', emoji: '🍓' },
      { english: 'Water', czech: 'Voda', visualDescription: 'A glass of water', emoji: '💧' }
    ]
  },
  {
    id: 'health',
    label: 'Zdraví',
    icon: '🩺',
    color: 'bg-green-100 border-green-300 text-green-800',
    items: [
      { english: 'Doctor', czech: 'Doktor', visualDescription: 'A doctor with a stethoscope', emoji: '👨‍⚕️' },
      { english: 'Hospital', czech: 'Nemocnice', visualDescription: 'A hospital building', emoji: '🏥' },
      { english: 'Medicine', czech: 'Lék', visualDescription: 'A pill or medicine', emoji: '💊' },
      { english: 'Nurse', czech: 'Zdravotní sestra', visualDescription: 'A nurse in uniform', emoji: '👩‍⚕️' },
      { english: 'Tooth', czech: 'Zub', visualDescription: 'A white tooth', emoji: '🦷' },
      { english: 'Heart', czech: 'Srdce', visualDescription: 'A red heart shape', emoji: '❤️' },
      { english: 'Bandage', czech: 'Obvaz', visualDescription: 'A medical bandage', emoji: '🩹' },
      { english: 'Ambulance', czech: 'Sanitka', visualDescription: 'An ambulance car', emoji: '🚑' },
      { english: 'Soap', czech: 'Mýdlo', visualDescription: 'A bar of soap', emoji: '🧼' },
      { english: 'Sleep', czech: 'Spánek', visualDescription: 'Sleeping person', emoji: '😴' }
    ]
  },
  {
    id: 'space',
    label: 'Vesmír',
    icon: '🚀',
    color: 'bg-indigo-100 border-indigo-300 text-indigo-800',
    items: [
      { english: 'Sun', czech: 'Slunce', visualDescription: 'The bright yellow sun', emoji: '☀️' },
      { english: 'Moon', czech: 'Měsíc', visualDescription: 'The moon in the night sky', emoji: '🌕' },
      { english: 'Star', czech: 'Hvězda', visualDescription: 'A shiny star', emoji: '⭐️' },
      { english: 'Earth', czech: 'Země', visualDescription: 'Planet Earth from space', emoji: '🌍' },
      { english: 'Rocket', czech: 'Raketa', visualDescription: 'A space rocket launching', emoji: '🚀' },
      { english: 'Astronaut', czech: 'Astronaut', visualDescription: 'An astronaut in a suit', emoji: '👨‍🚀' },
      { english: 'Alien', czech: 'Mimozemšťan', visualDescription: 'A friendly green alien', emoji: '👽' },
      { english: 'Planet', czech: 'Planeta', visualDescription: 'A ringed planet like Saturn', emoji: '🪐' },
      { english: 'Comet', czech: 'Kometa', visualDescription: 'A flying comet', emoji: '☄️' },
      { english: 'Telescope', czech: 'Dalekohled', visualDescription: 'A telescope to see stars', emoji: '🔭' }
    ]
  },
  {
    id: 'hockey',
    label: 'Hokej',
    icon: '🏒',
    color: 'bg-sky-50 border-sky-200 text-sky-800',
    items: [
      { english: 'Hockey Stick', czech: 'Hokejka', visualDescription: 'A wooden hockey stick', emoji: '🏒' },
      { english: 'Puck', czech: 'Puk', visualDescription: 'A black hockey puck', emoji: '⚫' },
      { english: 'Skates', czech: 'Brusle', visualDescription: 'Ice skates', emoji: '⛸️' },
      { english: 'Goal', czech: 'Branka', visualDescription: 'A hockey goal net', emoji: '🥅' },
      { english: 'Ice', czech: 'Led', visualDescription: 'Blue ice surface', emoji: '🧊' },
      { english: 'Helmet', czech: 'Helma', visualDescription: 'A safety helmet', emoji: '⛑️' },
      { english: 'Referee', czech: 'Rozhodčí', visualDescription: 'A referee with a whistle', emoji: '🦓' },
      { english: 'Trophy', czech: 'Pohár', visualDescription: 'A gold championship cup', emoji: '🏆' },
      { english: 'Team', czech: 'Tým', visualDescription: 'Hockey players together', emoji: '👕' },
      { english: 'Whistle', czech: 'Píšťalka', visualDescription: 'A referee whistle', emoji: '📣' }
    ]
  }
];
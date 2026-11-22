export const product = {
  id: 'awaystack',
  name: 'AwayStack',
  price: 1499,
  images: [
    {
      id: 'hero',
      src: '/images/hero.jpg',
      alt: 'AwayStack lick tower in cream peach with its wind-up dial and lick tray',
    },
    {
      id: 'cutaway',
      src: '/images/cutaway.jpg',
      alt: 'Cutaway view of AwayStack showing the six frozen lick cups stacked inside the tower',
    },
    {
      id: 'dial',
      src: '/images/dial.jpg',
      alt: 'Close up of the wind-up dial and coloured session flags on the base',
    },
    {
      id: 'scent',
      src: '/images/scent.jpg',
      alt: 'A person presenting an AwayStack cup to their dog',
    },
    {
      id: 'flavours',
      src: '/images/flavours.jpg',
      alt: 'Six bowls of AwayStack cup fillings in different colours',
    },
    {
      id: 'kit',
      src: '/images/kit.jpg',
      alt: 'The complete AwayStack kit laid out with tower, tray and flavour cups',
    },
  ],
  badges: ['No battery', 'No app', 'Dishwasher-safe food parts'],
  description:
    'Six frozen lick cups, served one at a time while you are out. Wind the dial in the morning, read the Day Report flags when you are home.',
  packs: [
    {
      id: 'awaystack',
      name: 'AwayStack',
      price: 1499,
      description: 'Tower, lick tray, scent band and 6 reusable cups.',
    },
    {
      id: 'starter-kit',
      name: 'Starter Kit',
      price: 1999,
      description: 'Everything in AwayStack, plus 12 flavour cups and a cup mould.',
    },
  ],
  addOns: [
    {
      id: 'refill',
      name: 'Flavour cup refill',
      price: 399,
      description: '12 frozen cups with different flavours.',
    },
    {
      id: 'scent-band',
      name: 'Spare scent band',
      price: 249,
      description: 'A spare band so you can swap while the other one is being cleaned.',
    },
  ],
};

export default product;

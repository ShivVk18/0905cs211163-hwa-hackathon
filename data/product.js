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
  delivery: {
    heading: 'Check delivery to your area',
    inputPlaceholder: 'Enter PIN code',
    buttonLabel: 'Check',
    invalidMessage: 'Please enter a valid six-digit PIN code.',
    availableMessage: 'We deliver to your area.',
    unavailableMessage: 'Delivery is not available in your area yet.',
  },
  trust: [
    {
      title: 'Free Delivery',
      description: 'All over India',
      icon: 'truck',
    },
    {
      title: '30-day returns',
      description: 'No questions asked',
      icon: 'undo',
    },
    {
      title: 'Cash on delivery',
      description: 'UPI and cards too',
      icon: 'rupee',
    },
  ],
  tabs: [
    {
      id: 'how-it-works',
      label: 'How it works',
      image: {
        src: '/images/inuse.jpg',
        alt: 'A dog using the AwayStack lick dispenser',
        width: 900,
        height: 687,
      },
      heading: 'Wind it. Leave it. It serves.',
      steps: [
        'Stack six frozen cups and close the lid.',
        'Turn the dial to 2, 4, 6 or 8 hours and select Calm Curve or Even spacing.',
        'At each session, the old cup drops into the bin, a fresh one slides into the tray, and a flag pops up.',
      ],
    },
    {
      id: 'whats-inside',
      label: "What's inside",
      image: {
        src: '/images/exploded.jpg',
        alt: 'Exploded view of AwayStack components',
        width: 687,
        height: 1024,
      },
      components: [
        'Twist-lock lid',
        'Six reusable cups',
        'Insulated tower',
        'Clockwork slide drawer',
        'Lick Tray with trapdoor',
        'Base with dial, flags and cup bin',
      ],
    },
    {
      id: 'specs',
      label: 'Specs',
      specs: [
        { label: 'Height', value: '30 cm' },
        { label: 'Base width', value: '22 cm' },
        { label: 'Weight', value: '1.4 kg' },
        { label: 'Cups', value: '6 × 120 ml, reusable' },
        { label: 'Timer', value: 'Wind-up clock spring, 2 / 4 / 6 / 8 hours' },
        { label: 'Modes', value: 'Calm Curve or Even spacing' },
        { label: 'Materials', value: 'BPA-free food-grade plastic and silicone' },
        { label: 'Cleaning', value: 'Food parts designed for dishwasher cleaning' },
      ],
    },
    {
      id: 'care-safety',
      label: 'Care & safety',
      cards: [
        {
          title: 'Safe for alone time',
          text: 'Introduce the product gradually and supervise initial sessions.',
          background: '#FBE0D4',
          wave: '#F5BFA6',
        },
        {
          title: 'Food stays fresh',
          text: 'Keep prepared cups frozen until loading and follow appropriate food-storage practices.',
          background: '#E7DDF7',
          wave: '#C9B6EC',
        },
        {
          title: 'First week',
          text: 'Start with short sessions and observe how your dog interacts with the dispenser.',
          background: '#D9F0E4',
          wave: '#A9DCC4',
        },
        {
          title: 'Dog-safe fillings only',
          text: 'Use ingredients suitable for your dog and account for individual dietary needs.',
          background: '#FDEFC4',
          wave: '#F7DC8A',
        },
      ],
    },
  ],
};

export default product;

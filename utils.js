// place for commonly used functions and such
export const stories = {
  "hhh" : [
    "The first time I heard the term International proletariat revolutionary struggle,",
    "I was about to punch the person who said it cuz I thought they were slipping me,",
    "thought they was disrespecting me. Why would you be talking to me like that?",
    "You want to talk to me and I don't even know what the fuck you even talking about",
    "I thought they was disrespecting me in the class cuz they was like \"What the",
    "fuck is international proletariat revolutionary struggle?\" and they was like Panther you",
    "supposed to know this and I'm like, I ain't never heard no shit like that.",
  ],
  "Baba Blair": [
    {
      "text": "The first time I heard the term International proletariat revolutionary struggle,",
      "time": 5.8,
    },
    {
      "text": "I was about to punch the person who said it cuz I thought they were slipping me,",
      "time": 9,
    },
    {
      "text": "thought they was disrespecting me. Why would you be talking to me like that?",
      "time": 12,
    },
    {
      "text": "You want to talk to me and I don't even know what the fuck you even talking about",
      "time": 14,
    },
    {
      "text": "I thought they was disrespecting me in the class cuz they was like what the",
      "time": 18,
    },
    {
      "text": "fuck is international proletariat revolutionary struggle and they was like Panther you",
      "time": 20.5,
    },
    {
      "text": "supposed to know this and I'm like, I ain't never heard no shit like that.",
      "time": null
    },
  ],
}

export const getDotAssets = state => {
  return state === 'New Mexico' ? {
    stateImg: '/img/new-mexico-01.png',
    color: '#00fcfc',
    top: 80,
    mobileTop: 60,
    mobileLeft: 5,
    left: 0
  } : state === 'Michigan' ? {
    stateImg: '/img/michigan-01.png',
    color: '#00ff00',
    top: 5,
    mobileTop: 17.5,
    mobileLeft: 55,
    left: 55
  } : {
    stateImg: '/img/west-virginia-01.png',
    color: '#ff00ff',
    top: 50,
    mobileTop: 68,
    mobileLeft: 65,
    left: 85
  }
}

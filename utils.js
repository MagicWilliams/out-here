import React, { useEffect } from 'react';

// place for commonly used functions and such
export const stories = {
  "Cora": [
    {
      "text": "Well, I think I've always had a passion for writing. It's just that I never thought I'd ever",
      "time": 5.8,
    },
    {
      "text": "write a book. So the high school that my husband attended and graduated from, I went",
      "time": 9,
    },
    {
      "text": "there for a few years before integration was named Aracoma High School. And every",
      "time": 12,
    },
    {
      "text": "year we still have an annual reunion. And at this particular time, the reunion was held in",
      "time": 14,
    },
    {
      "text": "Columbus, Ohio and us girls, quote unquote, were reminiscing about our days in school,",
      "time": 18,
    },
    {
      "text": "and one of them, we were making fun of some things that we had known that the grown",
      "time": 20.5,
    },
    {
      "text": "folks didn't think we knew. So she spoke up saying, you know, somebody ought to write",
      "time": 26,
    },
    {
      "text": "a book. I said, I'm going to do that. So when we came back home, I decided that I'd try.",
      "time": 35,
    },
    {
      "text": "And I just did from there, but I've always liked to write. My first book is titled: Faces",
      "time": 44,
    },
    {
      "text": "Behind the Dust and the dust is the coal dust. And it is the story of a coal miner's",
      "time": 53,
    },
    {
      "text": "daughter on the black side. This little nosy five and a half year old girl running the",
      "time": 62,
    },
    {
      "text": "hollers of Crystal Block or her little community and she thinks she's got the skinny on",
      "time": 71,
    },
    {
      "text": "eavesdropping, so she tells everybody's business in this book. And it's been quite a joy",
      "time": 80.0
    },
    {
      "text": "writing that book, and the response that I've had from it.",
      "time": null
    },
  ],
  "Shannon": [
    {
      "text": "Oof, feeling emotion for the first time and not numbing it with anything is an experience",
      "time": 5.8,
    },
    {
      "text": "that I'll never forget. Just, I don't want to say it's scary, but it kind of is, you know, feeling",
      "time": 9,
    },
    {
      "text": "yourself again, finding who you are again. But after you find it, it's great. I think I got lost.",
      "time": 12,
    },
    {
      "text": "That's how I explain it. Being in a box and just walking around, not doing anything, just",
      "time": 14,
    },
    {
      "text": "being stuck somewhere and not being able to get out, not being able to communicate,",
      "time": 18,
    },
    {
      "text": "be a mother, be a friend, or be anything you're just stuck. And that's what it felt like, but",
      "time": 20.5,
    },
    {
      "text": "time's still going. That never stops. So the world was going on and I was stuck in time.",
      "time": 26,
    },
    {
      "text": "That's what it felt like. Even being 13 I wanted to feel everything and I liked feeling",
      "time": 35,
    },
    {
      "text": "things that made me feel good, and that was bad, even at 13 because drugs made me",
      "time": 44,
    },
    {
      "text": "feel good. They made me feel invincible. They made me feel pretty, they made me feel",
      "time": 53,
    },
    {
      "text": "wanted and I didn't need anybody else. I just had drugs and that was fine cause it made",
      "time": 62,
    },
    {
      "text": "me feel everything that I needed to. When I had my son and he made me feel like that",
      "time": 71,
    },
    {
      "text": "cause he needed me. And he filled that void and made me want to be who I knew I",
      "time": 80.0
    },
    {
      "text": "could be, but on drugs I couldn't be that 'cause it just had me stuck.",
      "time": null
    },
  ],
  "Baba": [
    {
      "text": "I was imprisoned in this state. And when I first went to prison, think I was 24, 25. And",
      "time": 5.8,
    },
    {
      "text": "the men who I met, the Panthers who I met, the warriors who I met, the street legends",
      "time": 9,
    },
    {
      "text": "that I met, the monsters of fucking Michigan who I met. I met my best friends ever, you",
      "time": 12,
    },
    {
      "text": "know, and then many of us over in that span of time, you know, I watched us struggle",
      "time": 14,
    },
    {
      "text": "and die and... I stayed because of a sister. I met my Queen on Woodward. Downtown,",
      "time": 18,
    },
    {
      "text": "think she had just returned from think she said, Germany, or something. And these",
      "time": 20.5,
    },
    {
      "text": "thousands of people in Detroit, the person who draws my, just captures my attention is a Black Panther",
      "time": null
    },
  ],
  "Racquelle": [
    {
      "text": "America for me is like missing out on how good it feels to be there for other people, to",
      "time": 5.8,
    },
    {
      "text": "have genuine conversations with people, to like not deflect a lot. Yeah, because I do it",
      "time": 9,
    },
    {
      "text": "every day. Say, hey, how are you? Oh, I'm good. I'm not good. I'm a black trans woman",
      "time": 12,
    },
    {
      "text": "in America. I'm not good. I'm not happy, or whatever it is. It's like we don't check on our",
      "time": 14,
    },
    {
      "text": "neighbors. We overlook how women come up missing. We have this sense of",
      "time": 18,
    },
    {
      "text": "entitlement. I don't know. It's just so many things like, I guess that's the thing that is so",
      "time": 20.5,
    },
    {
      "text": "many things with America that's spun maybe out of control for me that it's too much shit",
      "time": 26
    },
    {
      "text": "to clean up. The realms of where my powers lie is in Detroit, in the black trans",
      "time": 35
    },
    {
      "text": "community. And it's a choice. If you don't do it in your powers and what's in your region",
      "time": 44
    },
    {
      "text": "and choose to do nothing, then you're adding to the problem. So for me, whether you",
      "time": 53
    },
    {
      "text": "like what I'm saying or not, I'm out here trying to fight the good fight.",
      "time": null
    }
  ],
  "Lorene": [
    {
      "text": "When I was in my twenties I heard prophecies from indigenous peoples, and I hear the",
      "time": 5.8,
    },
    {
      "text": "Apaches talk about things that are coming, and I'd like to share that one. People who",
      "time": 9,
    },
    {
      "text": "ask us is that, it's just some hard times coming for the people because Mother Earth is",
      "time": 12,
    },
    {
      "text": "going to cleanse herself because there's too many people on the planet. Some of the",
      "time": 14,
    },
    {
      "text": "technologies are being abused. You know, our people, the Wars, you know, all this stuff",
      "time": 18,
    },
    {
      "text": "that's happening on the planet. I don't know if you want to call it global warming or",
      "time": 20.5,
    },
    {
      "text": "whatever, but these hard times are coming. And I always tell people that I've seen",
      "time": 26
    },
    {
      "text": "prophecies come true in my lifetime, too, and I always think that there's some that",
      "time": 35
    },
    {
      "text": "haven't come true, but if I've seen these ones come true, why am I questioning whether",
      "time": 44
    },
    {
      "text": "these other ones are going to come true or not.",
      "time": null
    },
  ],
  "Angelo": [
    {
      "text": "Did you know that only 2% of our nation is involved in agricultural production for",
      "time": 5.8,
    },
    {
      "text": "everything we eat? And of that 2% of people, only two tenths of a percent of that 2% is",
      "time": 9,
    },
    {
      "text": "responsible for the actual production and growing of that food and the people who",
      "time": 12,
    },
    {
      "text": "actually touch the food. That whole 2% is all the grocery stores, the bagger boys, the",
      "time": 14,
    },
    {
      "text": "truck drivers, everybody who's involved in the transport and processing of that food. If",
      "time": 18,
    },
    {
      "text": "you think about it, if anything ever happened to our agriculturally productive land, prices",
      "time": 20.5,
    },
    {
      "text": "of our food is going to skyrocket. I'm very skeptical of our country's food system right",
      "time": 26,
    },
    {
      "text": "now, and that's why I love to grow and, you know, provide as much food, on our local",
      "time": 30,
    },
    {
      "text": "lands as we can. You know, like any way you can offset supporting this super fragile",
      "time": 37,
    },
    {
      "text": "system I think is a good way to do because guess what man, that's also a life skill. So",
      "time": 44,
    },
    {
      "text": "when this food system inevitably does crash, if you know how to grow some food or",
      "time": 51,
    },
    {
      "text": "plant some seed or have you've touched a soil and grown something to nurture it so that",
      "time": 56,
    },
    {
      "text": "way and turn it nurtures you, then you have that skill that you can carry on forever and",
      "time": 61,
    },
    {
      "text": "you can show other people and you don't have to be dependent on a food system that's so fragile",
      "time": null
    },

  ],
}

export const getDotAssets = state => {

  const miLocations = ['Detroit, Michigan', 'Highland Park, Michigan'];
  const wvLocations = ['Omar, West Virginia', 'Huntington, West Virginia'];
  const nmLocations = ['Taos, New Mexico', 'Dulce, New Mexico'];
  return nmLocations.includes(state) ? {
    stateImg: '/img/new-mexico-01.png',
    color: '#00fcfc',
    top: 70,
    mobileTop: 60,
    mobileLeft: 5,
    left: 18
  } : miLocations.includes(state) ? {
    stateImg: '/img/michigan-01.png',
    color: '#00ff00',
    top: 35,
    mobileTop: 17.5,
    mobileLeft: 55,
    left: 62.5
  } : {
    stateImg: '/img/west-virginia-01.png',
    color: '#ff00ff',
    top: 50,
    mobileTop: 68,
    mobileLeft: 65,
    left: 77.5
  }
}

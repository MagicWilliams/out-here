import React, { useState, useEffect } from 'react';

// place for commonly used functions and such
const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

export function useCurrentWidth() {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      console.log(getWidth());
      setWidth(getWidth())
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return width;
}

export const stories = {
  "Cora": [
    {
      "index": 1,
      "text": "Well, I think I've always had a passion for writing. It's just that I never thought I'd ever",
      "time": 7.0,
    },
    {
      "index": 2,
      "text": "write a book. So the high school that my husband attended and graduated from, I went",
      "time": 11.5,
    },
    {
      "index": 3,
      "text": "there for a few years before integration was named Aracoma High School. And every",
      "time": 17.7,
    },
    {
      "index": 4,
      "text": "year we still have an annual reunion. And at this particular time, the reunion was held in",
      "time": 25.7,
    },
    {
      "index": 5,
      "text": "Columbus, Ohio and us girls, quote unquote, were reminiscing about our days in school,",
      "time": 32.5 ,
    },
    {
      "index": 6,
      "text": "and one of them, we were making fun of some things that we had known that the grown",
      "time": 38.3,
    },
    {
      "index": 7,
      "text": "folks didn't think we knew. So she spoke up saying, you know, somebody ought to write",
      "time": 42.5,
    },
    {
      "index": 8,
      "text": "a book. I said, I'm going to do that. So when we came back home, I decided that I'd try.",
      "time": 48.5,
    },
    {
      "index": 9,
      "text": "And I just did from there, but I've always liked to write. My first book is titled: Faces",
      "time": 55.5,
    },
    {
      "index": 10,
      "text": "Behind the Dust and the dust is the coal dust. And it is the story of a coal miner's",
      "time": 61,
    },
    {
      "index": 11,
      "text": "daughter on the black side. This little nosy five and a half year old girl running the",
      "time": 66,
    },
    {
      "index": 12,
      "text": "hollers of Crystal Block or her little community and she thinks she's got the skinny on",
      "time": 74,
    },
    {
      "index": 13,
      "text": "eavesdropping, so she tells everybody's business in this book. And it's been quite a joy",
      "time": 80.0,
    },
    {
      "index": 14,
      "text": "writing that book, and the response that I've had from it.",
      "time": 83
    },
  ],
  "Shannon": [
    {
      "index": 1,
      "text": "Oof, feeling emotion for the first time and not numbing it with anything is an experience",
      "time": 7.4,
    },
    {
      "index": 2,
      "text": "that I'll never forget. Just, I don't want to say it's scary, but it kind of is, you know, feeling",
      "time": 15.5,
    },
    {
      "index": 3,
      "text": "yourself again, finding who you are again. But after you find it, it's great. I think I got lost.",
      "time": 22.6,
    },
    {
      "index": 4,
      "text": "That's how I explain it. Being in a box and just walking around, not doing anything, just",
      "time": 29.2,
    },
    {
      "index": 5,
      "text": "being stuck somewhere and not being able to get out, not being able to communicate,",
      "time": 35.4,
    },
    {
      "index": 6,
      "text": "be a mother, be a friend, or be anything you're just stuck. And that's what it felt like, but",
      "time": 41.1,
    },
    {
      "index": 7,
      "text": "time's still going. That never stops. So the world was going on and I was stuck in time.",
      "time": 47.3,
    },
    {
      "index": 8,
      "text": "That's what it felt like. Even being 13 I wanted to feel everything and I liked feeling",
      "time": 54.5,
    },
    {
      "index": 9,
      "text": "things that made me feel good, and that was bad, even at 13 because drugs made me",
      "time": 61.2,
    },
    {
      "index": 10,
      "text": "feel good. They made me feel invincible. They made me feel pretty, they made me feel",
      "time": 66.1,
    },
    {
      "index": 11,
      "text": "wanted and I didn't need anybody else. I just had drugs and that was fine cause it made",
      "time": 72,
    },
    {
      "index": 12,
      "text": "me feel everything that I needed to. When I had my son and he made me feel like that",
      "time": 78.3,
    },
    {
      "index": 13,
      "text": "cause he needed me. And he filled that void and made me want to be who I knew I",
      "time": 86.2
    },
    {
      "index": 14,
      "text": "could be, but on drugs I couldn't be that 'cause it just had me stuck.",
      "time": 91
    },
  ],
  "Baba": [
    {
      "index": 1,
      "text": "I was imprisoned in this state. And when I first went to prison, think I was 24, 25. And",
      "time": 8.7,
    },
    {
      "index": 2,
      "text": "the men who I met, the Panthers who I met, the warriors who I met, the street legends",
      "time": 15.4,
    },
    {
      "index": 3,
      "text": "that I met, the monsters of fucking Michigan who I met. I met my best friends ever, you",
      "time": 23.1,
    },
    {
      "index": 4,
      "text": "know, and then many of us over in that span of time, you know, I watched us struggle",
      "time": 29.3,
    },
    {
      "index": 5,
      "text": "and die and... I stayed because of a sister. I met my Queen on Woodward. Downtown,",
      "time": 39.4,
    },
    {
      "index": 6,
      "text": "think she had just returned from think she said, Germany, or something. And these",
      "time": 45.4,
    },
    {
      "index": 7,
      "text": "thousands of people in Detroit, the person who draws my, just captures my attention is a Black Panther",
      "time": 55
    },
  ],
  "Racquelle": [
    {
      "index": 1,
      "text": "America for me is like missing out on how good it feels to be there for other people, to",
      "time": 6.1,
    },
    {
      "index": 2,
      "text": "have genuine conversations with people, to like not deflect a lot. Yeah, because I do it",
      "time": 13.7,
    },
    {
      "index": 3,
      "text": "every day. Say, hey, how are you? Oh, I'm good. I'm not good. I'm a black trans woman",
      "time": 19.2,
    },
    {
      "index": 4,
      "text": "in America. I'm not good. I'm not happy, or whatever it is. It's like we don't check on our",
      "time": 25.5,
    },
    {
      "index": 5,
      "text": "neighbors. We overlook how women come up missing. We have this sense of",
      "time": 29.5,
    },
    {
      "index": 6,
      "text": "entitlement. I don't know. It's just so many things like, I guess that's the thing that is so",
      "time": 34.4,
    },
    {
      "index": 7,
      "text": "many things with America that's spun maybe out of control for me that it's too much shit",
      "time": 41,
    },
    {
      "index": 8,
      "text": "to clean up. The realms of where my powers lie is in Detroit, in the black trans",
      "time": 46.7
    },
    {
      "index": 9,
      "text": "community. And it's a choice. If you don't do it in your powers and what's in your region",
      "time": 51.7
    },
    {
      "index": 10,
      "text": "and choose to do nothing, then you're adding to the problem. So for me, whether you",
      "time": 56.5
    },
    {
      "index": 11,
      "text": "like what I'm saying or not, I'm out here trying to fight the good fight.",
      "time": 61
    }
  ],
  "Lorene": [
    {
      "index": 1,
      "text": "When I was in my twenties I heard prophecies from indigenous peoples, and I hear the",
      "time": 7,
    },
    {
      "index": 2,
      "text": "Apaches talk about things that are coming, and I'd like to share that one. People who",
      "time": 11.6,
    },
    {
      "index": 3,
      "text": "ask us is that, it's just some hard times coming for the people because Mother Earth is",
      "time": 18.5,
    },
    {
      "index": 4,
      "text": "going to cleanse herself because there's too many people on the planet. Some of the",
      "time": 23.2,
    },
    {
      "index": 5,
      "text": "technologies are being abused. You know, our people, the Wars, you know, all this stuff",
      "time": 29,
    },
    {
      "index": 6,
      "text": "that's happening on the planet. I don't know if you want to call it global warming or",
      "time": 32,
    },
    {
      "index": 7,
      "text": "whatever, but these hard times are coming. And I always tell people that I've seen",
      "time": 37.5
    },
    {
      "index": 8,
      "text": "prophecies come true in my lifetime, too, and I always think that there's some that",
      "time": 42.6
    },
    {
      "index": 9,
      "text": "haven't come true, but if I've seen these ones come true, why am I questioning whether",
      "time": 47.5
    },
    {
      "index": 10,
      "text": "these other ones are going to come true or not.",
      "time": 50
    },
  ],
  "Angelo": [
    {
      "index": 1,
      "text": "Did you know that only 2% of our nation is involved in agricultural production for",
      "time": 4,
    },
    {
      "index": 2,
      "text": "everything we eat? And of that 2% of people, only two tenths of a percent of that 2% is",
      "time": 11.3,
    },
    {
      "index": 3,
      "text": "responsible for the actual production and growing of that food and the people who",
      "time": 15.2,
    },
    {
      "index": 4,
      "text": "actually touch the food. That whole 2% is all the grocery stores, the bagger boys, the",
      "time": 20.3,
    },
    {
      "index": 5,
      "text": "truck drivers, everybody who's involved in the transport and processing of that food. If",
      "time": 25.4,
    },
    {
      "index": 6,
      "text": "you think about it, if anything ever happened to our agriculturally productive land, prices",
      "time": 30.3,
    },
    {
      "index": 7,
      "text": "of our food is going to skyrocket. I'm very skeptical of our country's food system right",
      "time": 34.7,
    },
    {
      "index": 8,
      "text": "now, and that's why I love to grow and, you know, provide as much food, on our local",
      "time": 40,
    },
    {
      "index": 9,
      "text": "lands as we can. You know, like any way you can offset supporting this super fragile",
      "time": 44,
    },
    {
      "index": 10,
      "text": "system I think is a good way to do because guess what man, that's also a life skill. So",
      "time": 50.5,
    },
    {
      "index": 11,
      "text": "when this food system inevitably does crash, if you know how to grow some food or",
      "time": 55,
    },
    {
      "index": 12,
      "text": "plant some seed or have you've touched a soil and grown something to nurture it so that",
      "time": 58.7,
    },
    {
      "index": 13,
      "text": "way and turn it nurtures you, then you have that skill that you can carry on forever and",
      "time": 63.1,
    },
    {
      "index": 14,
      "text": "you can show other people and you don't have to be dependent on a food system that's so fragile",
      "time": 68
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

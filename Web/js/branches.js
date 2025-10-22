let playerName = `${sessionStorage.getItem("playerName")}`;
let branches = [
    {
        "prompt": ["You are a retired police detective and crisis negotiator, Detective Hank House. You were made redundant by the Android police force introduced in 2038.", "Today however you received a phone call."],
        "options": [
            {
                "text": "ACCEPT PHONE CALL",
                "targetIndex": 1
            }
        ],
        "names": ["narrator"]
    },
    {
        "prompt": ["Unknown: Hank? Hank? Is this you?", "Unknown: We have a hostage situation in the apartment block on 5th and 42nd, 83rd floor. Can you help us out?"],
        "options": [
            {
                "text": "RESPOND",
                "targetIndex": 2
                // when we get to options that add an inventory item we can put a setState thing in here
            }
        ],
        "names": ["phone"]//,
        //"optionB": "No",
        //"variableName": "placeholder1"
     },
    {
        "prompt": ["Hank: Can’t your plastic do-it-alls do that for you? They already took my damn job.", "Unknown: They’re not particularly good in this situation, you’ll see why when you arrive.", "Hank: Okay, I’ll take your word for it."],
        "options": [
            {
                "text": "END CALL",
                "targetIndex": 3,
                "goTo": "lift.html"
            }
        ],
        "names": ["hank", "phone", "hank"]
        //,
        // "optionB": "No",
        // "variableName": "placeholder2"
    },
    {
        "prompt": ["[20 minutes later]", "You are in the lift of the apartment. The 83rd floor is the highest floor, you know people of high profile live here. You begin to wonder how a hostage even takes place in such a secure building.", "You arrive at the top and the door opens."],
        "options": [
            {
                "text": "EXIT THE LIFT",
                "targetIndex": 4,
                "goTo": "foyer.html"
            }
        ],
        "names": ["narrator"]
    },
    {
        "prompt": ["You step out of the lift, and now you're in the foyer.", "What would you like to do?"],
        "options": [
            {
                "text": "INVESTIGATE EMERGENCY EXIT",
                "targetIndex": 5
            },
            {
                "text": "TALK TO ANDROID",
                "setChoices": ["talkAndroid", true],
                "targetIndex": 6
            },
            {
                "text": "INVESTIGATE FURNITURE",
                "targetIndex": 7
            },
            {
                "text": "PROCEED TO HALLWAY",
                "requiredChoice": ["talkAndroid", true],
                "targetIndex": 8,
                "goTo": "hallway.html"
            }
                
        ],
        "names": ["narrator"]
    },
    //5
    {
        "prompt": ["You notice the emergency exit door has a large hole cut into it. The hostage-taker must've used the emergency exit to break in.", "Going round the stairwell, you notice the floor below has a hole cut in its door too. You return to the foyer."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 4,
                "changePromptIndex": 1,
                "timeLost": 7
            }
        ],
        "names": ["narrator"]
    },
    //6
    {
        "prompt": ["Hank: What can you tell me?", "Android: Hello, Detective House. At approximately 8:28pm, Mr. Elijah Lamb was taken hostage from his apartment on 5th street and 42nd avenue.", "Android: He is currently outside on the balcony held at gunpoint, but we have a NeoSapiens SWAT Team surrounding the hostage-taker from several other buildings."],
        "options": [
            {
                "text": "HOSTAGE-TAKER?",
                "targetIndex": 9,
                "timeLost": 5
            }
        ],
        "names": ["hank", "android", "android"]
    },
    //7
    {
        "prompt": ["There is a shelf as you come in. There are many letters addressed to a David Corr, many of which appear to be unopened. You see a photo of a family.", "The man is tall, with short blonde hair and dressed in a suit that has the NeoSapiens logo. The woman is short with short brown hair and no uniform, and she is carrying a large stack of books. The girl looks about 7."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 4,
                "setState": ["davidJobInfo", true],
                "timeLost": 6
            }
        ],
        "names": ["narrator"]
    },
    //8
    {
        "prompt": ["Standing in the hallway, you're surrounded by a few rooms. Where do you go?"],
        "options": [
            {
                "text": "GO TO MASTER BEDROOM",
                "targetIndex": 10,
                "goTo": "masterBedroom.html"
            },
            {
                "text": "GO TO KID'S BEDROOM",
                "targetIndex": 16,
                "goTo": "kidBedroom.html"
            },
            {
                "text": "GO TO BATHROOM",
                "targetIndex": 17,
                "goTo": "bathroom.html"
            },
            {
                "text": "GO TO KITCHEN/LIVING ROOM",
                "targetIndex": 18,
                "goTo": "kitchenLivingRoom.html"
            }
        ],
        "names": ["narrator"]
    },
    //9
    {
        "prompt": ["Hank: Who is the hostage-taker?", "Android: The hostage-taker is.", "Hank: ...is?", "Android: The hostage-taker is.", "An error code appears on the Android's face screen. Error 403: Forbidden information."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 4,
                "changePromptIndex": 1
            }
        ],
        "names": ["hank", "android", "hank", "android", "narrator"]
    },
    //10
    {
        "prompt": ["You step into the bedroom. You see a laptop, a bed, a wardrobe, a bookshelf, a chest of drawers, and the door."],
        "options": [
            {
                "text": "OPEN LAPTOP",
                "targetIndex": 11,
                "setState": ["manifesto", true]
            },
            {
                "text": "INVESTIGATE BED",
                "targetIndex": 12
            },
            {
                "text": "INVESTIGATE WARDROBE",
                "targetIndex": 13
            },
            {
                "text": "INVESTIGATE BOOKSHELF",
                "targetIndex": 14,
                "setState": ["gunKey", true]
            },
            {
                "text": "INVESTIGATE CHEST OF DRAWERS",
                "targetIndex": 15,
                "setState": ["divorceLetter", true]
            },
            {
                "text": "RETURN TO HALLWAY",
                "targetIndex": 8,
                "goTo": "hallway.html"
            }
        ],
        "names": ["narrator"]
    },
    //11
    {
        "prompt": ["The last thing written on the laptop was a manifesto. You skim through it briefly:", "&quot;Corrupt company...&quot;,&quot;...power hungry leader who's only wish is to increase the gap between working and middle class&quot;,&quot;...I can stop him because I know his plans...&quot;,&quot;...alienating human-to-human relationships...&quot;,&quot;...making the human redundant...&quot;"],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 10,
                "timeLost": 10
            }
        ],
        "names": ["narrator"]
    },
    //12
    {
        "prompt": ["It's a bed."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 10,
                "timeLost": 5
            }
        ],
        "names": ["narrator"]
    },
    //13
    {
        "prompt": ["You see several NeoSapiens uniforms hung up, as well as several suits and other fancy clothes. It's clear that this is a man with a civil mind most of the time."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 10,
                "timeLost": 7
            }
        ],
        "names": ["narrator"]
    },
    //14
    {
        "prompt": ["You see many books on the mind, health, and wellbeing. A considerable amount are on human anatomy and the way the brain works. Some are on corruption. There is an empty space, but dust suggests books may have laid there at a point, up until recently even.", "Just as you turn to go back, a glimmer of light catches your eye. You see a silver key and take it."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 10,
                "timeLost": 8
            }
        ],
        "names": ["narrator"]
    },
    //15
    {
        "prompt": ["You open the chest of drawers. You see several letters, including a NeoSapiens redundancy letters, divorce papers, and a letter from a woman.", "&quot;...incompetent as a husband and a father...&quot;,&quot;...you create things better at your job than you are...&quot;,&quot;...you will be next in being replaced in your line of work...&quot;,&quot;...only I will replace you first with the very thing you created...&quot;"],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 10,
                "timeLost": 9
            }
        ],
        "names": ["narrator"]
    },
    //16
    {
        "prompt": ["The place is a tip. The bed has been stripped, there are no toys, furniture is turned over. You literally cannot walk in."],
        "options": [
            {
                "text": "RETURN TO HALLWAY",
                "targetIndex": 8,
                "timeLost": 100,
                "goTo": "hallway.html"
            }
        ],
        "names": ["narrator"]
    },
    //17
    {
        "prompt": ["It's a bathroom."],
        "options": [
            {
                "text": "RETURN TO HALLWAY",
                "targetIndex": 8,
                "timeLost": 100,
                "goTo": "hallway.html"
            }
        ],
        "names": ["narrator"]
    },
    //18
    {
        "prompt": ["You step into the kitchen. The living room is crowded with NeoSapien Androids, waiting on the call to confront the hostage-taker."],
        "options": [
            {
                "text": "INVESTIGATE FLOOR",
                "targetIndex": 19
            },
            {
                "text": "INVESTIGATE KITCHEN FURTHER",
                "targetIndex": 20
            },
            {
                "text": "INVESTIGATE LIVING ROOM FURTHER",
                "targetIndex": 25
            },
            {
                "text": "RETURN TO HALLWAY",
                "targetIndex": 8,
                "goTo": "hallway.html"
            }
        ],
        "names": ["narrator"]
    },
    //19
    {
        "prompt": ["There is blood on the floor. Sign of a struggle?"],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 18,
                "timeLost": 5
            }
        ],
        "names": ["narrator"]
    },
    //20
    {
        "prompt": ["What would you like to investigate?"],
        "options": [
            {
                "text": "INVESTIGATE TABLE",
                "targetIndex": 21
            },
            {
                "text": "INVESTIGATE CUPBOARDS",
                "targetIndex": 22
            },
            {
                "text": "INVESTIGATE ELSEWHERE",
                "targetIndex": 18
            }
        ],
        "names": ["narrator"]
    },
    //21
    {
        "prompt": ["The table is a mess. But there's nothing remarkable about it."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 20,
                "timeLost": 100
            }
        ],
        "names": ["narrator"]
    },
    //22
    {
        "prompt": ["You look at all the cupboards. A lot of them are empty, there's a lot of cutlery and some food. Before you leave, you see a locked cupboard."],
        "options": [
            {
                "text": "ATTEMPT TO OPEN",
                "targetIndex": 23,
                "requiredState": ["gunKey", false],
                "timeLost": 6
            },
            {
                "text": "OPEN CUPBOARD",
                "targetIndex": 24,
                "requiredState": ["gunKey", true],
                "timeLost": 5
            },
            {
                "text": "GO BACK",
                "targetIndex": 20
            }
        ],
        "names": ["narrator"]
    },
    //23
    {
        "prompt": ["You cannot open this cupboard."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 20,
                "timeLost": 100
            }
        ],
        "names": ["narrator"]
    },
    //24
    {
        "prompt": ["You unlock the cupboard and find a pistol and ammunition. You take it."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 20,
                "setState": ["gun", true]
            }
        ],
        "names": ["narrator"]
    },
    //25
    {
        "prompt": ["What would you like to do?"],
        "options": [
            {
                "text": "WATCH TELEVISION",
                "targetIndex": 26
            },
            {
                "text": "TALK TO ANDROID",
                "targetIndex": 27
            },
            {
                "text": "GO OUTSIDE",
                "targetIndex": 28,
                "goTo": "outside.html"
            },
            {
                "text": "INVESTIGATE ELSEWHERE",
                "targetIndex": 18
            }
        ],
        "names": ["narrator"]
    },
    //26
    {
        "prompt": ["You see a social media platform playing a loop of videos of people losing their jobs over the years to Androids. You hear a familiar voice, as you see yourself 20 years prior on a news station discussing your layoff from detective work due to your work being deemed replaceable by Androids.", "Where did that get them?"],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 25,
                "timeLost": 8
            }
        ],
        "names": ["narrator"]
    },
    //27
    {
        "prompt": ["Android: We're waiting on you, Detective House."],
        "options": [
            {
                "text": "Continue",
                "targetIndex": 25
            }
        ],
        "names": ["android"]
    },
    //28
    {
        "prompt": ["You venture outside. A bullet narrowly misses you.", "DAVID: Don't come any closer or I'll shoot!"],
        "options": [
            {
                "text": "CONVINCE",
                "targetIndex": 29,
                "changeDavidEmotion": 1
            },
            {
                "text": "COMMAND",
                "targetIndex": 30,
                "changeDavidEmotion": -1
            },
            {
                "text": "HOSTAGE",
                "targetIndex": 31
            },
            {
                "text": "PLEAD",
                "targetIndex": 32
            }
        ],
        "names": ["narrator", "david"]
    },
    //29
    {
        "prompt": ["Hank: Don't shoot, I'm a human!", "David: Are you working for these pigs?", "Hank: I promise I'm not, but nobody needs to die here."],
        "options": [
            {
                "text": "CONVINCE",
                "targetIndex": 33,
                "changeDavidEmotion": 1
            },
            {
                "text": "COMMAND",
                "targetIndex": 34,
                "changeDavidEmotion": -1
            },
            {
                "text": "EMPATHISE",
                "targetIndex": 35,
                "changeDavidEmotion": 2,
                "requiredState": ["davidJobInfo", true]
            },
            {
                "text": "DIRECT",
                "targetIndex": 36,
                "changeDavidEmotion": -1,
                "requiredState": ["davidJobInfo", true]
            }
        ],
        "names": ["hank", "david", "hank"]
    },
    //30
    {
        "prompt": ["Hank: Put the gun down, and let the hostage free!", "David: Don't make me fire again!"],
        "options": [
            {
                "text": "CONVINCE",
                "targetIndex": 33,
                "changeDavidEmotion": 1
            },
            {
                "text": "COMMAND",
                "targetIndex": 34,
                "changeDavidEmotion": -1
            },
            {
                "text": "EMPATHISE",
                "targetIndex": 35,
                "changeDavidEmotion": 2,
                "requiredState": ["davidJobInfo", true]
            },
            {
                "text": "DIRECT",
                "targetIndex": 36,
                "changeDavidEmotion": -1,
                "requiredState": ["davidJobInfo", true]
            }
        ],
        "names": ["hank", "david"]
    },
    //31
    {
        "prompt": ["Hank: Elijah, are you okay?", "Elijah: Get me out of here!"],
        "options": [
            {
                "text": "CONVINCE",
                "targetIndex": 33,
                "changeDavidEmotion": 1
            },
            {
                "text": "COMMAND",
                "targetIndex": 34,
                "changeDavidEmotion": -1
            },
            {
                "text": "EMPATHISE",
                "targetIndex": 35,
                "changeDavidEmotion": 2,
                "requiredState": ["davidJobInfo", true]
            },
            {
                "text": "DIRECT",
                "targetIndex": 36,
                "changeDavidEmotion": -1,
                "requiredState": ["davidJobInfo", true]
            }
        ],
        "names": ["hank", "elijah"]
    },
    //32
    {
        "prompt": ["Hank: Please work with me, David.", "David: Why should I?"],
        "options": [
            {
                "text": "CONVINCE",
                "targetIndex": 33,
                "changeDavidEmotion": 1
            },
            {
                "text": "COMMAND",
                "targetIndex": 34,
                "changeDavidEmotion": -1
            },
            {
                "text": "EMPATHISE",
                "targetIndex": 35,
                "changeDavidEmotion": 2,
                "requiredState": ["davidJobInfo", true]
            },
            {
                "text": "DIRECT",
                "targetIndex": 36,
                "changeDavidEmotion": -1,
                "requiredState": ["davidJobInfo", true]
            }
        ],
        "names": ["hank", "david"]
    },
    //33 dialogue 2 start
    {
        "prompt": ["Hank: Nobody has to die here, David. Please, if you put the gun down, I promise you will live.", "David: How do you know? Why should I believe you?"],
        "options": [
            {
                "text": "CONVINCE",
                "targetIndex": 37,
                "changeDavidEmotion": 1
            },
            {
                "text": "COMMAND",
                "targetIndex": 38
            },
            {
                "text": "EMPATHISE",
                "targetIndex": 39,
                "changeDavidEmotion": 2,
                "requiredState": ["divorceLetter", true]
            },
            {
                "text": "DIRECT",
                "targetIndex": 40,
                "changeDavidEmotion": -2,
                "requiredState": ["divorceLetter", true]
            }
        ],
        "names": ["hank", "david"]
    },
    //34
    {
        "prompt": ["Hank: You're breaking the law, David. Put down the gun and let him go. The repercussions will be less detrimental if you do what I say.", "David: You have no idea what he did to me. What he did to you, to everyone!"],
        "options": [
            {
                "text": "CONVINCE",
                "targetIndex": 37,
                "changeDavidEmotion": 1
            },
            {
                "text": "COMMAND",
                "targetIndex": 38
            },
            {
                "text": "EMPATHISE",
                "targetIndex": 39,
                "changeDavidEmotion": 2,
                "requiredState": ["divorceLetter", true]
            },
            {
                "text": "DIRECT",
                "targetIndex": 40,
                "changeDavidEmotion": -2,
                "requiredState": ["divorceLetter", true]
            }
        ],
        "names": ["hank", "david"]
    },
    //35
    {
        "prompt": ["Hank: I know he replaced you with the very thing you worked on, David. It hurts to be replaced.", "David: How do you know that?", "Hank: We can get you a job if you let him go. I'm so sorry he did this to you."],
        "options": [
            {
                "text": "CONVINCE",
                "targetIndex": 37,
                "changeDavidEmotion": 1
            },
            {
                "text": "COMMAND",
                "targetIndex": 38
            },
            {
                "text": "EMPATHISE",
                "targetIndex": 39,
                "changeDavidEmotion": 2,
                "requiredState": ["divorceLetter", true]
            },
            {
                "text": "DIRECT",
                "targetIndex": 40,
                "changeDavidEmotion": -2,
                "requiredState": ["divorceLetter", true]
            }
        ],
        "names": ["hank", "david", "hank"]
    },
    //36
    {
        "prompt": ["Hank: This is a major overreaction for losing your job. It's his company, let him do what he wants.", "David: It was OUR company!", "Hank: Not anymore."],
        "options": [
            {
                "text": "CONVINCE",
                "targetIndex": 37,
                "changeDavidEmotion": 1
            },
            {
                "text": "COMMAND",
                "targetIndex": 38
            },
            {
                "text": "EMPATHISE",
                "targetIndex": 39,
                "changeDavidEmotion": 2,
                "requiredState": ["divorceLetter", true]
            },
            {
                "text": "DIRECT",
                "targetIndex": 40,
                "changeDavidEmotion": -2,
                "requiredState": ["divorceLetter", true]
            }
        ],
        "names": ["hank", "david", "hank"]
    },
    //37 dialogue 3 start
    {
        "prompt": ["Hank: I have no reason to lie to you, David. My job is to save people, not kill them.", "David: ..."],
        "options": [
            {
                "text": "HOSTAGE",
                "targetIndex": 41
            },
            {
                "text": "RIDICULE",
                "targetIndex": 42
            },
            {
                "text": "AGREE",
                "targetIndex": 43,
                "requiredState": ["manifesto", true]
            },
            {
                "text": "LOAD GUN",
                "targetIndex": 44,
                "requiredState": ["gun", true]
            }
        ],
        "names": ["hank", "david"]
    },
    //38
    {
        "prompt": ["Hank: Enough! Let the hostage go or face the consequences.", "David: ..."],
        "options": [
            {
                "text": "HOSTAGE",
                "targetIndex": 41
            },
            {
                "text": "RIDICULE",
                "targetIndex": 42
            },
            {
                "text": "AGREE",
                "targetIndex": 43,
                "requiredState": ["manifesto", true]
            },
            {
                "text": "LOAD GUN",
                "targetIndex": 44,
                "requiredState": ["gun", true]
            }
        ],
        "names": ["hank", "david"]
    },
    //39
    {
        "prompt": ["Hank: I know why she left you, David. It was horrible of her, but some people are just like that. It's not your fault, it's not the Android's fault, and it's not the hostage's fault. This lies entirely on her.", "David: If I hadn't helped create them... maybe we would still be together.", "Hank: Bad people will always be bad, David. Let the hostage go and I promise, we can get you all the help you need."],
        "options": [
            {
                "text": "HOSTAGE",
                "targetIndex": 41
            },
            {
                "text": "RIDICULE",
                "targetIndex": 42
            },
            {
                "text": "AGREE",
                "targetIndex": 43,
                "requiredState": ["manifesto", true]
            },
            {
                "text": "LOAD GUN",
                "targetIndex": 44,
                "requiredState": ["gun", true]
            }
        ],
        "names": ["hank", "david", "hank"]
    },
    //40
    {
        "prompt": ["Hank: I know why she left you, David. You weren't at home, the Android showered her with affection you weren't able to. And clearly, there's a level of insanity within you. She won't be the last one to leave if you keep this act up.", "David: HOW DARE YOU!"],
        "options": [
            {
                "text": "HOSTAGE",
                "targetIndex": 41
            },
            {
                "text": "RIDICULE",
                "targetIndex": 42
            },
            {
                "text": "AGREE",
                "targetIndex": 43,
                "requiredState": ["manifesto", true]
            },
            {
                "text": "LOAD GUN",
                "targetIndex": 44,
                "requiredState": ["gun", true]
            }
        ],
        "names": ["hank", "david"]
    },
    //41 dialogue 4 start
    {
        "prompt": ["Hank: Elijah, I promise we'll get to you soon.", "Elijah: Get me away from this psychopath!"],
        "options": [
            {
                "text": "SAVE HOSTAGE", // success
                "targetIndex": 45,
                "davidEmotionAbove": 4 // show if david emotion is above 4
            },
            {
                "text": "SAVE HOSTAGE", // fail
                "targetIndex": 46,
                "davidEmotionBelow": 5 // show if david emotion below 5
            },
            {
                "text": "ATTACK DAVID",
                "targetIndex": 47
            },
            {
                "text": "SAVE DAVID",
                "targetIndex": 48,
                "davidEmotionAbove": 8 // show if david emotion above 8
            },
            {
                "text": "SHOOT DAVID", // success
                "targetIndex": 49,
                "requiredChoice": ["gunLoaded", true],
                "requiredState": ["gun", true]
            },
            {
                "text": "SHOOT DAVID", // fail
                "targetIndex": 50,
                "requiredChoice": ["gunLoaded", false],
                "requiredState": ["gun", true]
            }
        ],
        "names": ["hank", "elijah"]
    },
    //42
    {
        "prompt": ["Hank: You are ridiculous, David! You're putting people's lives at risk because you feel you're not good enough. This can't go on any longer.", "David fires the gun at House, not to shoot him but to warn him again."],
        "options": [
            {
                "text": "SAVE HOSTAGE", // success
                "targetIndex": 45,
                "davidEmotionAbove": 4 // show if david emotion is above 4
            },
            {
                "text": "SAVE HOSTAGE", // fail
                "targetIndex": 46,
                "davidEmotionBelow": 5 // show if david emotion below 5
            },
            {
                "text": "ATTACK DAVID",
                "targetIndex": 47
            },
            {
                "text": "SAVE DAVID",
                "targetIndex": 48,
                "davidEmotionAbove": 8 // show if david emotion above 8
            },
            {
                "text": "SHOOT DAVID", // success
                "targetIndex": 49,
                "requiredChoice": ["gunLoaded", true],
                "requiredState": ["gun", true]
            },
            {
                "text": "SHOOT DAVID", // fail
                "targetIndex": 50,
                "requiredChoice": ["gunLoaded", false],
                "requiredState": ["gun", true]
            }
        ],
        "names": ["hank", "narrator"]
    },
    //43
    {
        "prompt": ["Hank: I've seen your manifesto, David. You're right, the Android is replacing the human. If you set the hostage down, I know you have to brains to put something into law to stop this takeover where it's at right now.", "David: It's all my fault..."],
        "options": [
            {
                "text": "SAVE HOSTAGE", // success
                "targetIndex": 45,
                "davidEmotionAbove": 4 // show if david emotion is above 4
            },
            {
                "text": "SAVE HOSTAGE", // fail
                "targetIndex": 46,
                "davidEmotionBelow": 5 // show if david emotion below 5
            },
            {
                "text": "ATTACK DAVID",
                "targetIndex": 47
            },
            {
                "text": "SAVE DAVID",
                "targetIndex": 48,
                "davidEmotionAbove": 8 // show if david emotion above 8
            },
            {
                "text": "SHOOT DAVID", // success
                "targetIndex": 49,
                "requiredChoice": ["gunLoaded", true],
                "requiredState": ["gun", true]
            },
            {
                "text": "SHOOT DAVID", // fail
                "targetIndex": 50,
                "requiredChoice": ["gunLoaded", false],
                "requiredState": ["gun", true]
            }
        ],
        "names": ["hank", "david"]
    },
    //44
    {
        "prompt": ["You load the gun and inch closer towards the two of them."],
        "options": [
            {
                "text": "SAVE HOSTAGE", // success
                "targetIndex": 45,
                "davidEmotionAbove": 4 // show if david emotion is above 4
            },
            {
                "text": "SAVE HOSTAGE", // fail
                "targetIndex": 46,
                "davidEmotionBelow": 5 // show if david emotion below 5
            },
            {
                "text": "ATTACK DAVID",
                "targetIndex": 47
            },
            {
                "text": "SAVE DAVID",
                "targetIndex": 48,
                "davidEmotionAbove": 8 // show if david emotion above 8
            },
            {
                "text": "SHOOT DAVID", // success
                "targetIndex": 49,
                "requiredChoice": ["gunLoaded", true],
                "requiredState": ["gun", true]
            },
            {
                "text": "SHOOT DAVID", // fail
                "targetIndex": 50,
                "requiredChoice": ["gunLoaded", false],
                "requiredState": ["gun", true]
            }
        ],
        "names": ["narrator"]
    },
    //45 hostage success
    {
        "prompt": ["You walk towards David. You beckon him to release the hostage with your hand. He complies. As the hostage runs inside, all of the SWAT Android team rush out, and fire all at once.", "Their aim is precise, and within seconds you are escorted away from David's lifeless body. The hostage waits with the police, as you are thanked for your efforts. Did you do the right thing? Who knows. But you lived.", "You won."],
        "names": ["narrator"]
    },
    //46 hostage fail
    {
        "prompt": ["You walk towards David. David panics, and fires his gun. Hitting you straight in the chest, you fall to your knees. David fires the gun and kills the hostage, before leaping off the edge of the balcony. You have no idea if he survived, but you didn't, and neither did the hostage.", "You lose."],
        "names": ["narrator"]
    },
    //47 attack
    {
        "prompt": ["You run towards David. David panics, and fires his gun. Hitting you straight in the chest, you fall to your knees. David falls off the edge of the balcony, hostage in hand. It's safe to say there are no human survivors.", "You lose."],
        "names": ["narrator"]
    },
    //48 david
    {
        "prompt": ["You walk towards David. You beckon him to release the hostage with your hand. He complies. As the hostage runs inside, all of the SWAT Android team rush out. You tell them to hold their fire. As you escort David inside, you hear Elijah yelp.", "Why are you listening to him? Listen to me! Shoot them!", "The two of you run inside and belt for the fire exit. As you descend the flights of stairs, you get breathless and tired. At the door, you are met by a human SWAT team who neutralise you and arrest the two of you. You're now a prisoner. But you know outside of those prison walls, you made an excellent impact on how people view AI. A revolution is starting.", "Did you win?"],
        "names": ["narrator"]
    },
    //49 shoot success
    {
        "prompt": ["You fire and hit David square between the eyes, as his body falls off the balcony. You set the gun down and walk towards Elijah. Escorting him into the house, you feel the lifeless stares of the Android SWAT team. Did you make the right choice?", "You win."],
        "names": ["narrator"]
    },
    //50 shoot fail
    {
        "prompt": ["You fire your gun and...", "...Nothing happens. But the threat of the gun is enough. David panics, and fires his gun. Hitting you straight in the chest, you fall to your knees. David fires the gun and kills the hostage, before leaping off the edge of the balcony. You have no idea if he survived, but you didn't, and neither did the hostage.", "You lose."],
        "names": ["narrator"]
    },
    //51 this is the ending you go to if you run out of time
    {
        "prompt": ["You hear a gunshot.", "You race to the balcony and see the hostage has been shot. David stands there as the SWAT team race out and shoot him.", "You lose."],
        "names": ["narrator"]
    }
]
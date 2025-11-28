"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FactoryIcon } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { ViewMiniApp } from "./view-miniapp";
import { useState } from "react";
import { Button } from "./ui/button";

const featured: string[] = ["bonfire", "crypto-hangman", "mangala"];

export function Marketplace() {
  const { data: projects } = useQuery({
    initialData: [
      {
        id: 19,
        name: "2d-to-3d-printer",
      },
      {
        id: 68,
        name: "budgetmate",
      },
      {
        id: 11,
        name: "spin-the-wheel",
      },
      {
        id: 64,
        name: "catpics",
      },
      {
        id: 3,
        name: "mental-healt-app",
      },
      {
        id: 6,
        name: "askmycrypto",
      },
      {
        id: 18,
        name: "gem-detctor",
      },
      {
        id: 22,
        name: "aqua-fish",
      },
      {
        id: 5,
        name: "openx-burn-checker",
      },
      {
        id: 4,
        name: "base",
      },
      {
        id: 8,
        name: "calculator",
      },
      {
        id: 23,
        name: "budget-tracker",
      },
      {
        id: 1,
        name: "plopmenz",
      },
      {
        id: 9,
        name: "cryptogastracker",
      },
      {
        id: 32,
        name: "advent-calendar",
      },
      {
        id: 47,
        name: "parasiteve",
      },
      {
        id: 15,
        name: "proof-of-vibe",
      },
      {
        id: 60,
        name: "complimentai",
      },
      {
        id: 14,
        name: "ai-powered-habit-tracker",
      },
      {
        id: 41,
        name: "baseapp",
      },
      {
        id: 12,
        name: "snake",
      },
      {
        id: 81,
        name: "languagetutor",
      },
      {
        id: 21,
        name: "ai-story-generator",
      },
      {
        id: 7,
        name: "base-snake",
      },
      {
        id: 58,
        name: "votemovies",
      },
      {
        id: 44,
        name: "cryptoscanner",
      },
      {
        id: 26,
        name: "rodefa-studio",
      },
      {
        id: 2,
        name: "cryptoblaster-2089",
      },
      {
        id: 46,
        name: "melltoy",
      },
      {
        id: 53,
        name: "mealplanner",
      },
      {
        id: 69,
        name: "namegenerator",
      },
      {
        id: 36,
        name: "portfoliohelper",
      },
      {
        id: 34,
        name: "unknown-invaders",
      },
      {
        id: 30,
        name: "tweet-tracker",
      },
      {
        id: 49,
        name: "mini-app-factory-guide",
      },
      {
        id: 20,
        name: "shill2earn",
      },
      {
        id: 39,
        name: "lotusflo",
      },
      {
        id: 24,
        name: "aibuddy",
      },
      {
        id: 52,
        name: "studyhelper",
      },
      {
        id: 40,
        name: "web3news",
      },
      {
        id: 10,
        name: "note-keeper",
      },
      {
        id: 48,
        name: "casidog",
      },
      {
        id: 13,
        name: "super-mario",
      },
      {
        id: 50,
        name: "mememaker",
      },
      {
        id: 51,
        name: "ai-girlfriend",
      },
      {
        id: 43,
        name: "quiz-calcio",
      },
      {
        id: 93,
        name: "bobreku",
      },
      {
        id: 61,
        name: "trackit",
      },
      {
        id: 54,
        name: "jokebot",
      },
      {
        id: 35,
        name: "had-tail",
      },
      {
        id: 33,
        name: "xt",
      },
      {
        id: 70,
        name: "randomquote",
      },
      {
        id: 17,
        name: "trendcast-vibes",
      },
      {
        id: 62,
        name: "lunch-time",
      },
      {
        id: 59,
        name: "charif45",
      },
      {
        id: 57,
        name: "crochet-stitches",
      },
      {
        id: 71,
        name: "cryptonews",
      },
      {
        id: 45,
        name: "trubiks",
      },
      {
        id: 63,
        name: "randomfacts",
      },
      {
        id: 65,
        name: "magic8ball",
      },
      {
        id: 16,
        name: "mario",
      },
      {
        id: 67,
        name: "riddlemaster",
      },
      {
        id: 66,
        name: "emojitranslator",
      },
      {
        id: 31,
        name: "snake-base",
      },
      {
        id: 77,
        name: "moodbooster",
      },
      {
        id: 28,
        name: "neuroweave",
      },
      {
        id: 72,
        name: "api04",
      },
      {
        id: 37,
        name: "gem-finder",
      },
      {
        id: 38,
        name: "sayhello",
      },
      {
        id: 55,
        name: "max",
      },
      {
        id: 97,
        name: "trendingnfts",
      },
      {
        id: 74,
        name: "crypto-blaster-2089",
      },
      {
        id: 90,
        name: "dont-worry",
      },
      {
        id: 75,
        name: "quickquiz",
      },
      {
        id: 78,
        name: "crypto-quiz",
      },
      {
        id: 80,
        name: "tag-me",
      },
      {
        id: 91,
        name: "misscrypto",
      },
      {
        id: 76,
        name: "bounce",
      },
      {
        id: 83,
        name: "maxi",
      },
      {
        id: 117,
        name: "bhimteck",
      },
      {
        id: 85,
        name: "cryptoswap",
      },
      {
        id: 87,
        name: "erenda",
      },
      {
        id: 144,
        name: "tradingjournalanalytics",
      },
      {
        id: 82,
        name: "myfirstapp",
      },
      {
        id: 106,
        name: "bitcoin-app",
      },
      {
        id: 86,
        name: "sui",
      },
      {
        id: 84,
        name: "pandorra",
      },
      {
        id: 92,
        name: "recipefinder",
      },
      {
        id: 79,
        name: "aigainzz",
      },
      {
        id: 88,
        name: "controlme",
      },
      {
        id: 89,
        name: "chatmix",
      },
      {
        id: 94,
        name: "irisout",
      },
      {
        id: 95,
        name: "budgettracker",
      },
      {
        id: 73,
        name: "tokensniper",
      },
      {
        id: 96,
        name: "unitown",
      },
      {
        id: 137,
        name: "aiwriter",
      },
      {
        id: 100,
        name: "rugchecker",
      },
      {
        id: 101,
        name: "horoscopeai",
      },
      {
        id: 99,
        name: "miniapp",
      },
      {
        id: 103,
        name: "btcelon",
      },
      {
        id: 147,
        name: "tokenanalyzer",
      },
      {
        id: 109,
        name: "jokeoftheday",
      },
      {
        id: 131,
        name: "cryptotips",
      },
      {
        id: 104,
        name: "movierecommender",
      },
      {
        id: 107,
        name: "cryptocalculator",
      },
      {
        id: 110,
        name: "fitnesstip",
      },
      {
        id: 142,
        name: "minicar",
      },
      {
        id: 111,
        name: "memequote",
      },
      {
        id: 114,
        name: "aiplanner",
      },
      {
        id: 113,
        name: "dailytrivia",
      },
      {
        id: 112,
        name: "kopmaster",
      },
      {
        id: 120,
        name: "tokenstats",
      },
      {
        id: 115,
        name: "quizer",
      },
      {
        id: 143,
        name: "nftexplorer",
      },
      {
        id: 124,
        name: "funfactai",
      },
      {
        id: 118,
        name: "quizmaster",
      },
      {
        id: 121,
        name: "kazuro",
      },
      {
        id: 126,
        name: "game",
      },
      {
        id: 119,
        name: "quizz",
      },
      {
        id: 127,
        name: "moodemoji",
      },
      {
        id: 125,
        name: "loner",
      },
      {
        id: 132,
        name: "memecaption",
      },
      {
        id: 122,
        name: "alongdrop91",
      },
      {
        id: 129,
        name: "mahanteck",
      },
      {
        id: 98,
        name: "vas1825",
      },
      {
        id: 105,
        name: "pengu",
      },
      {
        id: 133,
        name: "madhuritech",
      },
      {
        id: 130,
        name: "archer",
      },
      {
        id: 138,
        name: "recipeai",
      },
      {
        id: 134,
        name: "minigame",
      },
      {
        id: 123,
        name: "2048",
      },
      {
        id: 136,
        name: "santoshtech",
      },
      {
        id: 150,
        name: "ramu",
      },
      {
        id: 145,
        name: "jokemaker",
      },
      {
        id: 219,
        name: "sudoku",
      },
      {
        id: 146,
        name: "travelai",
      },
      {
        id: 141,
        name: "jyotitech",
      },
      {
        id: 149,
        name: "abhi",
      },
      {
        id: 116,
        name: "cheker",
      },
      {
        id: 151,
        name: "callai",
      },
      {
        id: 148,
        name: "harry",
      },
      {
        id: 218,
        name: "the-rice-and-cotton",
      },
      {
        id: 139,
        name: "moodpal",
      },
      {
        id: 56,
        name: "ideaspark",
      },
      {
        id: 128,
        name: "devil-app",
      },
      {
        id: 102,
        name: "uxgethh",
      },
      {
        id: 135,
        name: "dailymotivation",
      },
      {
        id: 170,
        name: "cryptosignal",
      },
      {
        id: 153,
        name: "studybuddy",
      },
      {
        id: 168,
        name: "niya",
      },
      {
        id: 140,
        name: "base-meta",
      },
      {
        id: 169,
        name: "swera",
      },
      {
        id: 159,
        name: "cheke",
      },
      {
        id: 156,
        name: "moodkin",
      },
      {
        id: 171,
        name: "airdrop",
      },
      {
        id: 172,
        name: "tokenswaphelper",
      },
      {
        id: 158,
        name: "bfdhd",
      },
      {
        id: 161,
        name: "jee",
      },
      {
        id: 164,
        name: "dik",
      },
      {
        id: 165,
        name: "nfttracker",
      },
      {
        id: 178,
        name: "genai",
      },
      {
        id: 173,
        name: "kk01",
      },
      {
        id: 166,
        name: "cryptoquiz",
      },
      {
        id: 162,
        name: "randommeme",
      },
      {
        id: 167,
        name: "storygenerator",
      },
      {
        id: 160,
        name: "me",
      },
      {
        id: 193,
        name: "ukyf",
      },
      {
        id: 154,
        name: "base-c",
      },
      {
        id: 155,
        name: "bdba",
      },
      {
        id: 174,
        name: "aptos",
      },
      {
        id: 186,
        name: "flip-the-coin",
      },
      {
        id: 180,
        name: "defiyieldfinder",
      },
      {
        id: 181,
        name: "jj",
      },
      {
        id: 108,
        name: "mgbase",
      },
      {
        id: 185,
        name: "0xburi",
      },
      {
        id: 157,
        name: "holiday-viewer",
      },
      {
        id: 176,
        name: "let-it-grow",
      },
      {
        id: 177,
        name: "proeckt",
      },
      {
        id: 163,
        name: "sudoku-puzzle",
      },
      {
        id: 183,
        name: "pedrocik",
      },
      {
        id: 182,
        name: "tokenprice",
      },
      {
        id: 184,
        name: "defiriskscanner",
      },
      {
        id: 187,
        name: "base-mini",
      },
      {
        id: 188,
        name: "santa-bai",
      },
      {
        id: 214,
        name: "mobile",
      },
      {
        id: 208,
        name: "bhupendra00",
      },
      {
        id: 190,
        name: "my-box",
      },
      {
        id: 191,
        name: "ktnn",
      },
      {
        id: 205,
        name: "salar",
      },
      {
        id: 197,
        name: "stablecointracker",
      },
      {
        id: 192,
        name: "drip",
      },
      {
        id: 217,
        name: "gogo",
      },
      {
        id: 194,
        name: "zec",
      },
      {
        id: 199,
        name: "sara",
      },
      {
        id: 204,
        name: "liquiditypoolmonitor",
      },
      {
        id: 200,
        name: "bercerk",
      },
      {
        id: 202,
        name: "beta",
      },
      {
        id: 203,
        name: "bambex",
      },
      {
        id: 207,
        name: "yieldoptimizer",
      },
      {
        id: 201,
        name: "maliknote",
      },
      {
        id: 206,
        name: "hero",
      },
      {
        id: 216,
        name: "website",
      },
      {
        id: 210,
        name: "btc",
      },
      {
        id: 211,
        name: "ux",
      },
      {
        id: 287,
        name: "liqhunter",
      },
      {
        id: 198,
        name: "farcore",
      },
      {
        id: 212,
        name: "spidy",
      },
      {
        id: 215,
        name: "kelso",
      },
      {
        id: 289,
        name: "futures",
      },
      {
        id: 196,
        name: "raghavai",
      },
      {
        id: 297,
        name: "rebalancemate",
      },
      {
        id: 179,
        name: "aiy",
      },
      {
        id: 195,
        name: "xoxo",
      },
      {
        id: 224,
        name: "test",
      },
      {
        id: 238,
        name: "everln",
      },
      {
        id: 242,
        name: "vfx",
      },
      {
        id: 239,
        name: "everyx",
      },
      {
        id: 237,
        name: "coffeshop",
      },
      {
        id: 245,
        name: "openaxi",
      },
      {
        id: 243,
        name: "bobo",
      },
      {
        id: 240,
        name: "era",
      },
      {
        id: 175,
        name: "base-survival",
      },
      {
        id: 189,
        name: "dragonbase",
      },
      {
        id: 221,
        name: "calender-app",
      },
      {
        id: 222,
        name: "inventory",
      },
      {
        id: 220,
        name: "make-a-mini-game-to-play-fun-with-animation-and-sounds",
      },
      {
        id: 225,
        name: "quickpay",
      },
      {
        id: 209,
        name: "nesle",
      },
      {
        id: 241,
        name: "baobab",
      },
      {
        id: 226,
        name: "on-chainactivitymonitor",
      },
      {
        id: 213,
        name: "laptop",
      },
      {
        id: 227,
        name: "boomber",
      },
      {
        id: 223,
        name: "historical",
      },
      {
        id: 228,
        name: "cryptomarket",
      },
      {
        id: 233,
        name: "umini",
      },
      {
        id: 230,
        name: "clock",
      },
      {
        id: 231,
        name: "defitracker",
      },
      {
        id: 232,
        name: "unique",
      },
      {
        id: 234,
        name: "motivation",
      },
      {
        id: 236,
        name: "uniqueapp",
      },
      {
        id: 246,
        name: "fruit-slice-challenge",
      },
      {
        id: 244,
        name: "nfttrade",
      },
      {
        id: 235,
        name: "based-snake",
      },
      {
        id: 247,
        name: "2442",
      },
      {
        id: 251,
        name: "trendpulse",
      },
      {
        id: 250,
        name: "voice-pinter",
      },
      {
        id: 255,
        name: "riskguard",
      },
      {
        id: 249,
        name: "mazapp",
      },
      {
        id: 248,
        name: "mishu",
      },
      {
        id: 252,
        name: "mejic",
      },
      {
        id: 253,
        name: "tokenvestingmonitor",
      },
      {
        id: 256,
        name: "cross-chaintracker",
      },
      {
        id: 257,
        name: "alertwhale",
      },
      {
        id: 260,
        name: "backtestlite",
      },
      {
        id: 263,
        name: "journalmind",
      },
      {
        id: 259,
        name: "cryptocalendar",
      },
      {
        id: 264,
        name: "videx",
      },
      {
        id: 258,
        name: "okx",
      },
      {
        id: 262,
        name: "bible-app",
      },
      {
        id: 261,
        name: "veic",
      },
      {
        id: 270,
        name: "slipguard",
      },
      {
        id: 300,
        name: "memes",
      },
      {
        id: 266,
        name: "arbipeek",
      },
      {
        id: 267,
        name: "audiose",
      },
      {
        id: 268,
        name: "mmiimyonce",
      },
      {
        id: 272,
        name: "orderbooklens",
      },
      {
        id: 271,
        name: "vinetr",
      },
      {
        id: 273,
        name: "volatilityradar",
      },
      {
        id: 269,
        name: "hima",
      },
      {
        id: 275,
        name: "coinsentinel",
      },
      {
        id: 276,
        name: "metaks",
      },
      {
        id: 277,
        name: "stx",
      },
      {
        id: 278,
        name: "nftfloorwatcher",
      },
      {
        id: 279,
        name: "defilending",
      },
      {
        id: 280,
        name: "gasgazer",
      },
      {
        id: 274,
        name: "gems",
      },
      {
        id: 281,
        name: "madler",
      },
      {
        id: 282,
        name: "corelation",
      },
      {
        id: 301,
        name: "micross",
      },
      {
        id: 283,
        name: "whalealert",
      },
      {
        id: 284,
        name: "triks",
      },
      {
        id: 290,
        name: "dcasim",
      },
      {
        id: 288,
        name: "agro-ins",
      },
      {
        id: 291,
        name: "poolscoop",
      },
      {
        id: 305,
        name: "zoo",
      },
      {
        id: 286,
        name: "www663",
      },
      {
        id: 298,
        name: "ismail",
      },
      {
        id: 302,
        name: "tokenburn",
      },
      {
        id: 265,
        name: "jgh",
      },
      {
        id: 229,
        name: "portfolio-manager",
      },
      {
        id: 42,
        name: "personal-assisstant",
      },
      {
        id: 254,
        name: "tini",
      },
      {
        id: 285,
        name: "fundrateflow",
      },
      {
        id: 293,
        name: "toyt",
      },
      {
        id: 295,
        name: "gapsniffer",
      },
      {
        id: 292,
        name: "ilcheck",
      },
      {
        id: 296,
        name: "ttrade",
      },
      {
        id: 311,
        name: "0xdepined",
      },
      {
        id: 327,
        name: "marex",
      },
      {
        id: 303,
        name: "snai",
      },
      {
        id: 306,
        name: "dexarbitrage",
      },
      {
        id: 304,
        name: "shoose",
      },
      {
        id: 307,
        name: "tokenlaunchmonitor",
      },
      {
        id: 331,
        name: "imagine",
      },
      {
        id: 312,
        name: "demof",
      },
      {
        id: 308,
        name: "seta",
      },
      {
        id: 309,
        name: "mygabi4",
      },
      {
        id: 313,
        name: "apps",
      },
      {
        id: 310,
        name: "getr",
      },
      {
        id: 314,
        name: "cryptofeargreedmeter",
      },
      {
        id: 315,
        name: "birthday-reminder-app",
      },
      {
        id: 318,
        name: "nftmintradar",
      },
      {
        id: 317,
        name: "qwwery",
      },
      {
        id: 316,
        name: "nodehealth",
      },
      {
        id: 320,
        name: "manic",
      },
      {
        id: 319,
        name: "trendy",
      },
      {
        id: 322,
        name: "maps",
      },
      {
        id: 323,
        name: "myself",
      },
      {
        id: 324,
        name: "name",
      },
      {
        id: 339,
        name: "hedas",
      },
      {
        id: 326,
        name: "bibi",
      },
      {
        id: 329,
        name: "aryan",
      },
      {
        id: 330,
        name: "kilo",
      },
      {
        id: 354,
        name: "aplee",
      },
      {
        id: 558,
        name: "simple-crypto-calculator",
      },
      {
        id: 333,
        name: "daoproposal",
      },
      {
        id: 332,
        name: "jedu",
      },
      {
        id: 335,
        name: "fitness",
      },
      {
        id: 334,
        name: "pixel-meme-wars",
      },
      {
        id: 336,
        name: "nftrarity",
      },
      {
        id: 338,
        name: "layer-2fee",
      },
      {
        id: 337,
        name: "apsaa",
      },
      {
        id: 328,
        name: "try",
      },
      {
        id: 372,
        name: "cryptotaxhelper",
      },
      {
        id: 342,
        name: "usserdropee",
      },
      {
        id: 294,
        name: "unlockwatch",
      },
      {
        id: 343,
        name: "refer",
      },
      {
        id: 346,
        name: "pro44",
      },
      {
        id: 347,
        name: "neko",
      },
      {
        id: 348,
        name: "tokenlockup",
      },
      {
        id: 349,
        name: "cheko",
      },
      {
        id: 321,
        name: "karman",
      },
      {
        id: 350,
        name: "krespo",
      },
      {
        id: 351,
        name: "game12",
      },
      {
        id: 353,
        name: "nftflooralertbot",
      },
      {
        id: 344,
        name: "bverse",
      },
      {
        id: 352,
        name: "lokas",
      },
      {
        id: 370,
        name: "proeck645",
      },
      {
        id: 357,
        name: "on-chainreputationscore",
      },
      {
        id: 359,
        name: "s4shahzaib",
      },
      {
        id: 358,
        name: "swapper",
      },
      {
        id: 360,
        name: "11fdf",
      },
      {
        id: 362,
        name: "rugpullpredictor",
      },
      {
        id: 361,
        name: "hendal",
      },
      {
        id: 363,
        name: "berri",
      },
      {
        id: 366,
        name: "blackmagic",
      },
      {
        id: 364,
        name: "tokenswap",
      },
      {
        id: 365,
        name: "defiroitracker",
      },
      {
        id: 369,
        name: "whalemovementtracker",
      },
      {
        id: 367,
        name: "jambo",
      },
      {
        id: 340,
        name: "flappy-coin",
      },
      {
        id: 371,
        name: "stakingpool",
      },
      {
        id: 368,
        name: "cardiosim",
      },
      {
        id: 374,
        name: "ezswap",
      },
      {
        id: 373,
        name: "layer-2activity",
      },
      {
        id: 299,
        name: "rock-paper-scissors",
      },
      {
        id: 561,
        name: "minecraft",
      },
      {
        id: 565,
        name: "stlill-back",
      },
      {
        id: 355,
        name: "law-bridge",
      },
      {
        id: 375,
        name: "gjjjgg",
      },
      {
        id: 377,
        name: "nftmintprofit",
      },
      {
        id: 376,
        name: "couw",
      },
      {
        id: 378,
        name: "financ",
      },
      {
        id: 379,
        name: "flashloan",
      },
      {
        id: 380,
        name: "appmame",
      },
      {
        id: 381,
        name: "quick-math",
      },
      {
        id: 382,
        name: "tokenholderdistribution",
      },
      {
        id: 383,
        name: "12212f",
      },
      {
        id: 385,
        name: "cryptovolatilitymeter",
      },
      {
        id: 386,
        name: "liquiditymining",
      },
      {
        id: 384,
        name: "exctrator",
      },
      {
        id: 388,
        name: "voice123",
      },
      {
        id: 387,
        name: "couww",
      },
      {
        id: 389,
        name: "smartcontractaudit",
      },
      {
        id: 390,
        name: "laubig",
      },
      {
        id: 414,
        name: "aapps",
      },
      {
        id: 396,
        name: "wonderland",
      },
      {
        id: 392,
        name: "111110",
      },
      {
        id: 391,
        name: "high-five",
      },
      {
        id: 415,
        name: "bogoblog",
      },
      {
        id: 400,
        name: "dope",
      },
      {
        id: 416,
        name: "alias",
      },
      {
        id: 422,
        name: "meme-launchpad",
      },
      {
        id: 397,
        name: "goondrop",
      },
      {
        id: 398,
        name: "crypto-will",
      },
      {
        id: 430,
        name: "generation-snake",
      },
      {
        id: 402,
        name: "smart",
      },
      {
        id: 403,
        name: "keyback",
      },
      {
        id: 557,
        name: "market-mood-log",
      },
      {
        id: 394,
        name: "robo",
      },
      {
        id: 404,
        name: "bokies",
      },
      {
        id: 405,
        name: "okitel",
      },
      {
        id: 399,
        name: "windylam",
      },
      {
        id: 406,
        name: "inessik",
      },
      {
        id: 407,
        name: "promo",
      },
      {
        id: 420,
        name: "layk",
      },
      {
        id: 409,
        name: "minidapp",
      },
      {
        id: 411,
        name: "write",
      },
      {
        id: 410,
        name: "crypto-influencer-trading",
      },
      {
        id: 412,
        name: "jancok",
      },
      {
        id: 408,
        name: "gasguardian-ai",
      },
      {
        id: 417,
        name: "no-loss-prediction-market-dapp",
      },
      {
        id: 423,
        name: "solitude",
      },
      {
        id: 421,
        name: "aicall",
      },
      {
        id: 418,
        name: "dragon-hunter",
      },
      {
        id: 419,
        name: "apka",
      },
      {
        id: 429,
        name: "zeuqram",
      },
      {
        id: 401,
        name: "origin",
      },
      {
        id: 424,
        name: "kinetica",
      },
      {
        id: 395,
        name: "speedzgame",
      },
      {
        id: 427,
        name: "daily-fantasy-sports",
      },
      {
        id: 425,
        name: "runner-arena",
      },
      {
        id: 428,
        name: "programming-hub",
      },
      {
        id: 432,
        name: "base-pet-game",
      },
      {
        id: 563,
        name: "position-size-helper",
      },
      {
        id: 431,
        name: "times-2048",
      },
      {
        id: 434,
        name: "snake-rush",
      },
      {
        id: 436,
        name: "perligos",
      },
      {
        id: 29,
        name: "billionzeon-app",
      },
      {
        id: 466,
        name: "pumpit",
      },
      {
        id: 439,
        name: "trending-creators",
      },
      {
        id: 456,
        name: "kreator",
      },
      {
        id: 441,
        name: "hndratz",
      },
      {
        id: 440,
        name: "basebuilder",
      },
      {
        id: 455,
        name: "power",
      },
      {
        id: 442,
        name: "based-secrets",
      },
      {
        id: 443,
        name: "nitoryu-90",
      },
      {
        id: 445,
        name: "hhambrs",
      },
      {
        id: 447,
        name: "testermitch",
      },
      {
        id: 446,
        name: "golik",
      },
      {
        id: 448,
        name: "wlguide",
      },
      {
        id: 449,
        name: "williamrgz",
      },
      {
        id: 450,
        name: "abeddehmet",
      },
      {
        id: 444,
        name: "dokken",
      },
      {
        id: 451,
        name: "gordon",
      },
      {
        id: 452,
        name: "bibl",
      },
      {
        id: 458,
        name: "elsa",
      },
      {
        id: 454,
        name: "donnaapp",
      },
      {
        id: 457,
        name: "seregachers",
      },
      {
        id: 470,
        name: "alt",
      },
      {
        id: 453,
        name: "prince139",
      },
      {
        id: 460,
        name: "ok",
      },
      {
        id: 462,
        name: "bb-vine",
      },
      {
        id: 463,
        name: "cryptoogs",
      },
      {
        id: 469,
        name: "cat-kit",
      },
      {
        id: 461,
        name: "xnxx",
      },
      {
        id: 464,
        name: "fast",
      },
      {
        id: 467,
        name: "cripta",
      },
      {
        id: 471,
        name: "genesisnft",
      },
      {
        id: 475,
        name: "remove",
      },
      {
        id: 468,
        name: "rasheed",
      },
      {
        id: 465,
        name: "open-tech",
      },
      {
        id: 477,
        name: "tokeninflationtracker",
      },
      {
        id: 472,
        name: "daovotingpower",
      },
      {
        id: 27,
        name: "popping-balloons",
      },
      {
        id: 473,
        name: "st",
      },
      {
        id: 474,
        name: "cycl",
      },
      {
        id: 476,
        name: "nftauction",
      },
      {
        id: 480,
        name: "licvid",
      },
      {
        id: 479,
        name: "imback07",
      },
      {
        id: 481,
        name: "cross-chainportfolio",
      },
      {
        id: 482,
        name: "tokenairdrop",
      },
      {
        id: 486,
        name: "crypto-bazaar",
      },
      {
        id: 484,
        name: "clot",
      },
      {
        id: 483,
        name: "xbt",
      },
      {
        id: 490,
        name: "tokenunlock",
      },
      {
        id: 488,
        name: "nftcollection",
      },
      {
        id: 487,
        name: "dexvolume",
      },
      {
        id: 491,
        name: "eric",
      },
      {
        id: 492,
        name: "smartmoneyflow",
      },
      {
        id: 485,
        name: "nft-marketplace",
      },
      {
        id: 459,
        name: "alta",
      },
      {
        id: 562,
        name: "crypto-checklist-for-new-projects",
      },
      {
        id: 564,
        name: "123456",
      },
      {
        id: 567,
        name: "cerc",
      },
      {
        id: 551,
        name: "risk-level-selector",
      },
      {
        id: 493,
        name: "seve-many",
      },
      {
        id: 478,
        name: "base-count-badge",
      },
      {
        id: 489,
        name: "nba-quiz",
      },
      {
        id: 494,
        name: "man",
      },
      {
        id: 496,
        name: "zeanlo",
      },
      {
        id: 495,
        name: "when-tge",
      },
      {
        id: 497,
        name: "kowshik",
      },
      {
        id: 498,
        name: "cryptoportfolio",
      },
      {
        id: 500,
        name: "tokenvesting",
      },
      {
        id: 501,
        name: "my-test-app",
      },
      {
        id: 502,
        name: "gamified",
      },
      {
        id: 503,
        name: "community-finance-tracker",
      },
      {
        id: 504,
        name: "saddycat",
      },
      {
        id: 505,
        name: "fabeau",
      },
      {
        id: 507,
        name: "emojigame",
      },
      {
        id: 509,
        name: "defiyield",
      },
      {
        id: 506,
        name: "ccc",
      },
      {
        id: 510,
        name: "cryptoairdropchecker",
      },
      {
        id: 527,
        name: "master-piace",
      },
      {
        id: 515,
        name: "kalk",
      },
      {
        id: 520,
        name: "novtaz97",
      },
      {
        id: 499,
        name: "walletscan",
      },
      {
        id: 512,
        name: "cryptoprice",
      },
      {
        id: 513,
        name: "dailycryptosnapshot",
      },
      {
        id: 517,
        name: "tokencountdown",
      },
      {
        id: 516,
        name: "bembi",
      },
      {
        id: 519,
        name: "cryptomarketsummary",
      },
      {
        id: 537,
        name: "crochet-school-assistant",
      },
      {
        id: 518,
        name: "open",
      },
      {
        id: 521,
        name: "220803",
      },
      {
        id: 523,
        name: "simpleportfolio",
      },
      {
        id: 526,
        name: "promt",
      },
      {
        id: 544,
        name: "nft-mint-reminder",
      },
      {
        id: 530,
        name: "dailytopgainerstable",
      },
      {
        id: 524,
        name: "boxer",
      },
      {
        id: 531,
        name: "basictokeninfo",
      },
      {
        id: 528,
        name: "play-to-earn",
      },
      {
        id: 522,
        name: "shehu-ibrahim",
      },
      {
        id: 525,
        name: "binyxt",
      },
      {
        id: 545,
        name: "oken-unlock-schedule-lite",
      },
      {
        id: 529,
        name: "destroy-machine",
      },
      {
        id: 534,
        name: "hrfty",
      },
      {
        id: 533,
        name: "teddi",
      },
      {
        id: 532,
        name: "ggttr",
      },
      {
        id: 514,
        name: "mind-game",
      },
      {
        id: 535,
        name: "marp-app",
      },
      {
        id: 536,
        name: "msender",
      },
      {
        id: 511,
        name: "base-gas",
      },
      {
        id: 538,
        name: "token-supply-overview",
      },
      {
        id: 539,
        name: "basic-token-performance-chart",
      },
      {
        id: 543,
        name: "hit-game",
      },
      {
        id: 541,
        name: "smcc-app",
      },
      {
        id: 547,
        name: "crypto-goal-tracker",
      },
      {
        id: 540,
        name: "deep-seek",
      },
      {
        id: 546,
        name: "token-priority-list",
      },
      {
        id: 550,
        name: "portfolio-allocation-planner",
      },
      {
        id: 552,
        name: "roullette",
      },
      {
        id: 548,
        name: "kiklab",
      },
      {
        id: 556,
        name: "token-ranking-list",
      },
      {
        id: 569,
        name: "deddi",
      },
      {
        id: 553,
        name: "crypto-watchlist-lite",
      },
      {
        id: 554,
        name: "task-manager-for-traders",
      },
      {
        id: 555,
        name: "entry-exit-planne",
      },
      {
        id: 542,
        name: "momories-in-nft",
      },
      {
        id: 566,
        name: "dder",
      },
      {
        id: 570,
        name: "ffree",
      },
      {
        id: 576,
        name: "money",
      },
      {
        id: 568,
        name: "vvivaldi",
      },
      {
        id: 571,
        name: "crelp",
      },
      {
        id: 572,
        name: "gghtr",
      },
      {
        id: 573,
        name: "versus",
      },
      {
        id: 574,
        name: "resikk",
      },
      {
        id: 620,
        name: "funny-cam",
      },
      {
        id: 575,
        name: "henri",
      },
      {
        id: 577,
        name: "certy",
      },
      {
        id: 579,
        name: "verty",
      },
      {
        id: 580,
        name: "boss",
      },
      {
        id: 581,
        name: "oopti",
      },
      {
        id: 508,
        name: "tapquest",
      },
      {
        id: 582,
        name: "retry",
      },
      {
        id: 605,
        name: "cc",
      },
      {
        id: 607,
        name: "manual-roi-tracker",
      },
      {
        id: 600,
        name: "fedro",
      },
      {
        id: 601,
        name: "veliht",
      },
      {
        id: 597,
        name: "vioo",
      },
      {
        id: 608,
        name: "profit-and-loss-snapshot",
      },
      {
        id: 583,
        name: "verion1",
      },
      {
        id: 585,
        name: "reggi",
      },
      {
        id: 584,
        name: "dulal",
      },
      {
        id: 588,
        name: "derty",
      },
      {
        id: 587,
        name: "selfi",
      },
      {
        id: 609,
        name: "token-buy-list",
      },
      {
        id: 589,
        name: "zeri",
      },
      {
        id: 590,
        name: "ehte",
      },
      {
        id: 591,
        name: "xerty",
      },
      {
        id: 578,
        name: "supercool",
      },
      {
        id: 592,
        name: "defi-protocols",
      },
      {
        id: 593,
        name: "qwer",
      },
      {
        id: 632,
        name: "math-tutor",
      },
      {
        id: 595,
        name: "gerrrr",
      },
      {
        id: 594,
        name: "zerty",
      },
      {
        id: 596,
        name: "tyy",
      },
      {
        id: 598,
        name: "rold-trip-to-crypto",
      },
      {
        id: 628,
        name: "crypto-secret-confess",
      },
      {
        id: 393,
        name: "0xproject11",
      },
      {
        id: 610,
        name: "openxai",
      },
      {
        id: 602,
        name: "snowman",
      },
      {
        id: 611,
        name: "crypto-reminder-board",
      },
      {
        id: 612,
        name: "manual-token-tagger",
      },
      {
        id: 586,
        name: "base-hamster-ceo",
      },
      {
        id: 560,
        name: "bull-bear",
      },
      {
        id: 613,
        name: "simple-risk-journal",
      },
      {
        id: 603,
        name: "daje-app",
      },
      {
        id: 599,
        name: "dukdue",
      },
      {
        id: 606,
        name: "base-quiz",
      },
      {
        id: 559,
        name: "base-crash",
      },
      {
        id: 604,
        name: "oxb",
      },
      {
        id: 618,
        name: "kimo",
      },
      {
        id: 614,
        name: "jonvit",
      },
      {
        id: 616,
        name: "basisbase",
      },
      {
        id: 615,
        name: "monarch",
      },
      {
        id: 617,
        name: "iftier",
      },
      {
        id: 619,
        name: "crypto-watchlist",
      },
      {
        id: 622,
        name: "nxp",
      },
      {
        id: 629,
        name: "maxxz",
      },
      {
        id: 626,
        name: "henry",
      },
      {
        id: 625,
        name: "library",
      },
      {
        id: 549,
        name: "coinprice",
      },
      {
        id: 627,
        name: "language-learningassistant",
      },
      {
        id: 630,
        name: "whackamole",
      },
      {
        id: 621,
        name: "meme-prophet-arena",
      },
      {
        id: 624,
        name: "scribble-mint",
      },
      {
        id: 631,
        name: "zero",
      },
      {
        id: 623,
        name: "punch-out",
      },
      {
        id: 633,
        name: "ai-farmer",
      },
      {
        id: 634,
        name: "auto-flashcardgenerator",
      },
      {
        id: 635,
        name: "automatic-mind-mapcreator",
      },
      {
        id: 636,
        name: "study-scheduleplanner",
      },
      {
        id: 637,
        name: "career-guidanceassistant",
      },
      {
        id: 638,
        name: "base-match",
      },
      {
        id: 639,
        name: "cv--resumebuilder",
      },
      {
        id: 640,
        name: "ander",
      },
      {
        id: 641,
        name: "doodle-mint",
      },
      {
        id: 642,
        name: "blog-pr-writing-assistan",
      },
      {
        id: 643,
        name: "social-media-contentcreator",
      },
      {
        id: 644,
        name: "ai-logogenerator",
      },
      {
        id: 645,
        name: "slogan-tagline-generator",
      },
      {
        id: 646,
        name: "professional-emailwriter",
      },
      {
        id: 648,
        name: "quick-surveybuilder",
      },
      {
        id: 647,
        name: "customer-review-sentimentanalyzer",
      },
      {
        id: 649,
        name: "automatic-reportgenerator",
      },
      {
        id: 650,
        name: "personal-to-domanager",
      },
      {
        id: 651,
        name: "ai-taskprioritizer",
      },
      {
        id: 670,
        name: "eligablity",
      },
      {
        id: 652,
        name: "pomodoro-timerwith-gamification",
      },
      {
        id: 671,
        name: "based-slots",
      },
      {
        id: 703,
        name: "sip-calc",
      },
      {
        id: 654,
        name: "mini-kanbanboard",
      },
      {
        id: 655,
        name: "long-term-goalplanner",
      },
      {
        id: 656,
        name: "daily-habittracker",
      },
      {
        id: 676,
        name: "clocksetter",
      },
      {
        id: 660,
        name: "tax-planninghelper",
      },
      {
        id: 714,
        name: "miniminesweeper",
      },
      {
        id: 662,
        name: "internal-business-faqbot",
      },
      {
        id: 663,
        name: "meeting-assistant",
      },
      {
        id: 664,
        name: "smart-meetingscheduler",
      },
      {
        id: 657,
        name: "personal-expensetracker",
      },
      {
        id: 666,
        name: "document-assistant",
      },
      {
        id: 658,
        name: "basic-investmentadvisor",
      },
      {
        id: 659,
        name: "instant-invoicegenerator",
      },
      {
        id: 667,
        name: "contract-draftingassistant",
      },
      {
        id: 668,
        name: "legal-riskevaluator",
      },
      {
        id: 669,
        name: "password-strengthchecker",
      },
      {
        id: 672,
        name: "reaction-timetest",
      },
      {
        id: 673,
        name: "fasttapfrenzy",
      },
      {
        id: 674,
        name: "balloonpopper",
      },
      {
        id: 675,
        name: "vocabmatcher",
      },
      {
        id: 677,
        name: "historyquizmini",
      },
      {
        id: 678,
        name: "patternpredictor",
      },
      {
        id: 679,
        name: "sentencebuildergame",
      },
      {
        id: 681,
        name: "hangmanmini",
      },
      {
        id: 684,
        name: "musicnotememory",
      },
      {
        id: 685,
        name: "chemmatch",
      },
      {
        id: 682,
        name: "wordbuildermini",
      },
      {
        id: 683,
        name: "riddlequizmini",
      },
      {
        id: 686,
        name: "spellingbeemini",
      },
      {
        id: 687,
        name: "maptapgeo",
      },
      {
        id: 693,
        name: "speedmath",
      },
      {
        id: 694,
        name: "triviaquizmini",
      },
      {
        id: 695,
        name: "mazeescapemini",
      },
      {
        id: 699,
        name: "towerstacker",
      },
      {
        id: 688,
        name: "emojimeaning",
      },
      {
        id: 689,
        name: "typingrush",
      },
      {
        id: 690,
        name: "wordladdermini",
      },
      {
        id: 691,
        name: "capitalmatch",
      },
      {
        id: 692,
        name: "guesstheflag",
      },
      {
        id: 717,
        name: "hungryfishmini",
      },
      {
        id: 696,
        name: "highlowguess",
      },
      {
        id: 698,
        name: "parkingpuzzlemini",
      },
      {
        id: 704,
        name: "farmminiharvest",
      },
      {
        id: 706,
        name: "idleresourcebuilder",
      },
      {
        id: 700,
        name: "cardbattlemini",
      },
      {
        id: 702,
        name: "cargopuzzle",
      },
      {
        id: 705,
        name: "citybuilder5x5",
      },
      {
        id: 709,
        name: "dotsandboxesmini",
      },
      {
        id: 707,
        name: "numbermergemini",
      },
      {
        id: 701,
        name: "bombdiffuse",
      },
      {
        id: 708,
        name: "match3battle",
      },
      {
        id: 710,
        name: "checkers4x4",
      },
      {
        id: 716,
        name: "fruitslicegame",
      },
      {
        id: 715,
        name: "minitowerdefense",
      },
      {
        id: 711,
        name: "chesspuzzlemini",
      },
      {
        id: 713,
        name: "tictactoeai",
      },
      {
        id: 712,
        name: "rockpaperscissorsai",
      },
      {
        id: 680,
        name: "tiktaktoe",
      },
      {
        id: 732,
        name: "spaceshootermini",
      },
      {
        id: 721,
        name: "jetpackrunner",
      },
      {
        id: 718,
        name: "fallingplatforms",
      },
      {
        id: 736,
        name: "hiddenobjectfinder",
      },
      {
        id: 726,
        name: "minigolfshot",
      },
      {
        id: 719,
        name: "clawmachinemini",
      },
      {
        id: 734,
        name: "flappyclone",
      },
      {
        id: 724,
        name: "minibowling",
      },
      {
        id: 723,
        name: "basketshooter",
      },
      {
        id: 720,
        name: "caravoidance",
      },
      {
        id: 725,
        name: "tapfishing",
      },
      {
        id: 722,
        name: "bubbleshootermini",
      },
      {
        id: 729,
        name: "froggermini",
      },
      {
        id: 727,
        name: "fallingblocksmini",
      },
      {
        id: 728,
        name: "platformjumper",
      },
      {
        id: 730,
        name: "meteordodger",
      },
      {
        id: 731,
        name: "brickbreakermini",
      },
      {
        id: 733,
        name: "endlessrunner",
      },
      {
        id: 737,
        name: "boss-raid-base",
      },
      {
        id: 745,
        name: "bossluth-app",
      },
      {
        id: 746,
        name: "dm-app",
      },
      {
        id: 747,
        name: "sudoku-tutor",
      },
      {
        id: 755,
        name: "treasure-quest-runner",
      },
      {
        id: 756,
        name: "super-maria",
      },
      {
        id: 762,
        name: "cooking-play",
      },
      {
        id: 763,
        name: "april043030",
      },
      {
        id: 765,
        name: "makeover",
      },
      {
        id: 767,
        name: "mini-store",
      },
      {
        id: 770,
        name: "sudoku-tutor-guide",
      },
      {
        id: 771,
        name: "must-halve",
      },
      {
        id: 774,
        name: "sanmura",
      },
      {
        id: 775,
        name: "tiktaktok",
      },
      {
        id: 777,
        name: "cannycrush",
      },
      {
        id: 778,
        name: "tetris",
      },
      {
        id: 779,
        name: "echo-app",
      },
      {
        id: 780,
        name: "tiara",
      },
      {
        id: 781,
        name: "sardeoav25",
      },
      {
        id: 782,
        name: "fitjourney",
      },
      {
        id: 653,
        name: "time-trackingtool",
      },
      {
        id: 665,
        name: "audiotranscript-meetingsummarizer",
      },
      {
        id: 735,
        name: "snakeclassic",
      },
      {
        id: 738,
        name: "flashbase-bets",
      },
      {
        id: 739,
        name: "mysticmawarmerah",
      },
      {
        id: 740,
        name: "watchlist-priority-sorter",
      },
      {
        id: 741,
        name: "exit-strategy-planner",
      },
      {
        id: 776,
        name: "fitnesshealth",
      },
      {
        id: 742,
        name: "dca-planner-lite",
      },
      {
        id: 749,
        name: "gamegames",
      },
      {
        id: 758,
        name: "april-time",
      },
      {
        id: 744,
        name: "starship",
      },
      {
        id: 754,
        name: "datungpobre",
      },
      {
        id: 760,
        name: "jevie",
      },
      {
        id: 783,
        name: "farage",
      },
      {
        id: 753,
        name: "naught-oooo",
      },
      {
        id: 766,
        name: "php-money-scanner",
      },
      {
        id: 743,
        name: "xos",
      },
      {
        id: 768,
        name: "feel-flow",
      },
      {
        id: 773,
        name: "kanikani",
      },
      {
        id: 752,
        name: "fidget-spinner",
      },
      {
        id: 769,
        name: "flownest",
      },
      {
        id: 748,
        name: "goldpish",
      },
      {
        id: 764,
        name: "sts",
      },
      {
        id: 750,
        name: "oh-who-is-u",
      },
      {
        id: 759,
        name: "heyjoe",
      },
      {
        id: 787,
        name: "token-comparison-notes",
      },
      {
        id: 785,
        name: "portfolio-goal-setter",
      },
      {
        id: 786,
        name: "clone-war",
      },
      {
        id: 788,
        name: "mistake-log",
      },
      {
        id: 789,
        name: "blockchain-gas-predictor",
      },
      {
        id: 790,
        name: "dexvolemetracker",
      },
      {
        id: 791,
        name: "tokenwhalemap",
      },
      {
        id: 792,
        name: "crypto-dominance-meter",
      },
      {
        id: 793,
        name: "nft-trait-analyzer",
      },
      {
        id: 794,
        name: "daovotingreminder",
      },
      {
        id: 795,
        name: "defiliquidationwatch",
      },
      {
        id: 761,
        name: "chacha",
      },
      {
        id: 798,
        name: "layerzerobridgetracker",
      },
      {
        id: 799,
        name: "crypto-arbitrage-scanner",
      },
      {
        id: 751,
        name: "wtf-you-ross",
      },
      {
        id: 697,
        name: "linedrawdefense",
      },
      {
        id: 757,
        name: "let-me-in",
      },
      {
        id: 772,
        name: "myminiapp",
      },
      {
        id: 796,
        name: "reminder",
      },
      {
        id: 797,
        name: "crypto-fundingratemonitor",
      },
      {
        id: 800,
        name: "staking-reward-tracker",
      },
      {
        id: 801,
        name: "nft-flipalert",
      },
      {
        id: 802,
        name: "governanceproposalanalyzer",
      },
      {
        id: 345,
        name: "clever",
      },
      {
        id: 803,
        name: "kg",
      },
      {
        id: 804,
        name: "cryptosentimentheatmap",
      },
      {
        id: 805,
        name: "nftmarketcaptracker",
      },
      {
        id: 806,
        name: "crypto-volatility-alert",
      },
      {
        id: 807,
        name: "portable-gpt",
      },
      {
        id: 808,
        name: "babysimulator",
      },
      {
        id: 809,
        name: "tic-tac-toe-soman",
      },
      {
        id: 812,
        name: "staking-pool-comparator",
      },
      {
        id: 811,
        name: "proapp-eco",
      },
      {
        id: 816,
        name: "arizronin",
      },
      {
        id: 813,
        name: "dex-slippage-guard",
      },
      {
        id: 814,
        name: "token-whale-exit-alert",
      },
      {
        id: 815,
        name: "mev-attack-monitor",
      },
      {
        id: 817,
        name: "rwa-asset-monitor",
      },
      {
        id: 818,
        name: "validator-slashing-watch",
      },
      {
        id: 819,
        name: "defi-fee-consumption-racker",
      },
      {
        id: 820,
        name: "token-social-boost-detector",
      },
      {
        id: 821,
        name: "defi-tvl-alert",
      },
      {
        id: 822,
        name: "nft-drop-calendar",
      },
      {
        id: 823,
        name: "airdrop-jav",
      },
      {
        id: 824,
        name: "spin-and-win",
      },
      {
        id: 810,
        name: "baseweb3bot",
      },
      {
        id: 828,
        name: "airdrop-claim-status-checker",
      },
      {
        id: 836,
        name: "nft-collab-monitor",
      },
      {
        id: 829,
        name: "fitness-tracker",
      },
      {
        id: 835,
        name: "learn-tagalog",
      },
      {
        id: 837,
        name: "traveltipsai",
      },
      {
        id: 838,
        name: "quotemachine",
      },
      {
        id: 832,
        name: "cross-chain-wallet-activity-sync",
      },
      {
        id: 830,
        name: "learn-lang",
      },
      {
        id: 834,
        name: "protocol-revenue-tracker",
      },
      {
        id: 833,
        name: "studbud",
      },
      {
        id: 850,
        name: "factorcap",
      },
      {
        id: 839,
        name: "roastme",
      },
      {
        id: 840,
        name: "cryptosimple",
      },
      {
        id: 841,
        name: "flashmath",
      },
      {
        id: 843,
        name: "click-the-color",
      },
      {
        id: 842,
        name: "travelweek",
      },
      {
        id: 844,
        name: "moodreader",
      },
      {
        id: 846,
        name: "hacktip",
      },
      {
        id: 826,
        name: "studmate",
      },
      {
        id: 848,
        name: "musicfinder",
      },
      {
        id: 849,
        name: "animesuggest",
      },
      {
        id: 854,
        name: "wordoftheday",
      },
      {
        id: 855,
        name: "brainteaser",
      },
      {
        id: 856,
        name: "realitycheck",
      },
      {
        id: 853,
        name: "moodsong",
      },
      {
        id: 857,
        name: "storyprompt",
      },
      {
        id: 859,
        name: "moneyguru",
      },
      {
        id: 860,
        name: "goodmorningai",
      },
      {
        id: 858,
        name: "roastgenerator",
      },
      {
        id: 862,
        name: "foodrating",
      },
      {
        id: 863,
        name: "simpbot",
      },
      {
        id: 861,
        name: "shortnews",
      },
      {
        id: 864,
        name: "faketweet",
      },
      {
        id: 866,
        name: "askthechef",
      },
      {
        id: 865,
        name: "reminderai",
      },
      {
        id: 867,
        name: "moodcolor",
      },
      {
        id: 868,
        name: "aihug",
      },
      {
        id: 869,
        name: "5minlearn",
      },
      {
        id: 871,
        name: "gamertip",
      },
      {
        id: 870,
        name: "petadvisor",
      },
      {
        id: 872,
        name: "dailychallenge",
      },
      {
        id: 873,
        name: "luckynumber",
      },
      {
        id: 874,
        name: "wisdomai",
      },
      {
        id: 879,
        name: "cryptoexplainer",
      },
      {
        id: 875,
        name: "dreaminterpreter",
      },
      {
        id: 876,
        name: "moodsnack",
      },
      {
        id: 881,
        name: "luckycharm",
      },
      {
        id: 845,
        name: "foodmatch",
      },
      {
        id: 852,
        name: "sleepcoach",
      },
      {
        id: 882,
        name: "defi-gas-efficiency-analyzer",
      },
      {
        id: 878,
        name: "boban",
      },
      {
        id: 847,
        name: "billionaireadvice",
      },
      {
        id: 825,
        name: "bouncy-banana",
      },
      {
        id: 880,
        name: "coolnickname",
      },
      {
        id: 884,
        name: "color-rush",
      },
      {
        id: 831,
        name: "ultra-mini-golf",
      },
      {
        id: 851,
        name: "fitnessmini",
      },
      {
        id: 413,
        name: "wizards-tower",
      },
      {
        id: 883,
        name: "brilliant",
      },
      {
        id: 877,
        name: "aigrandma",
      },
      {
        id: 885,
        name: "nft-whitelisttracker",
      },
      {
        id: 886,
        name: "tokengovernancepowermonitor",
      },
      {
        id: 887,
        name: "megadon",
      },
      {
        id: 888,
        name: "cryptowhaleinteractiontracker",
      },
      {
        id: 889,
        name: "basketball",
      },
      {
        id: 890,
        name: "tokensupplyshockdetector",
      },
      {
        id: 892,
        name: "defimargincallalert",
      },
      {
        id: 891,
        name: "base-slots",
      },
      {
        id: 894,
        name: "nft-utility-tracker",
      },
      {
        id: 900,
        name: "how-much-to-dca",
      },
      {
        id: 895,
        name: "harry-quiz",
      },
      {
        id: 897,
        name: "cross-chaintokenageanalyzer",
      },
      {
        id: 898,
        name: "nftholderloyaltyindex",
      },
      {
        id: 899,
        name: "tokenbuybackmonitor",
      },
      {
        id: 912,
        name: "airport-simulation",
      },
      {
        id: 913,
        name: "tokenrefundactivitymonitor",
      },
      {
        id: 937,
        name: "sloths-booms",
      },
      {
        id: 902,
        name: "monkey",
      },
      {
        id: 914,
        name: "internal",
      },
      {
        id: 903,
        name: "tokendormantsupplydetector",
      },
      {
        id: 904,
        name: "social-media-manager",
      },
      {
        id: 905,
        name: "task-manager",
      },
      {
        id: 915,
        name: "community-wallet-movement-monitor",
      },
      {
        id: 906,
        name: "chess",
      },
      {
        id: 907,
        name: "real-football",
      },
      {
        id: 909,
        name: "batman",
      },
      {
        id: 908,
        name: "rattyguang",
      },
      {
        id: 910,
        name: "road-map-to-farcaster",
      },
      {
        id: 911,
        name: "nftfloorresistanceanalyzer",
      },
      {
        id: 25,
        name: "flick",
      },
      {
        id: 916,
        name: "gre",
      },
      {
        id: 917,
        name: "gyyt",
      },
      {
        id: 918,
        name: "logo-maker",
      },
      {
        id: 919,
        name: "qqwe",
      },
      {
        id: 920,
        name: "rtyui",
      },
      {
        id: 921,
        name: "app-factory",
      },
      {
        id: 922,
        name: "qwsaq",
      },
      {
        id: 923,
        name: "multi-signactivityradar",
      },
      {
        id: 924,
        name: "map",
      },
      {
        id: 925,
        name: "tokenvelocitytracker",
      },
      {
        id: 926,
        name: "token-transaction-clustering-detector",
      },
      {
        id: 930,
        name: "sammi",
      },
      {
        id: 433,
        name: "jumping-dot",
      },
      {
        id: 927,
        name: "farcaster-portfolio",
      },
      {
        id: 929,
        name: "gemini-assistant",
      },
      {
        id: 928,
        name: "token-market-place",
      },
      {
        id: 931,
        name: "klark",
      },
      {
        id: 933,
        name: "tt",
      },
      {
        id: 435,
        name: "slots-base",
      },
      {
        id: 661,
        name: "small-projectmanager",
      },
      {
        id: 934,
        name: "felix",
      },
      {
        id: 437,
        name: "ping-pong-wall",
      },
      {
        id: 896,
        name: "real-housevies-of-orange-county",
      },
      {
        id: 981,
        name: "fortune-cookie",
      },
      {
        id: 932,
        name: "asevedo",
      },
      {
        id: 954,
        name: "fireplace",
      },
      {
        id: 901,
        name: "dca-calc",
      },
      {
        id: 438,
        name: "retro-space-defender",
      },
      {
        id: 827,
        name: "inayah",
      },
      {
        id: 956,
        name: "quiz",
      },
      {
        id: 935,
        name: "quiz-app",
      },
      {
        id: 936,
        name: "2048-app",
      },
      {
        id: 940,
        name: "love-hotel",
      },
      {
        id: 938,
        name: "quiz-trak",
      },
      {
        id: 941,
        name: "webuy",
      },
      {
        id: 942,
        name: "ulra",
      },
      {
        id: 943,
        name: "sharktank",
      },
      {
        id: 944,
        name: "abcd",
      },
      {
        id: 945,
        name: "salaman",
      },
      {
        id: 958,
        name: "based-endorsement",
      },
      {
        id: 946,
        name: "fx1-digital-hubs",
      },
      {
        id: 947,
        name: "kukufame1",
      },
      {
        id: 948,
        name: "young",
      },
      {
        id: 949,
        name: "alfiams",
      },
      {
        id: 953,
        name: "aithereumnetwork",
      },
      {
        id: 950,
        name: "x-score",
      },
      {
        id: 951,
        name: "hub",
      },
      {
        id: 952,
        name: "chatgpt",
      },
      {
        id: 960,
        name: "paradixpips",
      },
      {
        id: 966,
        name: "edge-22",
      },
      {
        id: 955,
        name: "stonks",
      },
      {
        id: 961,
        name: "omor09",
      },
      {
        id: 959,
        name: "minions",
      },
      {
        id: 962,
        name: "yapper",
      },
      {
        id: 426,
        name: "celestial-keysmith",
      },
      {
        id: 963,
        name: "neprox",
      },
      {
        id: 957,
        name: "alpha",
      },
      {
        id: 964,
        name: "sasaa",
      },
      {
        id: 980,
        name: "awuuu",
      },
      {
        id: 967,
        name: "cryptoliver",
      },
      {
        id: 965,
        name: "rdx",
      },
      {
        id: 969,
        name: "dzandirr",
      },
      {
        id: 970,
        name: "deligrow",
      },
      {
        id: 971,
        name: "wednesday-addams-quiz",
      },
      {
        id: 939,
        name: "pong",
      },
      {
        id: 968,
        name: "tiny-frogger",
      },
      {
        id: 972,
        name: "fouter",
      },
      {
        id: 973,
        name: "ali-ai",
      },
      {
        id: 974,
        name: "niks",
      },
      {
        id: 975,
        name: "rocky",
      },
      {
        id: 976,
        name: "nikolas",
      },
      {
        id: 985,
        name: "oracle",
      },
      {
        id: 979,
        name: "puzzle",
      },
      {
        id: 989,
        name: "get-my-meds",
      },
      {
        id: 978,
        name: "casino",
      },
      {
        id: 982,
        name: "brain-box",
      },
      {
        id: 994,
        name: "bounty-go",
      },
      {
        id: 992,
        name: "omega",
      },
      {
        id: 988,
        name: "verifolio",
      },
      {
        id: 999,
        name: "food-mines",
      },
      {
        id: 356,
        name: "crypto-hangman",
      },
      {
        id: 1000,
        name: "jiji",
      },
      {
        id: 990,
        name: "my-cutesey",
      },
      {
        id: 997,
        name: "random-game",
      },
      {
        id: 1008,
        name: "the-perfect-10",
      },
      {
        id: 977,
        name: "bonfire",
      },
      {
        id: 1016,
        name: "hilderose",
      },
      {
        id: 784,
        name: "ar",
      },
      {
        id: 325,
        name: "mangala",
      },
      {
        id: 993,
        name: "thefoolchemistrywizard",
      },
      {
        id: 996,
        name: "lucky-spin",
      },
      {
        id: 1004,
        name: "minesweeper",
      },
      {
        id: 893,
        name: "tetris-block",
      },
      {
        id: 1002,
        name: "little-frog",
      },
      {
        id: 998,
        name: "firefly-keeper",
      },
      {
        id: 986,
        name: "infinite-ai-trivia",
      },
      {
        id: 1026,
        name: "minimath",
      },
      {
        id: 341,
        name: "lucky",
      },
      {
        id: 991,
        name: "late-for-class",
      },
      {
        id: 1011,
        name: "orb-runner",
      },
      {
        id: 1012,
        name: "omni-base",
      },
      {
        id: 983,
        name: "evolve",
      },
      {
        id: 1015,
        name: "lodebina",
      },
      {
        id: 1001,
        name: "epistemology",
      },
      {
        id: 1028,
        name: "learn2earn",
      },
      {
        id: 1010,
        name: "slots",
      },
      {
        id: 1007,
        name: "memory-tiles",
      },
      {
        id: 995,
        name: "the-oracle",
      },
      {
        id: 1014,
        name: "calfit-checker",
      },
      {
        id: 1006,
        name: "mouse-hunt",
      },
      {
        id: 1013,
        name: "mdot",
      },
      {
        id: 1019,
        name: "based-restaurant",
      },
      {
        id: 1017,
        name: "triviang-pinoy",
      },
      {
        id: 1005,
        name: "wizard-house-quiz",
      },
      {
        id: 1018,
        name: "eth",
      },
      {
        id: 1020,
        name: "dapper",
      },
      {
        id: 1003,
        name: "mouse-escape",
      },
      {
        id: 1022,
        name: "endless-runner",
      },
      {
        id: 1025,
        name: "memory-match-card",
      },
      {
        id: 1021,
        name: "prism-rush",
      },
      {
        id: 1030,
        name: "wallet-tracker",
      },
      {
        id: 984,
        name: "typhoon-preparedness-app",
      },
      {
        id: 1024,
        name: "the-king-thaddues",
      },
      {
        id: 1023,
        name: "chromashift",
      },
      {
        id: 1009,
        name: "falling-sand-game",
      },
      {
        id: 1029,
        name: "plantopedia",
      },
      {
        id: 1031,
        name: "racer",
      },
      {
        id: 152,
        name: "creatorking",
      },
      {
        id: 1035,
        name: "khyzycyriljhiaardiente",
      },
      {
        id: 1032,
        name: "wishpool",
      },
      {
        id: 1040,
        name: "sports-travia",
      },
      {
        id: 1034,
        name: "parziv4l",
      },
      {
        id: 1033,
        name: "freelance-quiz-and-tracker",
      },
      {
        id: 1036,
        name: "sharedates",
      },
      {
        id: 1038,
        name: "fili-food",
      },
      {
        id: 1027,
        name: "win",
      },
      {
        id: 987,
        name: "store-smart-calculator",
      },
      {
        id: 1041,
        name: "awesome",
      },
      {
        id: 1037,
        name: "cyber-hockey",
      },
      {
        id: 1039,
        name: "endless-arcane-runner-game",
      },
    ],
    queryKey: ["showcase_projects"],
    queryFn: async () => {
      return fetch("/api/showcase/projects/all")
        .then((res) => res.json())
        .then((data) => data as { id: number; name: string }[])
        .then((projects) => projects.sort((p1, p2) => p2.id - p1.id))
        .catch(console.error);
    },
    refetchInterval: 10_000, // 10 seconds
  });
  const [load, setLoad] = useState<number>(100);

  return (
    <main className="flex flex-col gap-3 place-items-center place-content-between px-4 py-4 grow">
      <div className="flex place-content-between place-items-center w-full max-w-[500px]">
        <Link href="/">
          <div className="p-2 rounded-full bg-blue-600">
            <FactoryIcon className="text-white" />
          </div>
        </Link>
        <Link href="/">
          <div className="p-2 rounded-full bg-gray-400">
            <ArrowLeft />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-1 mt-8 ml-4 w-full max-w-[500px]">
        <span className="text-4xl font-semibold">Marketplace</span>
      </div>
      {featured.length > 0 && (
        <div className="flex flex-col gap-1 mt-4 w-full max-w-[500px]">
          <span className="ml-4 text-lg font-semibold">Featured</span>
          <div className="grid grid-cols-3 gap-3">
            {featured.map((project) => (
              <ProjectShowcase key={project} project={project} />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 mt-4 w-full max-w-[500px] grow">
        <span className="ml-4 text-lg font-semibold">Latest</span>
        <ScrollArea className="w-full grow h-0 px-3">
          <div className="grid grid-cols-3 gap-3">
            {projects?.slice(0, load).map((project) => (
              <ProjectShowcase key={project.name} project={project.name} />
            ))}
          </div>
          {!!projects && load < projects.length && (
            <div className="flex place-items-center place-content-center my-3">
              <Button
                onClick={() => {
                  setLoad((load) => load + 50);
                }}
              >
                Load More
              </Button>
            </div>
          )}
        </ScrollArea>
      </div>
    </main>
  );
}
function ProjectShowcase({ project }: { project: string }) {
  const { data: metadata } = useQuery({
    queryKey: ["metadata", project],
    queryFn: async () => {
      return await fetch(`/metadata/${project}`)
        .then((res) => res.json())
        .then(
          (data) => data as { name: string; description: string; image: string }
        )
        .catch(console.error);
    },
  });

  if (!metadata || metadata.name === "Mini App Factory App") {
    return <></>;
  }

  return (
    <ViewMiniApp
      miniapp={`https://${project}.miniapp-factory.marketplace.openxai.network/`}
    >
      <div className="grid place-items-center place-content-center size-full rounded-2xl aspect-square">
        <img
          src={metadata.image}
          alt="project image"
          className="col-start-1 row-start-1 -z-10 size-full rounded-2xl"
        />
        <div className="col-start-1 row-start-1 size-full flex place-items-end place-content-center p-3">
          <div className="bg-white/80 rounded-lg px-1 py-0.5 place-items-center text-center">
            <span className="max-md:text-xs font-semibold">
              {metadata.name.substring(0, 25)}
              {metadata.name.length > 25 ? "..." : ""}
            </span>
          </div>
        </div>
      </div>
    </ViewMiniApp>
  );
}

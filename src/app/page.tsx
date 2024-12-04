'use client'

import { motion } from 'framer-motion'
import Countdown from 'react-countdown'
import { Sparkles, TrophyIcon, ClockIcon, User } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

import Snowfall from 'react-snowfall'
import { WALKERS, RUNNERS } from '@/data/players'

const endDate = new Date('2024-12-31T23:59:59')
const KM_GOAL = 45

const getMedalEmoji = (index: number) => {
  switch (index) {
    case 0:
      return '🥇'
    case 1:
      return '🥈'
    case 2:
      return '🥉'
    default:
      return null
  }
}

export default function Component() {
  const orderedWalkers = WALKERS.sort((a, b) => b.km - a.km)
  const orderedRunners = RUNNERS.sort((a, b) => b.km - a.km)
  const topThree = orderedWalkers.slice(0, 3)
  const restOfPlayers = orderedWalkers.slice(3)

  const durationRunners = orderedRunners.length * 7
  console.log(durationRunners)

  const isGoalReached = (km: number) => {
    return km >= KM_GOAL ? 'bg-green-300' : 'bg-gray-100'
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-red-500 to-green-500 p-6 relative">
      <Snowfall />
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Reto 45k + 5k Diciembre
        </h1>
        <div className="mb-4 rounded-full text-md text-white bg-white/20 overflow-hidden px-4">
          <motion.div
            className="flex items-center"
            animate={{ x: ['100%', '-200%'] }}
            transition={{
              repeat: Infinity,
              duration: durationRunners,
              ease: 'linear',
            }}
          >
            {orderedRunners.map((runner, index) => (
              <div className="mx-16 flex flex-row gap-2" key={index}>
                <span>{runner.gender === 'F' ? '🏃‍♀️' : '🏃‍♂️'}</span>
                <span className="mx-4 text-nowrap">{runner.name}</span>
                <span className="font-bold text-nowrap">{runner.km} km</span>
                {runner.moroso && (
                  <Badge className="ml-2 bg-red-200" variant="secondary">
                    Moroso
                  </Badge>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="bg-white shadow overflow-hidden rounded mb-14 p-2 grid grid-cols-3 divide-x">
          <div className="flex flex-col text-center p-2">
            <p className="mb-2">
              <TrophyIcon className="h-5 w-5 text-yellow-600 m-auto" />
            </p>
            <p className="text-xs sm:text-md font-medium text-gray-900">Pote</p>
            <p className="text-md sm:text-2xl font-semibold text-gray-900">
              $10
            </p>
          </div>
          <div className="flex flex-col text-center p-2">
            <p className="mb-2">
              <User className="h-5 w-5 text-blue-600 m-auto" />
            </p>
            <p className="text-xs sm:text-md font-medium text-gray-900">
              Atletas
            </p>
            <p className="text-md sm:text-2xl font-semibold text-gray-900">
              10
            </p>
          </div>
          <div className="flex flex-col text-center p-2">
            <p className="mb-2">
              <ClockIcon className="h-5 w-5 text-gray-600 m-auto" />
            </p>
            <p className="text-xs sm:text-md font-medium text-gray-900">
              Restante
            </p>
            <div className="text-md sm:text-2xl font-semibold text-gray-900">
              <Countdown
                date={endDate}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div>
                    {String(days).padStart(2, '0')}:
                    {String(hours).padStart(2, '0')}:
                    {String(minutes).padStart(2, '0')}:
                    {String(seconds).padStart(2, '0')}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="relative h-64 mb-6">
          {/* Podium */}
          <div className="absolute bottom-0 w-full flex items-end justify-center gap-4">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <motion.div
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span
                  className={`flex items-center justify-center h-16 w-16 rounded-full text-4xl border-4 border-gray-500 font-bold ${isGoalReached(
                    topThree[1].km
                  )}`}
                >
                  {getMedalEmoji(1)}
                </span>
              </motion.div>
              <p className="text-white text-medium font-bold mt-2 text-center">
                {topThree[1].name}
              </p>
              <div className="bg-gray-300 h-32 w-24 rounded-t-lg mt-2 flex items-center justify-center">
                <span className="text-lg font-bold">{topThree[1].km} km</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center -mt-8">
              <motion.div
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0 }}
              >
                <span
                  className={`flex items-center justify-center h-16 w-16 rounded-full text-4xl border-4 border-yellow-500 font-bold ${isGoalReached(
                    topThree[0].km
                  )}`}
                >
                  {getMedalEmoji(0)}
                </span>
                <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400" />
              </motion.div>
              <p className="text-white text-medium font-bold mt-2 text-center">
                {topThree[0].name}
              </p>
              <div className="bg-yellow-400 h-40 w-24 rounded-t-lg mt-2 flex items-center justify-center">
                <span className="text-lg font-bold">{topThree[0].km} km</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <motion.div
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span
                  className={`flex items-center justify-center h-16 w-16 rounded-full text-4xl border-4 border-orange-700 font-bold ${isGoalReached(
                    topThree[2].km
                  )}`}
                >
                  {getMedalEmoji(2)}
                </span>
              </motion.div>
              <p className="text-white text-medium font-bold mt-2 text-center">
                {topThree[2].name}
              </p>
              <div className="bg-orange-400 h-24 w-24 rounded-t-lg mt-2 flex items-center justify-center">
                <span className="text-lg font-bold">{topThree[2].km} km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of players list */}
        <ScrollArea className="bg-white h-96 w-full rounded-xl p-2">
          {restOfPlayers.map((player, index) => (
            <motion.div
              key={player.name}
              className={`flex items-center justify-between py-3 px-2 rounded-xl mb-2 ${isGoalReached(
                player.km
              )}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 mr-4 text-2xl font-bold shrink-0">
                  {index + 4}
                </span>
                <span className="font-medium">
                  {player.name}
                  {player.moroso && (
                    <Badge className="ml-2 bg-red-200" variant="secondary">
                      Moroso
                    </Badge>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-4 pr-2 shrink-0">
                <span className="font-bold text-xl">{player.km} km</span>
              </div>
            </motion.div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

import { convertHoursStringToMinutes } from '../utils/convertHoursStringToMinutes'
import { convertMinutesStringToHours } from '../utils/convertMinutesStringToHours'

const routes = Router()
const prisma = new PrismaClient()

routes.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return res.json(games)
})

routes.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  const adsFormatted = ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesStringToHours(ad.hourStart),
      hourEnd: convertMinutesStringToHours(ad.hourEnd)
    }
  })

  return res.json(adsFormatted)
})

routes.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  return res.json({ discord: ad.discord })
})

routes.post('/games/:gameId/ads', async (req, res) => {
  const gameId = req.params.gameId
  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel
  } = req.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      hourStart: convertHoursStringToMinutes(hourStart),
      hourEnd: convertHoursStringToMinutes(hourEnd),
      useVoiceChannel
    }
  })

  return res.json(ad)
})

export { routes }

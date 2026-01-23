/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response } from 'express'
import * as db from '../data/mongodb'
import * as utils from '../lib/utils'

export function trackOrder () {
  return (req: Request, res: Response) => {
    const rawId = req.params.id
    const sanitizedId = String(rawId).replace(/[^\w-]+/g, '')

    db.ordersCollection.find({ orderId: sanitizedId }).then((order: any) => {
      const result = utils.queryResultToJson(order)
      if (result.data[0] === undefined) {
        result.data[0] = { orderId: sanitizedId }
      }
      res.json(result)
    }, () => {
      res.status(400).json({ error: 'Wrong Param' })
    })
  }
}

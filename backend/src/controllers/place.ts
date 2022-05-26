import {Request, Response, NextFunction} from 'express'
import dbConnection from '../db/dbConnection'
import {verifyToken} from '../helpers/tokenManager'
import {Place} from '../models/place'

class PlaceController {
  public getPlaces = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) {
      res.status(403).json()
    } else {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      const decoded = verifyToken(bearerToken)
      if (!decoded) {
        res.status(401).json()
      } else {
        const types = req.query.types as string[]
        var where: string | undefined = undefined
        try {
          var places
          var query
          var placeIds
          if (types) {
            if (types instanceof Array) {
              var typesString = `'${types.join(`','`)}'`
              query = `Select placeTable.id from wasteType INNER JOIN collectedWaste ON wasteType.id = collectedWaste.wasteTypeId INNER JOIN placeTable ON placeTable.id = collectedWaste.placeId WHERE wasteType.type IN (${typesString})`
            } else {
              query = `Select placeTable.id from wasteType INNER JOIN collectedWaste ON wasteType.id = collectedWaste.wasteTypeId INNER JOIN placeTable ON placeTable.id = collectedWaste.placeId WHERE wasteType.type LIKE '%${types}%'`
            }
            placeIds = (await dbConnection.rawSql(query)) as Array<any>
          } else {
            placeIds = (await dbConnection.select({
              select: 'placeTable.id',
              table: 'placeTable',
              where: where,
            })) as Array<any>
          }
          const placeIdArray = placeIds.map(p => {
            return p.id
          })
          query = `select * from placeTable INNER JOIN collectedWaste ON collectedWaste.placeId = placeTable.id INNER JOIN wasteType ON wasteType.id = collectedWaste.wasteTypeId WHERE placeTable.id IN (${placeIdArray})`
          places = (await dbConnection.rawSql(query)) as Array<any>
          var mappedPlaces: Place[] = []
          places.forEach(p => {
            const idx = mappedPlaces.findIndex(mp => {
              return mp.id === p.placeId
            })
            if (idx < 0) {
              mappedPlaces.push({
                id: p.placeId,
                name: p.name,
                address: {
                  zipCode: p.zipCode,
                  city: p.city,
                  streetAddress: p.streetAddress,
                },
                coordinates: {
                  latitude: p.latitude,
                  longitude: p.longitude,
                },
                garbageType: [p.type],
              })
            } else {
              mappedPlaces[idx].garbageType.push(p.type)
            }
          })
          res.status(200).json(mappedPlaces)
        } catch (error) {
          console.log(error)
          res.status(500).json({message: 'Váratlan hiba történt'})
        }
      }
    }
  }

  public createPlace = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Váratlan hiba történt'})
    }
  }

  public updatePlace = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Váratlan hiba történt'})
    }
  }

  public deletePlace = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.body.id
      await dbConnection.delete({
        table: 'placeTable',
        where: `id = ${id}`,
      })
      res.status(200)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Váratlan hiba történt'})
    }
  }
}

const placeController = new PlaceController()
export default placeController

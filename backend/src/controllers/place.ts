import {Request, Response, NextFunction} from 'express'
import dbConnection from '../db/dbConnection'
import {verifyToken} from '../helpers/tokenManager'
import {Place} from '../models/place'

class PlaceController {
  public authenticate = async (
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
        next()
      }
    }
  }

  public getPlaces = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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

  public createPlace = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const place: Place = {
        id: undefined,
        name: req.body.name,
        address: {
          city: req.body.address.city,
          streetAddress: req.body.address.streetAddress,
          zipCode: req.body.address.zipCode,
        },
        coordinates: {
          latitude: req.body.coordinates.latitude,
          longitude: req.body.coordinates.longitude,
        },
        garbageType: req.body.garbageType,
      }
      await dbConnection.insert({
        table: 'placeTable',
        values: `(${0}, '${place.name}', '${place.address.city}', '${
          place.address.streetAddress
        }', '${place.address.zipCode}', ${place.coordinates.latitude}, ${
          place.coordinates.longitude
        })`,
      })
      const placeId = (await dbConnection.select({
        select: 'id',
        table: 'placeTable',
        where: `streetAddress = '${place.address.streetAddress}' AND zipCode = '${place.address.zipCode}'`,
      })) as Array<any>
      const wasteTypes = (await dbConnection.select({
        select: '*',
        table: 'wasteType',
      })) as Array<any>
      for await (const g of place.garbageType) {
        const wasteTypeId = wasteTypes.find(w => w.type === g).id
        console.log(placeId, ' ', wasteTypeId)
        await dbConnection.insert({
          table: 'collectedWaste',
          values: `(${null}, ${placeId[0].id}, ${wasteTypeId})`,
        })
      }
      res.status(200).json({message: 'Gyűjtőhely sikeresen hozzáadva'})
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
      const place: Place = {
        id: req.body.id,
        name: req.body.name,
        address: {
          city: req.body.address.city,
          streetAddress: req.body.address.streetAddress,
          zipCode: req.body.address.zipCode,
        },
        coordinates: {
          latitude: req.body.coordinates.latitude,
          longitude: req.body.coordinates.longitude,
        },
        garbageType: req.body.garbageType,
      }
      await dbConnection.update({
        table: 'placeTable',
        set: `name='${place.name}', city='${place.address.city}', streetAddress='${place.address.streetAddress}', zipCode='${place.address.zipCode}', latitude=${place.coordinates.latitude}, longitude=${place.coordinates.longitude}`,
        where: `id = ${Number(place.id)}`,
      })
      await dbConnection.delete({
        table: 'collectedWaste',
        where: `placeId = ${place.id}`,
      })
      const wasteTypes = (await dbConnection.select({
        select: '*',
        table: 'wasteType',
      })) as Array<any>
      for await (const g of place.garbageType) {
        const wasteTypeId = wasteTypes.find(w => w.type === g).id
        await dbConnection.insert({
          table: 'collectedWaste',
          values: `(${null}, ${place.id}, ${wasteTypeId})`,
        })
      }
      res.status(200).json({message: 'Gyűjtőhely sikeresen módisítva'})
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
      const id = req.params.id
      await dbConnection.delete({
        table: 'placeTable',
        where: `id = ${id}`,
      })
      res.status(200).json({message: 'Gyűjtőhely sikeresen törölve'})
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Váratlan hiba történt'})
    }
  }
}

const placeController = new PlaceController()
export default placeController

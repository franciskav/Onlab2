import {Request, Response, NextFunction} from 'express'
import dbConnection from '../db/dbConnection'

class IndexController {
  public initDb = async (req: Request, res: Response, next: NextFunction) => {
    try {
      dbConnection.dropTable({table: 'collectedWaste'})
      dbConnection.dropTable({table: 'userTable'})
      dbConnection.dropTable({table: 'placeTable'})
      dbConnection.dropTable({table: 'wasteType'})

      dbConnection.createTable({
        table: 'userTable',
        columns:
          '`id` int NOT NULL AUTO_INCREMENT, `email` varchar(50) NOT NULL, `name` varchar(100) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `email_UNIQUE` (`email`)',
      })
      dbConnection.createTable({
        table: 'placeTable',
        columns:
          '`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `city` varchar(50) NOT NULL, `streetAddress` varchar(100) NOT NULL, `zipCode` varchar(4) NOT NULL, `latitude` decimal(9,6) NOT NULL, `longitude` decimal(9,6) NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `id_UNIQUE` (`id`)',
      })
      dbConnection.createTable({
        table: 'wasteType',
        columns:
          '`id` int NOT NULL AUTO_INCREMENT, `type` varchar(50) NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `id_UNIQUE` (`id`)',
      })
      dbConnection.createTable({
        table: 'collectedWaste',
        columns:
          '`id` int NOT NULL AUTO_INCREMENT, `placeId` int NOT NULL, `wasteTypeId` int NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `id_UNIQUE` (`id`), KEY `placeId_idx` (`placeId`), KEY `wasteTypeId_idx` (`wasteTypeId`), CONSTRAINT `placeId` FOREIGN KEY (`placeId`) REFERENCES `placeTable` (`id`) ON DELETE CASCADE, CONSTRAINT `wasteTypeId` FOREIGN KEY (`wasteTypeId`) REFERENCES `wasteType` (`id`) ON DELETE CASCADE',
      })

      dbConnection.insertMultiple({
        table: 'userTable',
        columns: '`id`,`email`,`name`,`password`',
        values: [
          [
            0,
            'test@test.hu',
            'Test User',
            '$2b$10$8JowhD44dLnp7rQqeSOvDe.i/QMrH2E5IjiVdZrkrmneqcPak7Bve',
          ],
          [
            0,
            'test1@test.hu',
            'Test USer1',
            '$2b$10$7mNNBNY/usizN8.dc.MqDeCDCyKuqBZQ6ZkqXLdFRj23h17uKautm',
          ],
        ],
      })
      dbConnection.insertMultiple({
        table: 'placeTable',
        columns:
          '`id`,`name`,`city`,`streetAddress`,`zipCode`,`latitude`,`longitude`',
        values: [
          [
            0,
            'Spar szupermarket',
            'Budapest',
            'Mester u. 30-32',
            '1095',
            47.480101,
            19.071589,
          ],
          [
            0,
            'MOL benzinkút',
            'Budapest',
            'Irinyi József u. 45',
            '1117',
            47.4743,
            19.05318,
          ],
          [
            0,
            'Szelektív hulladékgyűjtő sziget',
            'Budapest',
            'Móricz Zsigmon körtér 3',
            '1114',
            47.47799,
            19.04719,
          ],
        ],
      })
      dbConnection.insertMultiple({
        table: 'wasteType',
        columns: '`id`,`type`',
        values: [
          [0, 'kommunális'],
          [0, 'lom'],
          [0, 'papír'],
          [0, 'műanyag'],
          [0, 'fém'],
          [0, 'üveg'],
          [0, 'komposzt'],
          [0, 'elktromos és elektronikai hulladék'],
          [0, 'fénycsövek és világítótestek'],
          [0, 'száraz elem és akkumulátor'],
          [0, 'sitt'],
          [0, 'gumiabroncs'],
          [0, 'fáradt olaj'],
        ],
      })
      dbConnection.insertMultiple({
        table: 'collectedWaste',
        columns: '`id`,`placeId`, `wasteTypeId`',
        values: [
          [0, 1, 3],
          [0, 1, 5],
          [0, 1, 6],
          [0, 1, 10],
          [0, 2, 13],
          [0, 3, 3],
          [0, 3, 4],
          [0, 3, 6],
        ],
      })

      res.status(200).json('DB initialized')
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Váratlan hiba történt'})
    }
  }
}

const indexController = new IndexController()
export default indexController

import {Request, Response, NextFunction} from 'express'
import dbConnection from '../db/dbConnection'
import bcrypt from 'bcrypt'
import {
  generateAccessToken,
  generateRefreshToken,
} from '../helpers/tokenManager'

class AuthController {
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const email = req.body.email
    const name = req.body.name
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    try {
      const user: any = await dbConnection.select({
        select: '*',
        table: 'userTable',
        where: `email = "${email}"`,
      })
      console.log(user)
      if (user.length !== 0) {
        res.status(409).json({message: 'A felhasználó már létezik'})
      } else {
        await dbConnection.insert({
          table: 'userTable',
          values: `(0, '${email}', '${name}', '${hashedPassword}')`,
        })
        const accessToken = generateAccessToken(email, name)
        const refreshToken = generateRefreshToken(email, name)
        res
          .status(200)
          .json({accessToken: accessToken, refreshToken: refreshToken})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Váratlan hiba történt'})
    }
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email
    const password: string = req.body.password
    try {
      const user: any = await dbConnection.select({
        select: '*',
        table: 'userTable',
        where: `email = "${email}"`,
      })
      console.log(user)
      if (user.length === 0) {
        res.status(401).json({message: 'Hibás felhasználónév'})
      } else {
        const hashedPassword = user[0].password
        if (await bcrypt.compare(password, hashedPassword)) {
          const accessToken = generateAccessToken(user[0].email, user[0].name)
          const refreshToken = generateRefreshToken(user[0].email, user[0].name)
          res
            .status(200)
            .json({accessToken: accessToken, refreshToken: refreshToken})
        } else {
          res.status(401).json({message: 'Hibás jelszó'})
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Váratlan hiba történt'})
    }
  }

  public logout = async (req: Request, res: Response, next: NextFunction) => {}
}

const authController = new AuthController()
export default authController

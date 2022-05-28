import {AuthData} from '../../model/authData'
import {LoginDto} from '../../model/loginDto'
import {SignUpDto} from '../../model/signUpDto'
import Network from '../networking'

class AuthApi {
  public login = async (loginDto: LoginDto): Promise<AuthData> => {
    const response = await Network.post('/auth/login', loginDto)
    return response.data
  }

  public signUp = async (signUpDto: SignUpDto): Promise<AuthData> => {
    const response = await Network.post('/auth/createUser', signUpDto)
    return response.data
  }
}

const authApi = new AuthApi()
export default authApi

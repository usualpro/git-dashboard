import Axios from 'axios'
import Settings from '../constants/settings.json'

export const AxiosInstance = Axios.create({
    baseURL: Settings.baseUrl,
    headers: {
        'Content-Type': "application/json",
        'Authorization': 'Basic ' + btoa(":" + Settings.patToken)
    }
});
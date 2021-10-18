import Vue from 'vue';
import mockData from "@/data/mock";
import { getUserSettings, saveUserSettings} from '../services/userSettings';

const initStore = () => {
    const store = new Vue({
        data: {
            data: {
               userSettings: [],
            },
            state: {
                loading: null,
            },
        },
        computed: {
            
        },
        methods: {
            async getUserSettings(){
                const fetchedSetting = await getUserSettings()
                this.data.userSettings = [...mockData, ...fetchedSetting]
                return this.data.userSettings
            },
            async saveSettingsData(settings){
                await saveUserSettings(settings)
                this.data.userSettings = settings
            },
        },
    })
    return store
}

export default initStore



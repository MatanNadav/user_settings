import axios from 'axios';

export const getUserSettings = async () => {
    try {
        const {data} = await axios.get('https://api.jsonbin.io/b/616dd457aa02be1d445b4abb/4', {
            headers:{
                "secret-key": "$2b$10$AmQxEmOZQUZMJKHAOYTcQ.U09CmYDjMLHdzhX4cMeaWCGaX4YjKaK",
            },
        });
        return data;
    } catch(err) {
        return;
    }
    
}

export const saveUserSettings = async (settings) => {
    try {
        await axios.post('https://api.jsonbin.io/b/616dd457aa02be1d445b4abb/4', settings);
    } catch(err) {
        return err
    }
    
}
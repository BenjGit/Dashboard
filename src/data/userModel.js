import { useState, useEffect } from 'react';
import { fetchDataFromApi,fetchDataFromActivityApi} from '../api';
import { data as mockedData } from './data';

const UserModel = () => {
    const [data, setData] = useState([]);

    const fetchData = async (source, userId) => {
        let newData = [];
        if (source === 'mocked') {
            newData = mockedData;
        } else if (source === 'api') {
            try {
              
                const userData = await fetchDataFromApi(userId);
                const activityData = await fetchDataFromActivityApi(userId); 
                newData = normalizeApiData(userData, activityData);
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        }
        setData(newData);
    };

    useEffect(() => {
        fetchData('mocked', 12); // mettre les données mockées par défault
    }, []);

    const normalizeApiData = (userData, activityData) => {
    console.log(userData)
        const normalizedData = {
            id: userData.data.id,
            userInfos: {
                firstName: userData.data.userInfos.firstName,
                lastName: userData.data.userInfos.lastName,
                age: userData.data.userInfos.age,
            },
            todayScore: userData.data.todayScore,
            keyData: {
                calorieCount: userData.data.keyData.calorieCount,
                proteinCount: userData.data.keyData.proteinCount,
                carbohydrateCount: userData.data.keyData.carbohydrateCount,
                lipidCount: userData.data.keyData.lipidCount,
            },
            sessions: activityData.sessions.map(session => ({
              day: session.day,
              kilogram: session.kilogram,
              calories: session.calories,
          })),
        };
        return normalizedData;
    };

    const toggleDataSource = (source, userId) => {
        fetchData(source, userId);
    };

    return { data, toggleDataSource };
};

export default UserModel;

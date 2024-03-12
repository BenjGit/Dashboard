import { useState, useEffect } from 'react';
import { fetchDataFromApi,fetchDataFromActivityApi,fetchDataFromAverageSessionsApi,fetchDataFromPerformanceApi} from '../api';
import { data as mockedData } from './data';

const UserModel = () => {
    const [data, setData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(12); // ID de l'utilisateur sélectionné par défaut
    const [dataSource, setDataSource] = useState('mocked');
    const [error, setError] = useState(null); // Ajout d'un état pour stocker les erreurs

    const changeSelectedUserId = (userId) => {
        setSelectedUserId(userId);
    };

    const toggleDataSource = async (source) => {
        try {
            if (source === 'mocked') {
                const user = mockedData.user.find(user => user.id === selectedUserId); 
                const activity = mockedData.activity.find(activity => activity.userId === selectedUserId); 
                const averageSessions = mockedData.average_sessions.find(session => session.userId === selectedUserId); 
                const performance = mockedData.performance.find(performance => performance.userId === selectedUserId);
                const userMockedData = {
                    id: user.id,
                    userInfos: user.userInfos,
                    todayScore: user.todayScore ? user.todayScore : user.score,
                    keyData: user.keyData,
                    sessions: activity.sessions, 
                    averageSessions: averageSessions.sessions, 
                    performance: {
                        data:performance.data,
                        kind: {
                            1: 'cardio',
                            2: 'énergie',
                            3: 'endurance',
                            4: 'force',
                            5: 'vitesse',
                            6: 'intensité'
                        },
                    },
                    source: 'mocked'
                };
                if (userMockedData) {
                    setData(userMockedData);
                } else {
                    console.error('Mocked data not found for user ID:', selectedUserId);
                }
            } else if (source === 'api') {
                const userData = await fetchDataFromApi(selectedUserId);
                const activityData = await fetchDataFromActivityApi(selectedUserId);
                const averageSessionsData = await fetchDataFromAverageSessionsApi(selectedUserId);
                const performanceData = await fetchDataFromPerformanceApi(selectedUserId);
                const newData = normalizeApiData(userData, activityData, averageSessionsData, performanceData);
                setData(newData);
            } else {
                console.error('Invalid data source:', source);
            }
            setDataSource(source);
            setError(null);
        } catch (error) {
            console.error('Error toggling data source:', error);
            setError(error);
        }
    };

    useEffect(() => {
        toggleDataSource(dataSource); // mettre les données mockées par défaut
    }, [selectedUserId]);

    const normalizeApiData = (userData, activityData, averageSessionsData, performanceData) => {
        const normalizedData = {
            // Données de l'API
            id: userData.data.id,
            userInfos: {
                firstName: userData.data.userInfos.firstName,
                lastName: userData.data.userInfos.lastName,
                age: userData.data.userInfos.age,
            },
            todayScore: userData.data.todayScore ?  userData.data.todayScore : userData.data.score,
            keyData: {
                calorieCount: userData.data.keyData.calorieCount,
                proteinCount: userData.data.keyData.proteinCount,
                carbohydrateCount: userData.data.keyData.carbohydrateCount,
                lipidCount: userData.data.keyData.lipidCount,
            },
            sessions: activityData.data.sessions,
            averageSessions: averageSessionsData.data.sessions, 
            performance: {
                data: performanceData.data.data,
                kind: {
                    1: 'cardio',
                    2: 'énergie',
                    3: 'endurance',
                    4: 'force',
                    5: 'vitesse',
                    6: 'intensité'
                }
            },
            source: 'api' 
        };
        return normalizedData;
    };

    return { data, toggleDataSource, changeSelectedUserId, error };
};

export default UserModel;

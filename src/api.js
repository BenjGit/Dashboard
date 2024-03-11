import axios from "axios";

export function fetchDataFromApi(userId) {
    return axios.get(`http://localhost:3000/user/${userId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data from API:', error);
            throw error;
        });
}

export function fetchDataFromActivityApi(userId) {
    return axios.get(`http://localhost:3000/user/${userId}/activity`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching activity data from API:', error);
            throw error;
        });
}

export function fetchDataFromAverageSessionsApi(userId) {
    return axios.get(`http://localhost:3000/user/${userId}/average-sessions`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching average-sessions data from API:', error);
            throw error;
        });
}

export function fetchDataFromPerformanceApi(userId) {
    return axios.get(`http://localhost:3000/user/${userId}/performance`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching performance data from API:', error);
            throw error;
        });
}



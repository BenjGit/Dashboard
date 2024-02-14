import axios from "axios";

export function getUserAccount(userId) {
    return axios.get('http://localhost:3000/users/${userId}');
}


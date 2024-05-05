import axios from 'axios';

const apiURL = 'http://localhost:3000';


export const createIncident = (data) => {
    // return incident created
    return axios.post(apiURL+'/incident', data)
    .then(result => {
        return result.data
    })
    .catch(error => {
        return error
    });
}

export const getIncidentid = (id) => {
    // return incident by id
    return axios.get(apiURL+'/incidentbyid/'+id)
    .then(result => {
        return result.data
    })
    .catch(error => {
        return error
    });
}


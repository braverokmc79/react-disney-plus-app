import axios from 'axios'

const instance = axios.create({

    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '08d90cc4e7968b1f8e51588a0d42cf06',
        language: 'ko-KR'
    }
});

export default instance;


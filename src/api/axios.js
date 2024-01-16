import axios from 'axios'

export const axiosInnstance = axios.create({

    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '08d90cc4e7968b1f8e51588a0d42cf06',
        language: 'ko-KR'
    }
});

//가로 이미지 목록 가졀오기
//https://api.themoviedb.org/3/movie/1071215/images?api_key=0a08e38b874d0aa2d426ffc04357069d&language=en-US&include_image_language=en
export const axiosWidthImageInnstance = axios.create({

    baseURL: 'https://api.themoviedb.org/3/movie/',
    params: {
        api_key: '08d90cc4e7968b1f8e51588a0d42cf06',
        language: 'en-US',
        include_image_language:'en'
    }
});


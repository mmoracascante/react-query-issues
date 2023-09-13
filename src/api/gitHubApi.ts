import axios from 'axios'


export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})
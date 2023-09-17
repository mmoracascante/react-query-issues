import axios from 'axios'


export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})
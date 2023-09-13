import { useQuery } from "@tanstack/react-query"
import { gitHubApi } from "../api/gitHubApi"
import { Issue } from "../issues/interfaces"


const getIssues = async (): Promise<Issue[]> => {
    const { data } = await gitHubApi.get<Issue[]>('/issues')
    return data
}

export const useIssuesList = () => {
    const queryIssues = useQuery(
        ['queryIssues'],
        getIssues
    )
    return {
        queryIssues
    }
}
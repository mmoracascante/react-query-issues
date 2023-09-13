import { useQuery } from "@tanstack/react-query";
import { Issue } from "../issues/interfaces";
import { gitHubApi } from "../api/gitHubApi";
import { sleep } from "../helpers/sleep";



export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
    await sleep(2)
    const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`)
    return data

}


export const getIssueComment = async (issueNumber: number): Promise<Issue[]> => {
    await sleep(2)
    const { data } = await gitHubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
    return data
}

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery(
        ['issueQuery', issueNumber],
        () => getIssueInfo(issueNumber)
    )

    const commentsQuery = useQuery(
        ['commentsQuery', issueNumber, 'comments'],
        () => getIssueComment(issueQuery.data!.number),
        {
            // It's gonna trigger the query until the
            // first query end (issueQuery)
            enabled: issueQuery.data !== undefined,
        }

    )

    return {
        issueQuery,
        commentsQuery
    }

}
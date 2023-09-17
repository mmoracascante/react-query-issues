import { useInfiniteQuery } from "@tanstack/react-query"
import { Issue, State } from "../issues/interfaces"
import { sleep } from "../helpers"
import { gitHubApi } from "../api/gitHubApi"

interface Props {
    state?: State
    labels: string[]
    page?: number
}

interface QueryProps {
    pageParam?: number
    queryKey: (string | Props)[]
}


const getIssues = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issue[]> => {

    const [, , args] = queryKey
    const { state, labels } = args as Props

    const params = new URLSearchParams()

    if (state) params.append('state', state)
    if (labels.length > 0) {
        const labelsString = labels.join(',')
        params.append('labels', labelsString)
    }

    params.append('page', pageParam.toString())
    params.append('per_page', '5')

    const { data } = await gitHubApi.get<Issue[]>(`/issues?${params}`)
    return data
}



const useIssuesInfinite = ({ state, labels }: Props) => {

    const issuesQuery = useInfiniteQuery(
        ['issues', 'infinite', { state, labels }],
        (data) => getIssues(data),
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length === 0) return
                return pages.length + 1
            }
        }
    )

    return {
        issuesQuery
    }
}

export { useIssuesInfinite }
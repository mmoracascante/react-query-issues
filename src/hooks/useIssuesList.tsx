import { useQuery } from "@tanstack/react-query"
import { gitHubApi } from "../api/gitHubApi"
import { Issue, State } from "../issues/interfaces"
import { sleep } from "../helpers/sleep"
import { useEffect, useState } from "react";


interface Props {
    state?: State;
    labels: string[]
    page?: number
}


const getIssues = async ({ labels, state, page = 1 }: Props): Promise<Issue[]> => {
    await sleep(2)

    const params = new URLSearchParams()

    if (state) params.append('state', state)
    if (labels.length > 0) {
        const labelsString = labels.join(',')
        params.append('labels', labelsString)
    }

    params.append('page', page.toString())
    params.append('per_page', '5')

    const { data } = await gitHubApi.get<Issue[]>(`/issues?${params}`)
    return data
}

export const useIssuesList = ({ state, labels }: Props) => {

    const [page, setPage] = useState(1)

    useEffect(() => {

        setPage(1)

    }, [state, labels])




    const queryIssues = useQuery(
        ['queryIssues', { state, labels, page }],
        () => getIssues({ labels, state, page })
    )

    const nextPage = () => {
        if (queryIssues.data?.length === 0) return
        setPage(page + 1)
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    return {
        queryIssues,

        // Getter tiene una función propia
        page: queryIssues.isFetching ? 'Loading...' : page,


        // METHODS
        nextPage,
        prevPage
    }
}
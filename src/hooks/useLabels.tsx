import { useQuery } from '@tanstack/react-query'
import { gitHubApi } from '../api/gitHubApi'
import { Label } from '../issues/interfaces/label'
import { sleep } from '../helpers/sleep'

const getLabels = async (): Promise<Label[]> => {
    await sleep(2)
    const { data } = await gitHubApi.get<Label[]>('/labels?per_page=100')
    return data
}

const useLabels = () => {
    const labelsQuery = useQuery(
        ['labelsQuery'],
        getLabels,
        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            // placeholderData: [],
            // initialData: [
            //     {
            //         id: 791921801,
            //         node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
            //         url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
            //         name: "❤️",
            //         color: "ffffff",
            //         default: false,
            //     },
            //     {
            //         id: 2192194047,
            //         node_id: "MDU6TGFiZWwyMTkyMTk0MDQ3",
            //         url: "https://api.github.com/repos/facebook/react/labels/Component:%20Flight",
            //         name: "Component: Flight",
            //         color: "c4523e",
            //         default: false,
            //         description: "",
            //     }

            // ]
        }
    )
    return labelsQuery
}

export { useLabels }
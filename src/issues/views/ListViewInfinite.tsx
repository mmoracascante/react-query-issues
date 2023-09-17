import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { LoadingIcon } from '../../share/components/LoadingIcon';
import { State } from '../interfaces';
import { useIssuesInfinite } from '../../hooks/useIssuesInfinite';


export const ListViewInfinite = () => {


  const [state, setState] = useState<State>()
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels })

  const onChangeLabel = (labelName: string) => {
    (selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]))
  }



  return (
    <div className="row mt-5">

      <div className="col-8">
        {
          issuesQuery.isLoading
            ? (<LoadingIcon />)
            : (<IssueList
              // useInfiniteQuery devuelve un arreglo de arreglos
              // con el flat aplanamos todos los arreglos y queda uno solo
              // asi arreglamos el error que se presentaba con typescript
              issues={issuesQuery.data?.pages.flat() || []}
              state={state}
              onStateChange={(newState) => setState(newState)}
            />)
        }
        {issuesQuery.isFetching ? 'Loading...' : <button
          disabled={!issuesQuery.hasNextPage}
          onClick={() => issuesQuery.fetchNextPage()}
          className='btn btn-outline-primary mt-2'>Load more...</button>}
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabel={selectedLabels}
          onChange={(labelName) => onChangeLabel(labelName)}
        />
      </div>
    </div>
  )
}

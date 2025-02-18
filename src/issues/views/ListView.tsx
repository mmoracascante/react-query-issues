import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesList } from '../../hooks/useIssuesList';
import { LoadingIcon } from '../../share/components/LoadingIcon';
import { State } from '../interfaces';


export const ListView = () => {


  const [state, setState] = useState<State>()
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { queryIssues, page, nextPage, prevPage } = useIssuesList({ state, labels: selectedLabels })

  const onChangeLabel = (labelName: string) => {
    (selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]))
  }



  return (
    <div className="row mt-5">

      <div className="col-8">
        {
          queryIssues.isLoading
            ? (<LoadingIcon />)
            : (<IssueList
              issues={queryIssues.data || []}
              state={state}
              onStateChange={(newState) => setState(newState)}
            />)
        }
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button
            onClick={prevPage}
            disabled={queryIssues.isFetching}
            className='btn btn-outline-primary'>Preview</button>

          <span>{page}</span>

          <button
            disabled={queryIssues.isFetching}
            onClick={nextPage}
            className='btn btn-outline-primary'>Next</button>
        </div>
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

import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesList } from '../../hooks/useIssuesList';
import { LoadingIcon } from '../../share/components/LoadingIcon';


export const ListView = () => {

  const { queryIssues } = useIssuesList()

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

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
            : (<IssueList issues={queryIssues.data || []} />)
        }

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

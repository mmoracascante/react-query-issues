import { FC } from "react"
import { useLabels } from "../../hooks/useLabels"
import { LoadingIcon } from "../../share/components/LoadingIcon"

interface Props {
  selectedLabel: string[],
  onChange: (labelName: string) => void
}

export const LabelPicker: FC<Props> = ({ selectedLabel, onChange }) => {

  const labelsQuery = useLabels()

  if (labelsQuery.isLoading) {
    return (<LoadingIcon />)
  }


  return (
    <>
      {
        labelsQuery.data?.map(label => (
          <span
            key={label.id}
            onClick={() => onChange(label.name)}
            className={`badge rounded-pill m-1 label-picker ${selectedLabel.includes(label.name) ? 'label-active' : ''}`}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          >
            {label.name}
          </span>

        ))
      }

    </>
  )
}
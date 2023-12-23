'use client'

import { useMainModalStore } from '@/states/modal'
import { Modal } from '@/components/common/modal'
import { InputLabel } from '@/components/common/label'
import { Bar as Progress } from '@/components/common/progress'

import {
  Button,
  TextField,
  Tabs,
  ScrollArea,
  Code,
  Checkbox,
} from '@radix-ui/themes'

import {
  ButtonContainerStyle,
  DownloadContainerStyle,
  DownloadDescriptionStyle,
  InjectedWeightTypeSelectStyle,
  ProgressContainerStyle,
  ProgressSideStyle,
  VersionSelectBoxDescriptionStyle,
  VersionSelectBoxLeftStyle,
  VersionSelectBoxRightStyle,
  VersionSelectBoxStyle,
  VersionSelectBoxTitleStyle,
  VersionSelectContainerStyle,
} from './apply-model.css'
import { towerEndpoint, towerServer } from '@/utils/client-api'
import { useEffect, useState } from 'react'
import { useEventSource } from '@/hooks/use-event-source'

import type { WeightResponseType } from '@/states/modal'

async function getWeightMetadata(context: string) {
  let provider = 'custom'

  if (context.includes('civitai.com')) provider = 'civitai'
  if (context.includes('huggingface.co')) provider = 'huggingface'

  const data = await towerServer
    .get('providers/metadata', {
      searchParams: { provider, context },
    })
    .json<WeightResponseType>()

  return data
}

const NextButton = (props: { disabled?: boolean }) => {
  const increaseStep = useMainModalStore((state) => state.increaseStep)

  return (
    <Button color="iris" disabled={props.disabled} onClick={increaseStep}>
      Next
    </Button>
  )
}

const BackButton = () => {
  const decreaseStep = useMainModalStore((state) => state.decreaseStep)

  return (
    <Button color="gray" variant="soft" onClick={decreaseStep}>
      Back
    </Button>
  )
}

const CloseButton = () => {
  const setClose = useMainModalStore((state) => state.setModalClose)

  return (
    <Button color="gray" variant="soft" onClick={setClose}>
      Close
    </Button>
  )
}

const ButtonContainer = ({ children }: { children: React.ReactNode }) => (
  <div className={ButtonContainerStyle}>{children}</div>
)

const UrlIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
)

const DownloadUrlStep = () => {
  const { url, setUrl } = useMainModalStore()

  return (
    <>
      <InputLabel
        text="URL"
        description="Enter the URL of weight to download. Only Civitai or HuggingFace is allowed."
        htmlFor="modal-weight-url-input"
      />
      <TextField.Root>
        <TextField.Slot>
          <UrlIcon />
        </TextField.Slot>
        <TextField.Input
          id="modal-weight-url-input"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://civitai.com/models/12345/example-model"
        />
      </TextField.Root>
      <ButtonContainer>
        <NextButton disabled={!url} />
      </ButtonContainer>
    </>
  )
}

const VersionSelectBox = (props: {
  filename: string
  size: number
  versionId: number
  selected: boolean
  onClick: () => void
}) => {
  return (
    <div onClick={props.onClick} className={VersionSelectBoxStyle}>
      <div className={VersionSelectBoxLeftStyle}>
        <Checkbox color="iris" checked={props.selected} />
      </div>
      <div className={VersionSelectBoxRightStyle}>
        <Code
          className={VersionSelectBoxTitleStyle}
          color="iris"
          variant="soft"
          weight="light"
          size="2"
        >
          {props.filename}
        </Code>
        <div className={VersionSelectBoxDescriptionStyle}>
          <div>{props.size}GB</div>
        </div>
      </div>
    </div>
  )
}

const getRoundFromPercentage = (num: number) => Math.round(num * 100) / 100

const ProcessModelStep = () => {
  const { url, type, selectedVersion, setType, setVersion } =
    useMainModalStore()
  const [data, setData] = useState<WeightResponseType>()

  const handleTypeChange = (selectedType: typeof type) => {
    void setType(selectedType)
  }

  useEffect(() => {
    if (url) getWeightMetadata(url).then((r) => setData(r))
  }, [])

  return (
    <>
      <ScrollArea
        type="always"
        scrollbars="vertical"
        className={VersionSelectContainerStyle}
      >
        {data &&
          data.versions.map((v) => (
            <VersionSelectBox
              key={v.filename}
              filename={v.filename}
              size={Math.round(v.size * 10) / 10}
              versionId={v.versionId}
              selected={v.filename === selectedVersion?.filename}
              onClick={() => setVersion(v)}
            />
          ))}
      </ScrollArea>
      <ButtonContainer>
        <BackButton />
        <NextButton disabled={!selectedVersion} />
      </ButtonContainer>
    </>
  )
}

const DownloadInProgressStep = () => {
  const { selectedVersion, type, id, setId, downloadProgress, setProgress } =
    useMainModalStore()

  if (!selectedVersion) return null

  const { size, downloadUrl, filename } = selectedVersion

  useEffect(() => {
    if (id) return

    towerServer
      .post('weights', { json: { type, url: downloadUrl, filename } })
      .then((res) => res.json<{ id: string }>())
      .then(({ id }) => setId(id))
  }, [])

  const [es] = useEventSource(`${towerEndpoint}/weights/${id}/progress`)

  useEffect(() => {
    if (es) {
      es.onmessage = (e) => {
        const { percentage } = JSON.parse(e.data)
        setProgress(Math.round(percentage * 1000) / 10)
      }
    }
  }, [es])

  return (
    <div className={DownloadContainerStyle}>
      <div>
        <div>{filename}</div>
        <div className={DownloadDescriptionStyle}>
          Total {getRoundFromPercentage(size)}GB
        </div>
      </div>
      <div className={ProgressContainerStyle}>
        <Progress progress={downloadProgress} />
        <div className={ProgressSideStyle}>{downloadProgress}%</div>
      </div>
      <ButtonContainer>
        <CloseButton />
      </ButtonContainer>
    </div>
  )
}

const modalMessages = [
  {
    title: 'Step 1.',
    description: 'Stable Diffusion agent will try to download the models.',
  },
  {
    title: 'Step 2.',
    description: 'Select the version of weight you want to get it downloaded.',
  },
  {
    title: 'Step 3.',
    description: 'Download in progress...',
  },
]

export const ApplyModal = () => {
  const { isOpen, setModalClose, currentStep } = useMainModalStore()

  const handleClose = () => {
    void setModalClose()
  }

  const { title, description } = modalMessages[currentStep - 1]

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      setIsOpen={handleClose}
    >
      {currentStep === 1 && <DownloadUrlStep />}
      {currentStep === 2 && <ProcessModelStep />}
      {currentStep === 3 && <DownloadInProgressStep />}
    </Modal>
  )
}

export const ModalButton = ({ children }: { children: React.ReactNode }) => {
  const { setModalOpen } = useMainModalStore()

  return (
    <Button color="gray" size="2" variant="outline" onClick={setModalOpen}>
      {children}
    </Button>
  )
}

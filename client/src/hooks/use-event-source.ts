import { useEffect, useRef, useState } from 'react'

type EventSourceConstructor = {
  new (url: string, eventSourceInitDict?: EventSourceInit): EventSource
}

export type EventSourceStatus = 'init' | 'open' | 'closed' | 'error'

export type EventSourceEvent = Event & { data: string }

let sharedEventSource: { [key: string]: EventSource } = {}

function initEventSource(url: string, withCredentials = false) {
  if (!sharedEventSource[url]) {
    sharedEventSource[url] = new EventSource(url, { withCredentials })
  }
  return sharedEventSource[url]
}

function getEventSource(key: string) {
  return sharedEventSource[key]
}

function closeEventSource(key: string) {
  if (sharedEventSource[key] !== null) {
    sharedEventSource[key].close()
    delete sharedEventSource[key]
  }
}

export function useEventSource(
  url: string,
  withCredentials?: boolean,
  ESClass: EventSourceConstructor = EventSource
) {
  // const source = useRef<EventSource | null>(null)
  const [status, setStatus] = useState<EventSourceStatus>('init')
  useEffect(() => {
    if (url) {
      const es = initEventSource(url, withCredentials)
      // source.current = es

      es.addEventListener('open', () => setStatus('open'))
      es.addEventListener('error', () => setStatus('error'))

      return () => {
        // source.current = null
        es.close()
        closeEventSource(url)
      }
    }

    setStatus('closed')

    return undefined
  }, [url, withCredentials, ESClass])

  return [getEventSource(url), status] as const
}

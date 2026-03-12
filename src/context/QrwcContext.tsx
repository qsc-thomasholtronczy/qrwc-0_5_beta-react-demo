import React, { createContext, useState, useEffect, useContext } from 'react'
import { Qrwc } from '@q-sys/qrwc'
import { COMPONENT_CONTROLS, ControlDictionary, ComponentName } from './ControlMap'

type QrwcContextType = {
  initialized: boolean
  controls: ControlDictionary
}

const QrwcContext = createContext<QrwcContextType>({
  initialized: false,
  controls: {},
})

function ResolveControls(qrwc: any): ControlDictionary {
  const resolved: ControlDictionary = {}

  for (const component of Object.keys(COMPONENT_CONTROLS) as ComponentName[]) {
    const ids = COMPONENT_CONTROLS[component]
    ;(resolved[component] ??= {} as any)

    for (const controlId of ids) {
      const control = qrwc.components?.[component]?.controls?.[controlId]
      ;(resolved[component] as any)[controlId] = control

      if (!control) {
        console.warn(
          '[QRWC missing Component or Control. Check ControlMap.tsx or Q-SYS Design file.]',
          component,
          controlId
        )
      }
    }
  }

  return resolved
}

export function useQrwc() {
  return useContext(QrwcContext)
}

export default function QrwcProvider({ children }: { children: React.JSX.Element }) {
  const [controls, setControls] = useState<ControlDictionary>({})
  const reconnectDelay = 5000

  useEffect(() => {
    const setupQrwc = async () => {
      const coreIP = process.env.REACT_APP_CORE_IP_ADDRESS ?? ''
      const socket = new WebSocket(`ws://${coreIP}/qrc-public-api/v0`)

      const qrwc = await Qrwc.createQrwc<any>({
        socket,
        timeout: 3000,
        pollingInterval: 100,
      })

      qrwc.on('disconnected', () => {
        setTimeout(setupQrwc, reconnectDelay)
      })

      setControls(ResolveControls(qrwc))
      return qrwc
    }

    const qrwc = setupQrwc()
    return () => {
      qrwc.then((qrwc) => qrwc.close())
    }
  }, [])

  const initialized = Object.values(controls).every((componentControls) =>
    componentControls ? Object.values(componentControls).every(Boolean) : false
  )

  return (
    <QrwcContext.Provider value={{ controls, initialized }}>
      {children}
    </QrwcContext.Provider>
  )
}
import React, { ReactElement, useState, useEffect } from "react"

import "./Toast.css"
import type { ToastType } from "../../../types/Toast"

const Toast = (props: {
  toastList: [ToastType] | []
  position: string
  autoDelete: boolean
  autoDeleteTime: number
}): ReactElement => {
  const { toastList, position, autoDelete, autoDeleteTime } = props
  const [list, setList] = useState(toastList)

  useEffect(() => setList([...toastList]), [toastList])

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id)
      }
    }, autoDeleteTime)

    return () => {
      clearInterval(interval)
    }

    // eslint-disable-next-line
  }, [toastList, autoDelete, autoDeleteTime, list])

  const deleteToast = (id: number) => {
    if (list.length > 0) {
      const listItemIndex = list.findIndex((e: ToastType) => e.id === id)
      const toastListItem = toastList.findIndex((e) => e.id === id)
      list.splice(listItemIndex, 1)
      toastList.splice(toastListItem, 1)
      setList([...list])
    } else {
      console.log(`Id ${id} not found`, id)
    }
  }

  return (
    <>
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div className="notification-image">
              <img src={toast.icon} alt="" />
            </div>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Toast

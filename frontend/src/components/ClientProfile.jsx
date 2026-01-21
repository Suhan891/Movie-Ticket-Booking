import React from 'react'
import {useSearchParams} from "react-router-dom"

const ClientProfile = () => {
  const  [ params ] = useSearchParams()
  const token = params.get("token")
  console.log(token)
  return (
    <div className={"text-white fs-bold"}>CLient Profile: {token}</div>
  )
}

export default ClientProfile
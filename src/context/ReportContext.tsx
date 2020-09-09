import React, { createContext, useState } from 'react'

export const ReportContext = createContext({})

export const ReportProvider = ({ children }: any) => {
  const [commits, setCommits] = useState<any>([])

  return (
    <ReportContext.Provider
      value={{
        commits,
        setCommits,
      }}
    >
      {children}
    </ReportContext.Provider>
  )
}

import React, { useState } from 'react'
import { Checkbox } from '3oilerplate'
import { SFile, SFileHeader, SFileSource, SFileHeaderPath, SFileHeaderOptions } from './File.styled'
import { SourceComponent } from '..'

const FileComponent = ({ file }: any) => {
  const [activeFilter, setActiveFilter] = useState<any>({
    s: true,
    f: true,
    b: true,
  })

  return (
    <SFile>
      <SFileHeader>
        <SFileHeaderPath>{file.path}</SFileHeaderPath>
        <SFileHeaderOptions>
          <Checkbox
            s={{ color: 'indicators.statement' }}
            isChecked={activeFilter.s}
            label="Statements"
            onChange={() => setActiveFilter({ ...activeFilter, s: !activeFilter.s })}
          />
          <Checkbox
            s={{ color: 'indicators.function' }}
            isChecked={activeFilter.f}
            label="Functions"
            onChange={() => setActiveFilter({ ...activeFilter, f: !activeFilter.f })}
          />
          <Checkbox
            s={{ color: 'indicators.branch' }}
            isChecked={activeFilter.b}
            label="Branches"
            onChange={() => setActiveFilter({ ...activeFilter, b: !activeFilter.b })}
          />
        </SFileHeaderOptions>
      </SFileHeader>
      <SFileSource>
        <SourceComponent file={file} activeFilter={activeFilter} />
      </SFileSource>
    </SFile>
  )
}

export default FileComponent

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

  function onFilterChange(value: string) {
    console.log(value)
  }

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
    // <div className="File">
    //   <div className="FileHeader">
    //     <div className="FileHeaderPath">{file.path}</div>
    //     <div className="FileHeaderOptions">
    //       <div
    //         className={classNames('FileHeaderOptionsOption is-s', activeFilter.s && 'is-active')}
    //         onClick={() => setActiveFilter({ ...activeFilter, s: !activeFilter.s })}
    //       >
    //         <span className="FileHeaderOptionsOptionIndicator is-s"></span>
    //       </div>
    //       <div
    //         className={classNames('FileHeaderOptionsOption is-f', activeFilter.f && 'is-active')}
    //         onClick={() => setActiveFilter({ ...activeFilter, f: !activeFilter.f })}
    //       >
    //         <span className="FileHeaderOptionsOptionIndicator is-f"></span>
    //       </div>
    //       <div
    //         className={classNames('FileHeaderOptionsOption is-b', activeFilter.b && 'is-active')}
    //         onClick={() => setActiveFilter({ ...activeFilter, b: !activeFilter.b })}
    //       >
    //         <span className="FileHeaderOptionsOptionIndicator is-b"></span>
    //       </div>
    //     </div>
    //   </div>
    //   <SourceComponent file={file} activeFilter={activeFilter} />
    // </div>
  )
}

export default FileComponent

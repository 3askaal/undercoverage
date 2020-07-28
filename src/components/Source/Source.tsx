import React from 'react'
import { sum, isNumber, forOwn } from 'lodash'
import { isArray } from 'util'
import {
  SSource,
  SSourceLineInfo,
  SSourceSourceWrapper,
  SSourceSource,
  SSourceLineInfoLine,
  SSourceLineInfoLineIndex,
  SSourceLineInfoLineHits,
  SSourceSourceLine,
  SSourceSourceLineMain,
  SSourceSourceLineHighlight,
  SSourceSourceLineHighlightPart,
} from './Source.styled'

export const SourceComponent = ({ file, activeFilter }: any) => {
  function getSrcWithWhitespace(src: string): string {
    return src.replace(/ /g, '\u00a0')
  }

  function getHighlightedSource(line: any, metaObject: any, type: string): any {
    let src = getSrcWithWhitespace(line.src)

    const start = metaObject.start
    const end = metaObject.end
    const full = metaObject.full

    if (full) {
      return (
        <SSourceSourceLineHighlightPart type={type} isFull={full}>
          {src}
        </SSourceSourceLineHighlightPart>
      )
    }

    if (isNumber(start)) {
      if (isNumber(end)) {
        return (
          <>
            {src.slice(0, start)}
            <SSourceSourceLineHighlightPart type={type}>
              {src.slice(start, end)}
            </SSourceSourceLineHighlightPart>
            {src.slice(end)}
          </>
        )
      }

      return (
        <>
          {src.slice(0, start)}
          <SSourceSourceLineHighlightPart type={type}>
            {src.slice(start)}
          </SSourceSourceLineHighlightPart>
        </>
      )
    }

    return <>{line.src}</>
  }

  function getLineHits(line: any): number {
    let hits = 0

    forOwn(activeFilter, (isActive, key) => {
      if (isActive) {
        hits += sum(line.meta[key].map(({ hits }: any) => (isArray(hits) ? hits[0] : hits)))
      }
    })

    return hits
  }

  function shouldHighlight(line: any, type: string) {
    return activeFilter[type]
  }

  function getLineCoverageType(line: any) {
    if (line.src && line.src.length) {
      if (getLineHits(line)) {
        return 'hit'
      } else {
        return 'miss'
      }
    }

    return null
  }

  return (
    <SSource>
      <SSourceLineInfo>
        {file.lines.map((line: any) => (
          <SSourceLineInfoLine>
            <SSourceLineInfoLineIndex>{line.index}</SSourceLineInfoLineIndex>
            {getLineHits(line) && line.src.length ? (
              <SSourceLineInfoLineHits>
                <span>{getLineHits(line)}</span>
              </SSourceLineInfoLineHits>
            ) : null}
          </SSourceLineInfoLine>
        ))}
      </SSourceLineInfo>
      <SSourceSourceWrapper>
        <SSourceSource>
          {file.lines.map((line: any) => (
            <SSourceSourceLine type={getLineCoverageType(line)}>
              <SSourceSourceLineMain>{getSrcWithWhitespace(line.src)}</SSourceSourceLineMain>
              {line.src && shouldHighlight(line, 's')
                ? line.meta.s.map((metaObject: any) => (
                    <SSourceSourceLineHighlight>
                      {getHighlightedSource(line, metaObject, 's')}
                    </SSourceSourceLineHighlight>
                  ))
                : null}
              {line.src && shouldHighlight(line, 'f')
                ? line.meta.f.map((metaObject: any) => (
                    <SSourceSourceLineHighlight>
                      {getHighlightedSource(line, metaObject, 'f')}
                    </SSourceSourceLineHighlight>
                  ))
                : null}
              {line.src && shouldHighlight(line, 'b')
                ? line.meta.b.map((metaObject: any) => (
                    <SSourceSourceLineHighlight>
                      {getHighlightedSource(line, metaObject, 'b')}
                    </SSourceSourceLineHighlight>
                  ))
                : null}
            </SSourceSourceLine>
          ))}
        </SSourceSource>
      </SSourceSourceWrapper>
    </SSource>
  )
}

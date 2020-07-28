import * as fs from 'fs'
import { forOwn } from 'lodash'
import { Repository } from 'nodegit'

const COV_FOLDER_PATH: string = __dirname + '/../coverage/'
const COV_FILE_PATH: string = COV_FOLDER_PATH + 'coverage-final.json'

export async function processReport() {
  const covReport = JSON.parse(fs.readFileSync(COV_FILE_PATH, 'utf-8'))

  const gitRepo = await Repository.open('.git')
  const gitCommit: any = await gitRepo.getHeadCommit()
  const gitCommitSha: any = gitCommit.sha()
  const gitBranchNameRef: any = await gitRepo.getCurrentBranch()
  const gitBranchName = gitBranchNameRef.name().replace(/\//gi, '-')

  const underCoverageReport: any = {
    details: {
      date: Date.now(),
      git: {
        commitSha: gitCommitSha,
        branchName: gitBranchName,
      },
    },
    files: parseCovReport(covReport),
  }

  fs.writeFileSync(
    `./undercoverage/${gitCommitSha}-${gitBranchName}.json`,
    JSON.stringify(underCoverageReport),
  )
}

function parseCovReport(covReport: any) {
  const files: any[] = []

  forOwn(covReport, (fileCov, filePath) => {
    const fileSrc = fs.readFileSync(filePath, 'utf-8')

    const lines: any = fileSrc.split(/\n/).map((lineSrc: string, lineIndex: number) => {
      return {
        index: lineIndex + 1,
        src: lineSrc,
        meta: getLineMetaData(fileCov, lineIndex + 1),
      }
    })

    const file: any = {
      path: filePath,
      lines,
      cov: {
        ...fileCov,
        path: undefined,
      },
    }

    files.push(file)
  })

  return files
}

function getLineMetaData(fileCov: any, lineIndex: number) {
  let meta: any = {
    s: [],
    f: [],
    b: [],
  }

  forOwn(fileCov.statementMap, ({ start, end }, key: string) => {
    if (lineIndex >= start.line && lineIndex <= end.line) {
      const startsOn = start.line === lineIndex && start.column
      const endsOn = end.line === lineIndex && end.column

      meta.s.push({
        hits: fileCov.s[key],
        start: startsOn,
        end: endsOn,
        full: !startsOn && !endsOn,
      })
    }
  })

  forOwn(
    fileCov.fnMap,
    (
      { loc: { start: locStart, end: locEnd }, decl: { start: declStart, end: declEnd } },
      key: string,
    ) => {
      if (lineIndex >= declStart.line && lineIndex <= locEnd.line) {
        const startsOn = declStart.line === lineIndex && declStart.column
        const endsOn = locEnd.line === lineIndex && locEnd.column

        meta.f.push({
          hits: fileCov.f[key],
          start: startsOn,
          end: endsOn,
          full: !startsOn && !endsOn,
        })
      }
    },
  )

  forOwn(fileCov.branchMap, ({ loc: { start, end } }, key: string) => {
    if (lineIndex >= start.line && lineIndex <= end.line) {
      const startsOn = start.line === lineIndex && start.column
      const endsOn = end.line === lineIndex && end.column

      meta.b.push({
        hits: fileCov.b[key],
        start: startsOn,
        end: endsOn,
        full: !startsOn && !endsOn,
      })
    }
  })

  return meta
}

processReport()

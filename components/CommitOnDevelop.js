import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import 'chartist/dist/chartist.css'
import ChartistGraph from 'react-chartist'

import { If } from './If'
import GitStore from '../stores/git'

const TableHeader = () => <>
    <tr>
        <th>Name</th>
        <th>Number of commits</th>
    </tr>
</>

const type = 'Bar'

const Content = observer(
    () => {
        const hasASelectedRepository = (
            GitStore.selectedRepository !== '' &&
            GitStore.commitOnDevelopData.length > 0
        )

        return <div className="container is-fluid" data-cy="CommitOnDevelop">
            <h2 className="title">
                Number of commits on the develop branch
            </h2>
            <If condition={hasASelectedRepository}>
                <table className="table is-fullwidth is-bordered is-hoverable">
                    <thead>
                        <TableHeader />
                    </thead>
                    <tbody>
                        {
                            GitStore.commitOnDevelopData.map((user, index) => <tr key={index}>
                                <td>
                                    <div className="columns">
                                        <div className="column is-1">
                                            <figure className="image is-1by1">
                                                <img src={user.imageUrl} />
                                            </figure>
                                        </div>
                                        <div className="column ">
                                            {user.author}
                                        </div>
                                    </div>
                                </td>
                                <td>{user.count}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                <div data-cy="CommitOnDevelopChartistGraph">
                    <ChartistGraph data={{
                        labels: GitStore.commitOnDevelopData.map(user => user.author),
                        series: [
                            GitStore.commitOnDevelopData.map(user => user.count)
                        ]
                    }} type={type} />
                </div>

            </If>
        </div>
    }
)

export const CommitOnDevelop = () => {
    useEffect(() => {
        GitStore.getAllCommitsOfAllUsersForABranch()
    }, [])
    return <Content />
}
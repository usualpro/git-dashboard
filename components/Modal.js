import Head from 'next/head'
import { observer } from "mobx-react-lite"
import 'chartist/dist/chartist.css'
import ChartistGraph from 'react-chartist'
import { format } from "date-fns"

import GitStore from '../stores/git'
import { If } from './If';

const type = 'Line'

const Content = observer(() => <If
    condition={GitStore.currentDisplayedCommitter !== null}
    fallback={null}>
    <Head>
        <script src="https://kit.fontawesome.com/53190888e6.js" crossorigin="anonymous"></script>
    </Head>
    <div className="modal is-active">
        <div className="modal-background" onClick={() => {
            GitStore.currentDisplayedCommitter = null
        }}></div>
        <div className="modal-content">
            <div className="box">
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <h3>
                                {GitStore.currentDisplayedCommitter?.author}
                            </h3>
                            <ChartistGraph
                                options={
                                    {
                                        height: "37.5rem",
                                    }
                                }
                                data={
                                    {
                                        labels: GitStore.currentDisplayedCommitterDates.map(commit => format(new Date(commit.date), 'dd/MM')),
                                        series: [
                                            GitStore.currentDisplayedCommitterDates.map(commit => commit.count)
                                        ]
                                    }
                                }
                                type={type} />
                        </div>

                    </div>
                </article>
            </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => {
            GitStore.currentDisplayedCommitter = null
        }}></button>
    </div>
</If>
)
export const Modal = () => <Content />
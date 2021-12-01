import Head from 'next/head';
import 'bulma/css/bulma.min.css';

import { RepoSelector, CommitOnDevelop, CommitByUser, Modal } from '../components/';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Git Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RepoSelector />
      <div className="mb-5">
        <CommitByUser />
      </div>
      <div className="mb-5">
        <CommitOnDevelop />
      </div>
      <Modal />
    </div>
  )
}

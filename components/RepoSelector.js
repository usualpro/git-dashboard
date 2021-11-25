import { useEffect } from 'react'
import GitStore from '../stores/git'

const onChange = (select) => {
    GitStore.selectedRepository = select.target.value;
    GitStore.getAllCommitsOfAllUsersForABranch()
    GitStore.getAllCommitsOfAllUsers();
}

export const RepoSelector = () => {

    useEffect(() => {
        GitStore.selectedRepository = GitStore.repositories[0];
    }, [])

    return <section className="container is-fluid py-5" data-cy="RepoSelector">
        <div className="select is-fullwidth">
            <select {...{ onChange }} >
                <option disabled>Select a directory</option>
                {
                    GitStore.repositories.map((repo, index) => <option key={index}>{repo}</option>)
                }
            </select>
        </div>
    </section>
}
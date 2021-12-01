import { makeObservable, observable, computed } from "mobx"
import _ from 'lodash'

import { Services } from "../https/services"
import Repos from '../constants/repos.json'
import Team from '../constants/team.json'

class Git {
    repositories = Repos
    _selectedRepository = ''
    _commitOnDevelopData = []
    _commitByUserData = []
    _currentDisplayedCommitter = null

    constructor() {
        makeObservable(this, {
            _selectedRepository: observable,
            _commitOnDevelopData: observable.shallow,
            _commitByUserData: observable.shallow,
            _currentDisplayedCommitter: observable.shallow,
            selectedRepository: computed,
            commitOnDevelopData: computed,
            commitByUserData: computed,
            currentDisplayedCommitter: computed,
            currentDisplayedCommitterDates: computed
        })
    }

    getAllCommitsOfAllUsersForABranch() {
        this.commitOnDevelopData = []
        Services.getAllCommitsOfAllUsersForABranch(
            this.selectedRepository,
            'develop',
            Team
        ).then((results) => {
            this.commitOnDevelopData = results.filter(res => res.data.count > 0).map((res) => {
                return {
                    count: res.data.count,
                    author: res.data.value[0].committer.name,
                    imageUrl: res.data.value[0].committer.imageUrl,
                    value: res.data.value,
                }
            }).sort((a, b) => a.count - b.count)
        }).catch(() => {
            this.commitOnDevelopData = []
        })
    }

    getAllCommitsOfAllUsers() {
        this.commitByUserData = []
        Services.getAllCommitsOfAllUsers(
            this.selectedRepository,
            Team
        ).then((results) => {
            this.commitByUserData = results.filter(res => res.data.count > 0).map((res) => {
                return {
                    count: res.data.count,
                    author: res.data.value[0].committer.name,
                    imageUrl: res.data.value[0].committer.imageUrl,
                    value: res.data.value,
                }
            }).sort((a, b) => a.count - b.count)
        }).catch(() => {
            this.commitByUserData = []
        })
    }

    get selectedRepository() {
        return this._selectedRepository
    }

    set selectedRepository(selectedRepository) {
        this._selectedRepository = selectedRepository
    }


    get commitOnDevelopData() {
        return this._commitOnDevelopData
    }


    set commitOnDevelopData(developData) {
        this._commitOnDevelopData = developData
    }

    get commitByUserData() {
        return this._commitByUserData
    }


    set commitByUserData(commitData) {
        this._commitByUserData = commitData
    }

    get currentDisplayedCommitter() {
        return this._currentDisplayedCommitter
    }

    set currentDisplayedCommitter(committer) {
        this._currentDisplayedCommitter = committer
    }

    get currentDisplayedCommitterDates() {
        const dates = _.uniq(this.currentDisplayedCommitter?.value.map((commit) => commit.committer.date.split("T")[0]))
        const data = dates.map((date) => {
            const count = this.currentDisplayedCommitter?.value.filter((commit) => commit.committer.date.startsWith(date)).length
            return {
                date,
                count
            }
        })
        return data
    }

}
export default new Git();
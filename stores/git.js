import { makeObservable, observable, computed } from "mobx"

import { Services } from "../https/services"
import Repos from '../constants/repos.json'
import Team from '../constants/team.json'

class Git {
    repositories = Repos
    _selectedRepository = ''
    _commitOnDevelopData = []
    _commitByUserData = []

    constructor() {
        makeObservable(this, {
            _selectedRepository: observable,
            _commitOnDevelopData: observable.shallow,
            _commitByUserData: observable.shallow,
            selectedRepository: computed,
            commitOnDevelopData: computed,
            commitByUserData: computed
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
                    author: res.data.value[0].author.name,
                    imageUrl: res.data.value[0].committer.imageUrl,
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
                    author: res.data.value[0].author.name,
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


}
export default new Git();
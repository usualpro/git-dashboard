import { format, subDays } from "date-fns"

import { AxiosInstance } from "./instance"

const commonParams = {
    ["searchCriteria.$top"]: 5000,
    ["searchCriteria.api-version"]: 6.0,
    ["searchCriteria.includeUserImageUrl"]: true,
}

export const showDays = 15;

export const Services = {
    commitEndPoint: repository => `${repository}/_apis/git/repositories/${repository}/commits`,

    getAllCommitsOfUserForABranch: (repository, branch, user) => AxiosInstance.get(
        Services.commitEndPoint(repository),
        {
            params: {
                ["searchCriteria.itemVersion.version"]: branch,
                ["searchCriteria.user"]: user,
                ...commonParams
            }
        }),

    getAllCommitsOfUser: (repository, user) => AxiosInstance.get(
        Services.commitEndPoint(repository),
        {
            params: {
                ["searchCriteria.user"]: user,
                ["searchCriteria.fromDate"]: format(subDays(new Date(), showDays), 'dd/MM/yyyy'),
                ...commonParams
            }
        }),

    getAllCommitsOfAllUsersForABranch: (repository, branch, team) => {
        const requests = team.map(
            (user) => Services.getAllCommitsOfUserForABranch(repository, branch, user.email)
        )
        return Promise.all(requests);
    },

    getAllCommitsOfAllUsers: (repository, team) => {
        const requests = team.map(
            (user) => Services.getAllCommitsOfUser(repository, user.email)
        )
        return Promise.all(requests);
    },
}

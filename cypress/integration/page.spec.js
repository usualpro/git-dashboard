/// <reference types="cypress" />

import RepoData from "../../constants/repos.json"
import teamData from "../../constants/team.json"

const repoDataLength = RepoData.length
const teamDataLength = teamData.length
const halfOfTheTeamData = Math.round(teamDataLength / 2)

describe('git commit visulizer app', () => {
    before(() => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL'))
    })

    it('displays the right  page title', () => {
        cy.title()
            .should('eq', 'Git Dashboard')
    })

    it('displays the select RepoSelector bar with the respositories in it', () => {
        cy.get('[data-cy=RepoSelector]')
            .find('option')
            .should('have.length', repoDataLength + 1)
    })

    context('check for the number of commits in the last 15 days', () => {
        it('displays the Number of commits in the last 15 days', () => {
            cy.get('[data-cy=CommitByUser]')
                .find('tbody tr')
                .should('have.length', teamDataLength)
        })

        it('displays a datavisualisation for the Number of commits in the last 15 days', () => {
            cy.get('[data-cy=CommitByUserChartistGraph]')
                .find('svg foreignObject')
                .should('have.length.at.least', halfOfTheTeamData)
        })
    })

    context('check for the number of commits on the develop branch', () => {
        it('displays the Number of commits', () => {
            cy.get('[data-cy=CommitOnDevelop]')
                .find('tbody tr')
                .should('have.length.at.least', halfOfTheTeamData)
        })

        it('displays a datavisualisation for the Number of commits in the last 15 days', () => {
            cy.get('[data-cy=CommitOnDevelopChartistGraph]')
                .find('svg foreignObject')
                .should('have.length.at.least', halfOfTheTeamData)
        })
    })
})

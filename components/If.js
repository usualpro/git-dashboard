import { Loader } from './Loader'

export const If = props => (props.condition === true)
    ? props.children
    : <Loader />
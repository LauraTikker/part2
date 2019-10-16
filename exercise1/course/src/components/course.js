import React from 'react'


const Header = ({header}) =>
    <h1>{header}</h1>

const Total = ({parts}) => {
    let total = parts.reduce((sum, onepart) => {
        return sum + onepart.exercises
    }, 0)

    return <p>total {total} exercises</p>
}

const Part = ({part}) =>
    <p>{part.name} {part.exercises}</p>


const Content = ({parts}) => (
    <div>
        {parts.map(onepart => <Part key={onepart.id} part={onepart} />)}
    </div>
)

const Course = ({ courses }) => (
    <div>
        <Header header={courses.name} />
        <Content parts={courses.parts} />
        <Total parts={courses.parts} />
    </div>
)
export default Course
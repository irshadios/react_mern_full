import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Exercise = props => (
    <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
    <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.delteExercise(props.exercise._id)}}>delete</a>
    </td>
    </tr>
)


export default class exercisesList extends Component {

    constructor(props) {
        super(props)

        this.state = { exercises: [] }

    }

    componentDidMount() {
        axios.get("http://localhost:5000/exercises/")
            .then(response => {
                this.setState({
                    exercises: response.data
                })

                console.log(response.data)
            }).catch((err) => console.log(err))
    }

    delteExercise = (id) => {
        axios.delete("http://localhost:5000/exercises/" + id)
            .then(res => console.log(res.data))
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }
    exercisesList = () => {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise ={currentExercise} delteExercise={this.delteExercise} key={currentExercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                            {this.exercisesList()}
                        </tbody>
                </table>

            </div>
        )
    }
}

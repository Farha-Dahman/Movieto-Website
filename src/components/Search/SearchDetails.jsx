import React from 'react'
import GetDetails from '../GetDetails/GetDetails'
import { useParams } from 'react-router-dom';

export default function SearchDetails() {
    let { id } = useParams();

    return (
        <GetDetails
            type="movie"
            id= {id}
        />
    )
}

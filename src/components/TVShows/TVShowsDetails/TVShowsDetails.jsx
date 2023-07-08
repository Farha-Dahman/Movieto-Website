import React from 'react'
import GetDetails from '../../GetDetails/GetDetails'
import { useParams } from 'react-router-dom';

export default function TVShowsDetails() {
    let { id } = useParams();

    return (
        <GetDetails
            type="tv"
            id= {id}
        />
    )
}

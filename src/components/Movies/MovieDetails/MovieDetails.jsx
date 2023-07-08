import React from 'react'
import GetDetails from '../../GetDetails/GetDetails'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'

export default function MovieDetails() {
    let { id } = useParams();

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movieto | Movie Details</title>
                <meta name="description" content="Movie details page" />
            </Helmet>
            <GetDetails
                type="movie"
                id={id}
            />
        </>

    )
}

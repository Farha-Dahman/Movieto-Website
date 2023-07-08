import React from 'react'
import People from '../People'

export default function PopularPeople() {
    return (
        <>
            <People
                api = 'https://api.themoviedb.org/3/person/popular?api_key=30ac20d93ca9a886b21f81428e9c6de3'
                title = 'Popular People'
            />
        </>
    )
}

import React from 'react'

export default function ShowDatesAvailable(props) {
  return (
    <ul>
          {Array.isArray(props.availableDates) ? (
              props.availableDates.map((x, i) => (
              <li key={i}>{x}</li>
              ))
          ) : (
              <></>
          )}
    </ul>
  )
}

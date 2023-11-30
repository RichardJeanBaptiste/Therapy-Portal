import React from 'react'

export default function ShowDates(props) {
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

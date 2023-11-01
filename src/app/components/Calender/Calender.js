import { React , createContext, useContext } from 'react';
import Month from './Month';
import { DateProvider } from './DateProvider';



export default function Calender() {
  return (
    <>
        <DateProvider>
            <Month/>
        </DateProvider>
    </>
  )
}




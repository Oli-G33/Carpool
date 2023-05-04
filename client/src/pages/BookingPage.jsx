import React, { useReducer } from 'react';
import {
  DateRangeInput,
  DateSingleInput,
  Datepicker
} from '@datepicker-react/styled';
import Navbar from '../components/Navbar';

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, focusedInput: action.payload };
    case 'dateChange':
      return action.payload;
    default:
      throw new Error();
  }
}

const BookingPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <Navbar />
      <div>
        BookingPage
        <Datepicker
          onDatesChange={data =>
            dispatch({ type: 'dateChange', payload: data })
          }
          onFocusChange={focusedInput =>
            dispatch({ type: 'focusChange', payload: focusedInput })
          }
          startDate={state.startDate} // Date or null
          endDate={state.endDate} // Date or null
          focusedInput={state.focusedInput} // START_DATE, END_DATE or null
        />
      </div>
    </>
  );
};

export default BookingPage;

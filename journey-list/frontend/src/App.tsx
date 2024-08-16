import './App.css';
import AddTripForm from './components/AddTripForm';
import TripList from './components/TripList';
import { useCollection, useQuery } from '@squidcloud/react';
import { Trip } from './types';
function App() {

  const collection = useCollection<Trip>('trips');
  const trips = useQuery(collection.query());

  const findTrip = (id: string) => {
    return trips.data.find((trip) => trip.data.id === id)
  }

  const onDelete = (id: string) => {
    const trip = findTrip(id);
    if (trip) trip.delete()
  };

  const onAddNote = (tripId: string, note: string) => {
    const trip = findTrip(tripId);
    if (!trip) return
    const notes = trip.data.notes
    notes.push(note)
    trip.update({
      notes: notes
    })
  };


  const onDeleteNote = (tripId: string, noteIndex: number) => {
    const trip = findTrip(tripId);
    if (!trip) return
    const notes = trip.data.notes;
    trip.update({
      notes: notes.filter((_, index) => index !== noteIndex)
    })
  };

  return (
    <>
      <AddTripForm/>
      <TripList  trips={trips.data.map((trip) => trip.data)}
        onDelete={onDelete}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}/>
    </>
  );
}

export default App;

import { MapComponent } from '@/components/map/MapComponent';
import { ReservationDialog } from '@/components/map/ReservationDialog';
import { StationList } from '@/components/map/StationList';
import { TimeSelection } from '@/components/map/TimeSelection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { gasStations, user } from '@/lib/api';
import { authStore } from '@/stores/authStore';
import { IMapObject } from '@/types/api.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let duration = 'PT';
  if (hours > 0) {
    duration += `${hours}H`;
  }
  if (remainingMinutes > 0) {
    duration += `${remainingMinutes}M`;
  }

  return duration;
};

const Map = () => {
  const navigate = useNavigate();
  const [filteredStations, setFilteredStations] = useState<IMapObject[]>([]);
  const [selectedStation, setSelectedStation] = useState<IMapObject | null>(
    null
  );
  const [openReservationDialog, setOpenReservationDialog] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [bookingTime, setBookingTime] = useState<{
    time: string;
    duration: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: 'Location found',
            description: 'Using your current location to find nearby stations.',
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            variant: 'destructive',
            title: 'Location access denied',
            description:
              'Please enable location services to find stations near you.',
          });
        }
      );
    }
  }, []);

  const handleTimeSelect = async (time: string, duration: number) => {
    try {
      setIsLoading(true);
      setBookingTime({ time, duration });

      // Convert the selected time to Unix timestamp
      const timestamp = Math.floor(new Date(time).getTime() / 1000);

      // Fetch available stations from the API
      const availableStations = await gasStations.getAvailable(timestamp);
      setFilteredStations(availableStations);

      toast({
        title: 'Available stations found',
        description: `Found ${availableStations.length} stations available for your selected time.`,
      });
    } catch (error) {
      console.error('Error fetching stations:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch available stations. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStationSelect = (station: IMapObject) => {
    setSelectedStation(station);
    setOpenReservationDialog(true);
  };

  const handleReservation = async () => {
    if (!authStore.isAuthenticated) {
      toast({
        title: 'Login required',
        description: 'Please login to reserve a charging station',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    if (!bookingTime || !selectedStation) return;

    const isoDuration = formatDuration(bookingTime.duration);
    const timestamp = Math.floor(new Date(bookingTime.time).getTime() / 1000);
    console.log(1, timestamp, selectedStation.title, isoDuration);
    const response = await user.createReservation(
      1,
      timestamp,
      selectedStation.title,
      isoDuration
    );
    // Mock successful reservation
    toast({
      title: 'Reservation Confirmed!',
      description: `You've reserved a charging spot at ${selectedStation.title} on ${new Date(bookingTime.time).toLocaleString()} for ${bookingTime.duration} minutes.`,
    });

    // Navigate to booking confirmation page
    navigate('/booking-confirmation', {
      state: {
        station: selectedStation,
        bookingTime: bookingTime.time,
        duration: bookingTime.duration,
        reservation: response,
      },
    });

    setOpenReservationDialog(false);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Find Charging Stations</h1>

      {!bookingTime ? (
        <TimeSelection onTimeSelect={handleTimeSelect} />
      ) : (
        <Tabs defaultValue='map' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='map'>Map View</TabsTrigger>
            <TabsTrigger value='list'>List View</TabsTrigger>
          </TabsList>

          <TabsContent value='map' className='mt-0'>
            <MapComponent
              isLoading={isLoading}
              stations={filteredStations}
              userLocation={userLocation}
              onStationSelect={(stationId) => {
                const station = filteredStations.find(
                  (s) => s.id === stationId
                );
                if (station) handleStationSelect(station);
              }}
            />
          </TabsContent>

          <TabsContent value='list' className='mt-0'>
            <StationList
              stations={filteredStations}
              onStationSelect={handleStationSelect}
            />
          </TabsContent>
        </Tabs>
      )}

      <ReservationDialog
        station={selectedStation}
        open={openReservationDialog}
        onOpenChange={setOpenReservationDialog}
        onReserve={handleReservation}
        bookingTime={bookingTime}
      />
    </div>
  );
};

export default Map;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface Station {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  available: number;
  total: number;
  type: string;
  pricePerKwh: string;
  connectors: string[];
  rating: number;
}

interface StationListProps {
  stations: Station[];
  onStationSelect: (station: Station) => void;
}

export const StationList = ({ stations, onStationSelect }: StationListProps) => {
  return (
    <div className="space-y-4">
      {stations.map(station => (
        <Card key={station.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{station.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin size={14} className="mr-1" />
                  {station.address}
                </CardDescription>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">{station.pricePerKwh}/kWh</span>
                <div className="text-xs text-gray-500 mt-1">
                  {station.available}/{station.total} available
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Type:</span> {station.type}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Connectors:</span> {station.connectors.join(", ")}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Rating:</span> {station.rating}/5
                </div>
              </div>
              <Button onClick={() => onStationSelect(station)}>
                Reserve
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IMapObject } from "@/types/api.ts";

interface ReservationDialogProps {
  station: IMapObject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReserve: () => void;
  bookingTime: { time: string; duration: number } | null;
}

export const ReservationDialog = ({
  station,
  open,
  onOpenChange,
  onReserve,
  bookingTime
}: ReservationDialogProps) => {
  if (!station || !bookingTime) return null;

  const formattedTime = new Date(bookingTime.time).toLocaleString();
  const formattedDuration = `${bookingTime.duration} minutes`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Reservation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h3 className="font-semibold">Station Details</h3>
            <p>{station.title}</p>
          </div>

          <div>
            <h3 className="font-semibold">Booking Details</h3>
            <p>Time: {formattedTime}</p>
            <p>Duration: {formattedDuration}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onReserve}>
            Confirm Reservation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 
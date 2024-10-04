import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import BookingSummary from "./booking-summary"

interface BookingSheetProps {
  isOpen: boolean
  onOpenChange: () => void
  onBookingCreate: () => void
  selectedDay: Date | undefined
  selectedTime: string | undefined
  loadingTimes: boolean
  availableTimes: string[]
  //eslint-disable-next-line no-unused-vars
  handleDateSelect: (date: Date | undefined) => void
  //eslint-disable-next-line no-unused-vars
  handleTimeSelect: (time: string) => void
  loadingBooking: boolean
  barbershop: any
  service: any
  selectedDate: Date | undefined
}

const BookingSheet = ({
  isOpen,
  onOpenChange,
  onBookingCreate,
  selectedDay,
  selectedTime,
  loadingTimes,
  availableTimes,
  handleDateSelect,
  handleTimeSelect,
  loadingBooking,
  barbershop,
  service,
  selectedDate,
}: BookingSheetProps) => (
  <Sheet open={isOpen} onOpenChange={onOpenChange}>
    <SheetContent className="w-[80%] overflow-y-auto px-0 [&::-webkit-scrollbar]:hidden">
      <SheetHeader>
        <SheetTitle className="text-center">Fazer reserva</SheetTitle>
      </SheetHeader>

      <div className="flex w-full max-w-none justify-center border-b border-solid py-5">
        <Calendar
          mode="single"
          locale={ptBR}
          selected={selectedDay}
          fromDate={new Date()}
          onSelect={handleDateSelect}
        />
      </div>

      {loadingTimes ? (
        <div className="flex h-[81.11px] items-center justify-center border-b border-solid p-5">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        selectedDay && (
          <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
            {availableTimes.map((time) => (
              <Button
                key={time}
                className="rounded-full"
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        )
      )}

      {selectedDate && (
        <div className="p-5">
          <BookingSummary
            barbershop={barbershop}
            service={service}
            selectedDate={selectedDate}
          />
        </div>
      )}

      <SheetFooter className="mt-5 px-5">
        <Button
          className="w-full"
          onClick={onBookingCreate}
          disabled={!selectedDay || !selectedTime || loadingBooking}
        >
          {loadingBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Confirmar
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
)

export default BookingSheet

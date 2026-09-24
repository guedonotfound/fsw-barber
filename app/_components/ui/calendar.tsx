"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/app/_lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const DAYS_PER_WEEK = 7
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [cellSize, setCellSize] = React.useState<number>(0)

  const updateCellSize = React.useCallback(() => {
    if (!containerRef.current) return
    const style = window.getComputedStyle(containerRef.current),
      width = containerRef.current.offsetWidth,
      margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
      padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
      border =
        parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth),
      containerWidth = width + margin - padding + border

    setCellSize(containerWidth / DAYS_PER_WEEK)
  }, [])

  React.useEffect(() => {
    updateCellSize()
    window.addEventListener("resize", updateCellSize)

    return () => {
      window.removeEventListener("resize", updateCellSize)
    }
  }, [updateCellSize])

  return (
    <div ref={containerRef} className={cn("w-full p-3", className)}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        styles={{
          day: {
            width: `${cellSize}px`,
            height: `${cellSize}px`,
          },
          weekday: {
            width: `${cellSize}px`,
          },
          day_button: {
            width: `${cellSize}px`,
            height: `${cellSize}px`,
          },
          month_caption: {
            textTransform: "capitalize",
            flexGrow: 1,
            textAlign: "center",
          },
        }}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          month_caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          button_previous: cn(
            buttonVariants({ variant: "outline" }),
            "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          ),

          button_next: cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          ),
          month_grid: "w-full border-collapse space-y-1",
          weekdays: "flex",
          weekday:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          week: "flex w-full mt-2",
          day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          ),
          range_end: "day-range-end",
          selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          today: "bg-accent text-accent-foreground",
          outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          disabled: "text-muted-foreground opacity-50",
          range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          hidden: "invisible",
          ...classNames,
        }}
        // components={{
        //   IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        //   IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        // }}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

"use client"

import * as React from "react"
import { format, type Locale } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { es } from "date-fns/locale"

export type DatePickerProps =
  Omit<React.ComponentProps<typeof Calendar>, "mode" | "selected" | "onSelect" | "defaultMonth"> & {
    value?: Date;
    onValueChange?: (d: Date | undefined) => void;
    placeholder?: string;
    formatStr?: string;
    widthClass?: string;
    locale?: Locale;
  }

export const DatePicker = ({
  value,
  onValueChange,
  placeholder = "Selecciona una fecha",
  formatStr = "PPP",
  widthClass = "w-44",
  locale = es,
  ...props
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)

  function handleSelect(selected: Date | undefined) {
    onValueChange?.(selected)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start font-normal",
            !value && "text-muted-foreground",
            widthClass
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          {value
            ? format(value, formatStr, { locale })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          defaultMonth={value}
          locale={locale}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}

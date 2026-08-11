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

type CalendarProps = React.ComponentProps<typeof Calendar>;
export interface DatePickerProps extends Omit<CalendarProps, "mode" | "selected" | "onSelect" | "defaultMonth" | "disabled"> {
    value?: Date;
    onValueChange?: (d: Date | undefined) => void;
    placeholder?: string;
    formatStr?: string;
    widthClass?: string;
    locale?: Locale;
    disablerMatcher?: CalendarProps['disabled'];
    disabled?: boolean;
  }

export const DatePicker = ({
  value,
  onValueChange,
  placeholder = "Selecciona una fecha",
  formatStr = "PPP",
  widthClass = "w-44",
  locale = es,
  disabled,
  disablerMatcher,
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
          disabled={disabled}
          aria-disabled={disabled}
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
          disabled={disablerMatcher}
          locale={locale}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}

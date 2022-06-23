import * as React from "react"
import { CalendarEventsList, MonthlyWrapper } from "components/calendar"
import {
  appContext,
  eventCreationContext,
  myCalendarContext,
} from "contexts/contextApi"
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { Outlines, Buttons, Colors, Typography, Sizing } from "styles/index"
import { useNavigation } from "@react-navigation/native"
import { PlusIcon } from "assets/icons"
import { ProfileContext } from "contexts/profileContext"
import { useCalendarEvents } from "lib/hooks/useCalendarEvents"
import { monthsByName } from "common/types/calendarTypes"
import { Events, EventsMonth } from "common/interfaces/myCalendarInterface"

export interface CalendarProps {
  isBookingCalendar?: boolean
  isHomeScreen?: boolean
  isRegularCalendar?: boolean
}

export const Calendar = ({
  isBookingCalendar,
  isHomeScreen,
  isRegularCalendar,
}: CalendarProps) => {
  const { colorScheme } = appContext()
  const { resetEventCreationState } = eventCreationContext()
  const { id } = React.useContext(ProfileContext)
  const { events, calendarHeader } = myCalendarContext()
  const { getEvents, loadingEvents } = useCalendarEvents(id)

  const [currentSelectedDay, setCurrentSelectedDay] = React.useState<
    undefined | string | null
  >(null)

  const isLightMode = colorScheme === "light"
  const navigation = useNavigation()

  // React.useEffect(() => {
  //   if (monthsByName[calendarHeader.month] === new Date().getMonth()) {
  //     setCurrentSelectedDay(new Date())
  //   } else setCurrentSelectedDay(null)
  // }, [calendarHeader])

  React.useEffect(() => {
    if (events === null) {
      getEvents(
        true,
        new Date(calendarHeader.year, monthsByName[calendarHeader.month])
      )
    }

    const subscribe = () => {
      navigation.addListener("blur", () => {})
      navigation.addListener("focus", async () => {
        getEvents(
          false,
          new Date(calendarHeader.year, monthsByName[calendarHeader.month])
        )
      })
    }

    const unsubscribe = () => {
      navigation.removeListener("blur", () => {})
      navigation.removeListener("focus", () => {})
    }

    subscribe()

    return unsubscribe
  }, [])

  const onAddEventPress = () => {
    resetEventCreationState()
    navigation.navigate("New Event Description")
  }

  const onSelectedDayChange = (day: string | null) => setCurrentSelectedDay(day)
  const isMonthWithEvents = !!events?.map((eventsYear: Events) =>
    eventsYear.months.find(
      (eventsMonth: EventsMonth) => eventsMonth.month === calendarHeader.month
    )
  )[0]

  return (
    <>
      <MonthlyWrapper
        secondCustomCallback={onSelectedDayChange}
        isRegularCalendar={isRegularCalendar}
        initialEventsLoaded={!!loadingEvents}
      />
      {(!isBookingCalendar || isRegularCalendar) &&
        (loadingEvents ? (
          <View style={styles.buttonWrapper}>
            <ActivityIndicator
              animating={true}
              color={isLightMode ? Colors.primary.s800 : Colors.primary.neutral}
              size="large"
              style={{ paddingTop: Sizing.x35 }}
            />
          </View>
        ) : isMonthWithEvents ? (
          <CalendarEventsList
            currentSelectedDay={currentSelectedDay}
            isRegularCalendar={isRegularCalendar}
            isHomeScreen={isHomeScreen}
          />
        ) : (
          <View style={styles.buttonWrapper}>
            <Pressable
              onPress={onAddEventPress}
              style={Buttons.applyOpacity(
                Object.assign(
                  {},
                  styles.addEventButton,
                  isLightMode
                    ? { backgroundColor: Colors.primary.s800 }
                    : { backgroundColor: Colors.primary.neutral }
                )
              )}>
              <Text
                style={[
                  styles.addEventButtonText,
                  isLightMode
                    ? { color: Colors.primary.neutral }
                    : { color: Colors.primary.s800 },
                ]}>
                Create Event
              </Text>
              <PlusIcon
                color={
                  isLightMode ? Colors.primary.neutral : Colors.primary.s800
                }
                width={Sizing.x14}
                height={Sizing.x14}
                strokeWidth={4}
              />
            </Pressable>
          </View>
        ))}
    </>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventButton: {
    borderRadius: Outlines.borderRadius.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Sizing.x5,
    paddingHorizontal: Sizing.x10,
    ...Outlines.shadow.base,
  },
  addEventButtonText: {
    ...Typography.header.x20,
    marginRight: Sizing.x5,
  },
})

import { format } from "date-fns";

export const getFormatedDate = (date: Date) => {
    const now = new Date();
    const dayDiff = now.getDay() - date.getDay();
    if( dayDiff === 0 ) return "Today"
    else {
        return format(new Date(date), "EEEE, MMMM do")
    }
}
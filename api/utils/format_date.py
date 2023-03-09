from datetime import date
import regex

def format_datetime(date_request):
    group_date = regex.search(u"(?P<year>\d{4})-(?P<mounth>\d{1})-(?P<day>\d{2})", date_request)
    day = int(group_date.group(3))
    month = int(group_date.group(2))
    year = int(group_date.group(1))
    formated_date = date(year, month, day)
    return formated_date

def format_to_string(date_received):
    if date_received:
        year = date_received.year
        month = date_received.month
        day = date_received.day

        formated_string = "{}-{}-{}".format(year,month,day)
        return formated_string

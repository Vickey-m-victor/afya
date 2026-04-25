to do on afya365.

1.  have one store per module.
2.  toasts and alerts to get the message from backend.
3.  action buttons to be in a row.
4.  after deleting, the items are still on the table. return is deleted is 1. and remove it.
5.  make sure all request are being made/working properly.
6.  grid view.
7.  pjax.

when creating a unit- rn the unit is linked to a program and year offered - therefore if the same unit is done by different programs what should happen.

students page- create student button not working
lecturers page- create lec nutton not working.

dashboards for all users.

attendance logs- an error

spoofing not yet covered - like does it check for liveness?

not yet intelligent - what is the best model to use, i've heard of yolo,

view profile for each user - pages

settings page - to change all those details and passwords etc.

the student, can preview the saved image then have an option to update, add more, but only previw latest pic or latest scan.

STUDENT ACCOUNT
action buttons not functioning properly.
profile
dashboard

LECTURER ACCOUNT
exam auth is not working
profile
dashboard
reports has an error
when taking attendance - just choose the unit as it is in the timetable- but can change the lecture hall. like if it were BSCS2022 machine learning unit and hall - lab A - after now selecting the class they are teaching and the unit autofills or vice versa , they can choose the current hall or a different one.

ADMIN ACCOUNT
profile
dashboard
students, lecturers - actions



remove faclity id in /outpatient/registration/search


@contextScopeItemMention I want us to use this triage assesment page as our base for design of the traige page, let it look as it is in the code only that the styling you use as the oneui_latest as the styles and cards here is what is happening, the triage queue is fetched from this endpoint: /outpatient/triage/queue: when a patient in t he queue is clicked, this endpoint is hit :/outpatient/triage/patient/{id}/summary and the 
Triage Assessment

Complete clinical evaluation tab and 
Patient Clinical Summary

Historical data to inform triage decision tab are filled with data but you cannot edit, you can also call patient using the button, and it will hit this endpoint: /outpatient/triage/{id}/call: and when  they are in you can start a triage sesion with this endpoint: outpatient/triage/{id}/start, thats when you can edit the tab: Triage Assessment

Complete clinical evaluation:  /outpatient/triage/capture:
For emergency bypass:
/outpatient/triage/{id}/emergency-emergency:
and for bypass orders is: /outpatient/triage/orders:

TO get what those endpoints data they need hit this endpoint using curl: http://localhost:9364/v2/docs/openapi-resource.json?mod=outpatient

When a patient is called in for triaging they should remain in queue until the triage session is started, the status of the patient should be updated from "waiting" to "in_triage" and when the triage session is ended the status should be updated from "in_triage" to "ready_for_consultation"
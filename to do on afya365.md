to do on afya365.


2.  toasts and alerts to get the message from backend. - done
3.  action buttons to be in a row.
4.  after deleting, the items are still on the table. return is deleted is 1. and remove it. - done(soft    delete so use restore icon) - done
5.  make sure all request are being made/working properly.
6.  grid view. - done
7.  pjax.

remove faclity id in /outpatient/registration/search

@contextScopeItemMention I want us to use this triage assesment page as our base for design of the traige page, let it look as it is in the code only that the styling you use as the oneui_latest as the styles and cards here is what is happening, the triage queue is fetched from this endpoint: /outpatient/triage/queue: when a patient in t he queue is clicked, this endpoint is hit :/outpatient/triage/patient/{id}/summary and the
Triage Assessment

Complete clinical evaluation tab and
Patient Clinical Summary

Historical data to inform triage decision tab are filled with data but you cannot edit, you can also call patient using the button, and it will hit this endpoint: /outpatient/triage/{id}/call: and when they are in you can start a triage sesion with this endpoint: outpatient/triage/{id}/start, thats when you can edit the tab: Triage Assessment

Complete clinical evaluation: /outpatient/triage/capture:
For emergency bypass:
/outpatient/triage/{id}/emergency-emergency:
and for bypass orders is: /outpatient/triage/orders:

TO get what those endpoints data they need hit this endpoint using curl: http://localhost:9364/v2/docs/openapi-resource.json?mod=outpatient

When a patient is called in for triaging they should remain in queue until the triage session is started, the status of the patient should be updated from "waiting" to "in_triage" and when the triage session is ended the status should be updated from "in_triage" to "ready_for_consultation"

25/04
CHANGES SUGGESTED.

1. dashboard - endpoints.
2. change the branding -Oneui to Afya365
3. employee - registration 
    arrangement- personal info , next of kin, documents-should be the last. 
    categorise personal info to 1.  personal info, and 2.  contacts 
    move tax pin to statutory data
    next of kin,
    should not be a modal - change to page

4. departments - add status, facilities, 

5. Job groups 
    move the status cell
    remove job description in the table, should only be in view. 
    comma separated and aligned on the right - numbers.
    reuires license - change true or false to 
    remove license type from table - only view.
    make it dynamic- to list the license types. 
    map id and label in the department id, 
    * also in the facility.

6. modal should load first, not data first.

7.  Access Control instead of RBAC.

8. Public Holidays - calender of events.
    -holiday
    -events etc

9.  Outpatient
    A. OPD registration. 
    * MRN- in full
    * remove the national id 
    * remove title when registering a patient.
    * middle name should be there
    * Age should be calculated  / reversible - if you select date, calculate age, if you select age, choose calculate year.
    * Next of kin/GUardian - dynamic eg if a child both parents. 
    * create patient and continue to triage
    * dropdown for create , create and continue to triage, create and start.
    * check for urgency / priority.
    * call to triage - windows/ door number. 
    * check available room / triage

    B. Triage
    *  queuing - emergency bypass if eg faints, and in the triage queue to sort to the top if urgent. 
    * Jane Doe and John Doe - 
    * remove the cheif complaint from triage.
    * remove painscore.
    * remove mental status.

    C. Consultation.
    - show vitals, previous visits, alergies. 
         
    - presenting of complains
    - History of presenting complains. 
    - Past medical History
    - Perinatal history- kids
    - milestones - kids.
    - immunisation -kids
    - growth - kids
    - nutrition - kids
    - socio-family history
    - general examination.
    - per abdomen examination.
    - pelvic examination
    - cadio vascular examination.
    - cns - central nervous system examination.
    - respiratoty system examination
    - mascular skeleton system.
    - eye examination
    - ent
    - skin examination
    - other examinations

    - final diagnosis
    - treatment plan
    - summary of positive findings
    
    * - referals - should have reasons, 
    - discharge
    - 



procurement

requisition
request for quotation - to suppliers
quoatation  - from suppliers
local purchase order -
goods - with a delivery note
update stock
goods received note - grn
generate payment voucher  to pay the supplier

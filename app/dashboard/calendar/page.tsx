"use client"
declare const bootstrap: any;

import { useEffect, useRef, useState } from "react"
import dummyDataEvents from "@/data/dummyCalenderEvent.json"
import dummyTempateEvents from "@/data/dummyEventsTemplate.json"

export default function page() {
    const calendarRef = useRef<any>(null)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedEndDate, setSelectedEndDate] = useState("")
    const [deleteId, setDeleteId] = useState("")
    const [activeTitle, setActiveTitle] = useState<string | null>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [templateEvents, setTemplateEvents] = useState<any[]>([])
    const [currentView, setCurrentView] = useState("dayGridMonth")

    const [events, setEvents] = useState<any[]>([])

    const handleEventDrop = (info: any) => {
        const updatedEvents = events.map((evt: any) =>
            evt.id === info.event.id
                ? {
                    ...evt,
                    start: info.event.startStr,
                    end: info.event.endStr,
                    updatedAt: new Date().toISOString()
                }
                : evt
        )

        setEvents(updatedEvents)
        localStorage.setItem("events", JSON.stringify(updatedEvents))
    }

    useEffect(() => {
        const FullCalendar = (window as any).FullCalendar
        const calendarEl = document.getElementById("calendar")

        if (FullCalendar && calendarEl && events.length > 0) {
            if (calendarRef.current) {
                calendarRef.current.destroy()
            }

            calendarRef.current = new FullCalendar.Calendar(calendarEl, {
                initialView: currentView,
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                },

                datesSet: function (info: any) {
                    setCurrentView(info.view.type)
                },

                editable: true,
                droppable: true,
                selectable: true,
                eventDrop: handleEventDrop,
                eventResize: handleEventDrop,


                select: function (info: any) {
                    setSelectedDate(info.startStr)
                    setSelectedEndDate(info.endStr)

                    const modalEl = document.getElementById("add-event")
                    if (modalEl) {
                        const modal = new bootstrap.Modal(modalEl)
                        modal.show()
                    }
                },

                events: events.map((event) => ({
                    id: event.id,
                    title: event.eventName,
                    start: event.start,
                    end: event.end,
                    className: `bg-${event.eventCategory}`,
                })),

                eventReceive: function (info: any) {

                    const newEvent = {
                        id: "CE-" + String(Date.now()).slice(-9),
                        eventName: info.event.title,
                        start: info.event.startStr,
                        end: info.event.endStr,
                        eventCategory: info.event.classNames[0]?.replace("bg-", "") || "primary",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }


                    const updatedEvents = [...events, newEvent]

                    setEvents(updatedEvents)
                    localStorage.setItem("events", JSON.stringify(updatedEvents))

                    const checkbox = document.getElementById("drop-remove") as HTMLInputElement

                    if (checkbox?.checked) {
                        const updatedTemplates = templateEvents.filter(
                            t => t.title !== info.event.title
                        )

                        setTemplateEvents(updatedTemplates)
                        localStorage.setItem("templateEvents", JSON.stringify(updatedTemplates))
                    }
                },

                eventClick: function (info: any) {
                    setDeleteId(info.event.id)
                    handleEditClick(info.event.id)
                    const modalEl = document.getElementById("editModal");
                    const modalInstance = bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
                    modalInstance.show();
                },
            })

            calendarRef.current.render()
            const containerEl = document.getElementById("external-events")

            if (containerEl) {
                new FullCalendar.Draggable(containerEl, {
                    itemSelector: ".external-event",
                    eventData: function (eventEl: any) {
                        return {
                            title: eventEl.innerText.trim(),
                            className: eventEl.getAttribute("data-class"),
                        }
                    }
                })
            }
        }
    }, [events])

    console.log("curent view:", currentView)

    useEffect(() => {
        function initSelect() {
            const $ = (window as any).jQuery

            if ($ && $.fn.selectpicker) {
                $(".default-select").selectpicker("destroy")
                $(".default-select").selectpicker()
            }
        }

        if ((window as any).jQuery?.fn?.selectpicker) {
            initSelect()
        } else {
            window.addEventListener("selectpicker-ready", initSelect)
        }

        return () => {
            window.removeEventListener("selectpicker-ready", initSelect)
        }
    }, [])

    useEffect(() => {
        const stored = localStorage.getItem("events")

        if (stored) {
            setEvents(JSON.parse(stored))
        } else {
            setEvents(dummyDataEvents)
            localStorage.setItem("events", JSON.stringify(dummyDataEvents))
        }
    }, [])

    useEffect(() => {
        const templates = localStorage.getItem("templateEvents")

        if (templates) {
            setTemplateEvents(JSON.parse(templates))
        } else {
            setTemplateEvents(dummyTempateEvents)
            localStorage.setItem("templateEvents", JSON.stringify(dummyTempateEvents))
        }
    }, [])

    useEffect(() => {
        if (!activeTitle || isHovering) return

        const timer = setTimeout(() => {
            setActiveTitle(null)
        }, 1000)

        return () => clearTimeout(timer)
    }, [activeTitle, isHovering])


    // add template
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")

    async function handleAddTemplate(e: React.FormEvent) {
        e.preventDefault();
        const payload = {
            ids: "TE-" + String(Date.now()).slice(-9),
            title,
            category,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const updatedEvents = [...templateEvents, payload];

        localStorage.setItem("templateEvents", JSON.stringify(updatedEvents));
        setTemplateEvents(updatedEvents);

        setTitle("");
        setCategory("");

        const modalEl = document.getElementById("add-template-event");
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    }

    // edit
    const [editTemplateEvent, setEditTemplateEvent] = useState<any>(null);

    const handleEditTemplateClick = (ids: string) => {
        const modalEl = document.getElementById("editTemplateModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
        modalInstance.show();
        const template = templateEvents.find(p => p.ids === ids);
        if (template) {
            setEditTemplateEvent(template);
            setTitle(template.title);
            setCategory(template.category);
        }
    };

    function handleSaveEditTemplate(e: React.FormEvent) {
        e.preventDefault();
        if (!editTemplateEvent) return;

        const updatedTemplate = {
            ...editTemplateEvent,
            title,
            category,
            updatedAt: new Date().toISOString()
        };

        const updatedTemplates = templateEvents.map(e => e.ids === editTemplateEvent.ids ? updatedTemplate : e);
        setTemplateEvents(updatedTemplates);
        localStorage.setItem("templateEvents", JSON.stringify(updatedTemplates));

        setEditTemplateEvent(null);
        setEventName("");
        setEventCategory("");
        setSelectedDate("");
        setSelectedEndDate("");

        const modalEl = document.getElementById("editModal");
        if (modalEl && typeof bootstrap !== "undefined") {
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();
        }
    }


    // delete tempalte
    const [deleteTitle, setDeleteTitle] = useState("")
    const handleDeleteTemplate = (title: string) => {
        const updated = templateEvents.filter(e => e.title !== title);
        setTemplateEvents(updated);
        localStorage.setItem("templateEvents", JSON.stringify(updated));
        setDeleteTitle("");
    }

    // add 
    const [eventName, setEventName] = useState("")
    const [eventCategory, setEventCategory] = useState("")

    async function handleAddEvent(e: React.FormEvent) {
        e.preventDefault();

        // if (!selectedDate) return;

        const payload = {
            id: "CE-" + String(Date.now()).slice(-9),
            eventName,
            start: selectedDate || null,
            end: selectedEndDate || null,
            eventCategory,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const updatedEvents = [...events, payload];

        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setEvents(updatedEvents);

        setEventName("");
        setEventCategory("");
        setSelectedDate("");
        setSelectedEndDate("");

        const modalEl = document.getElementById("add-event");
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    }

    // edit
    const [editEvent, setEditEvent] = useState<any>(null);

    const handleEditClick = (id: string) => {
        const event = events.find(p => p.id === id);

        if (event) {
            setEditEvent(event);
            setEventName(event.eventName);
            setEventCategory(event.eventCategory);
        }

        const modalEl = document.getElementById("editModal");
        const modalInstance =
            bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
        modalInstance.show();

        setTimeout(() => {
            const $ = (window as any).jQuery
            if ($?.fn?.selectpicker) {
                $(".default-select").selectpicker("refresh")
            }
        }, 50)
    };

    function handleSaveEditEvent(e: React.FormEvent) {
        e.preventDefault();
        if (!editEvent) return;

        const updatedEvent = {
            ...editEvent,
            eventName,
            eventCategory,
            updatedAt: new Date().toISOString()
        }

        const updatedEvents = events.map(e => e.id === editEvent.id ? updatedEvent : e);
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));

        setEditEvent(null);
        setEventName("");
        setEventCategory("");
        setSelectedDate("");
        setSelectedEndDate("");

        const modalEl = document.getElementById("editModal");
        if (modalEl && typeof bootstrap !== "undefined") {
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();
        }
    }

    // delete
    const handleDeleteEvent = (id: string) => {
        const updated = events.filter(e => e.id !== id);
        setEvents(updated);
        localStorage.setItem("events", JSON.stringify(updated));
        setDeleteId("");
    }

    return (
        <>
            <div className="container-fluid">
                {/* <!-- row --> */}
                <div className="row">
                    <div className="col-xl-3 col-xxl-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-intro-title">Calendar</h4>

                                <div className="">
                                    <div id="external-events" className="my-3">
                                        <p>Drag and drop your events or click on them in the calendar.</p>
                                        {templateEvents && templateEvents.length > 0 ? (
                                            templateEvents.map((event: any) => (
                                                <div
                                                    key={`${event.ids}-${event.title}`}
                                                    onDoubleClick={() =>
                                                        setActiveTitle(activeTitle === event.title ? null : event.title)
                                                    }
                                                    className={`external-event btn-${event.category} light`}
                                                    data-class={`bg-${event.category}`}
                                                >
                                                    <i className="fa fa-move"></i>
                                                    <span>{event.title}</span>

                                                    {activeTitle === event.title && (
                                                        <div className="dropdown-menu show"
                                                            onMouseEnter={() => setIsHovering(true)}
                                                            onMouseLeave={() => setIsHovering(false)}>
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() => {
                                                                    handleEditTemplateClick(event.ids)
                                                                    setActiveTitle(null)
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() => {
                                                                    setDeleteTitle(event.title)
                                                                    setActiveTitle(null)
                                                                    const modalEl = document.getElementById("deleteTemplateModal");
                                                                    const modalInstance = bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
                                                                    modalInstance.show();
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No items</p>
                                        )}

                                    </div>
                                    <p><i>Double-click to edit or delete.</i></p>
                                    {/* <!-- checkbox --> */}
                                    <div className="checkbox form-check checkbox-event custom-checkbox pt-3 pb-5">
                                        <input type="checkbox" className="form-check-input" id="drop-remove" />
                                        <label className="form-check-label" htmlFor="drop-remove">Remove After Drop</label>
                                    </div>
                                    <a href="javascript:void()" data-bs-toggle="modal" data-bs-target="#add-template-event" className="btn btn-primary btn-event w-100">
                                        <span className="align-middle"><i className="ti-plus"></i></span> Create New
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-xxl-8">
                        <div className="card">
                            <div className="card-body">
                                <div id="calendar" className="app-fullcalendar"></div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- add --> */}
                    <div className="modal fade none-border" id="add-event">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add a Events</h4>
                                </div>
                                <form onSubmit={handleAddEvent}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Event Name</label>
                                                <input value={eventName} onChange={(e) => setEventName(e.target.value)} className="form-control form-white" placeholder="Enter name" type="text" name="category-name" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Choose event Color</label>
                                                <select value={eventCategory}
                                                    onChange={(e) => setEventCategory(e.target.value)} className="nice-select form-control default-select wide" data-placeholder="Choose a color..." name="category-color">
                                                    <option value="success">Success</option>
                                                    <option value="danger">Danger</option>
                                                    <option value="info">Info</option>
                                                    <option value="pink">Pink</option>
                                                    <option value="primary">Primary</option>
                                                    <option value="warning">Warning</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger waves-effect" data-bs-dismiss="modal" onClick={() => {
                                            setEventName(""), setEventCategory("")
                                        }}>
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-success waves-effect waves-light save-category" data-bs-toggle="modal">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* modal edit */}
                    <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="editModalLabel">Edit Event</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form onSubmit={handleSaveEditEvent}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Event Name</label>
                                                <input value={eventName} onChange={(e) => setEventName(e.target.value)} className="form-control form-white" placeholder="Enter name" type="text" name="category-name" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Choose event Color</label>
                                                <select
                                                    value={eventCategory}
                                                    onChange={(e) => setEventCategory(e.target.value)}
                                                    className="nice-select form-control default-select wide"
                                                >
                                                    <option value="success">Success</option>
                                                    <option value="danger">Danger</option>
                                                    <option value="info">Info</option>
                                                    <option value="pink">Pink</option>
                                                    <option value="primary">Primary</option>
                                                    <option value="warning">Warning</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer d-flex justify-content-between align-items-center">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                const modalEl = document.getElementById("editModal");
                                                const modalInstance =
                                                    bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
                                                modalInstance.hide();

                                                const modalDel = document.getElementById("deleteModal");
                                                const modalDelIn =
                                                    bootstrap.Modal.getInstance(modalDel!) || new bootstrap.Modal(modalDel!);
                                                modalDelIn.show();
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <div className="d-flex gap-2">
                                            <button type="button" className="btn btn-danger waves-effect" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-success waves-effect waves-light save-category" data-bs-toggle="modal">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >

                    {/* modal delete */}
                    <div className="modal fade" id="deleteModal" tabIndex={-1} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete Event</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">Are you sure you want to delete this event?</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-close-custom" data-bs-dismiss="modal">Close</button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            if (deleteId) handleDeleteEvent(deleteId);
                                            const modalEl = document.getElementById("deleteModal");
                                            const modalInstance = bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
                                            modalInstance.hide();
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* addtemplate */}
                    <div className="modal fade none-border" id="add-template-event">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add a Events</h4>
                                </div>
                                <form onSubmit={handleAddTemplate}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Event Name</label>
                                                <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control form-white" placeholder="Enter name" type="text" name="category-name" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Choose event Color</label>
                                                <select value={category}
                                                    onChange={(e) => setCategory(e.target.value)} className="nice-select form-control default-select wide" data-placeholder="Choose a color..." name="category-color">
                                                    <option value="success">Success</option>
                                                    <option value="danger">Danger</option>
                                                    <option value="info">Info</option>
                                                    <option value="pink">Pink</option>
                                                    <option value="primary">Primary</option>
                                                    <option value="warning">Warning</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger waves-effect" data-bs-dismiss="modal" onClick={() => { setTitle(""), setCategory("") }}>Close</button>
                                        <button type="submit" className="btn btn-success waves-effect waves-light save-category" data-bs-toggle="modal">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* modal edit template */}
                    <div className="modal fade" id="editTemplateModal" tabIndex={-1} aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="editModalLabel">Edit Event</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form onSubmit={handleSaveEditTemplate}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Event Name</label>
                                                <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control form-white" placeholder="Enter name" type="text" name="category-name" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="control-label form-label">Choose event Color</label>

                                                <select value={category}
                                                    onChange={(e) => setCategory(e.target.value)} className="nice-select form-control default-select wide" data-placeholder="Choose a color..." name="category-color">
                                                    <option value="success">Success</option>
                                                    <option value="danger">Danger</option>
                                                    <option value="info">Info</option>
                                                    <option value="pink">Pink</option>
                                                    <option value="primary">Primary</option>
                                                    <option value="warning">Warning</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger waves-effect" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-success waves-effect waves-light save-category" data-bs-toggle="modal">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >

                    {/* deletetempalte */}
                    <div className="modal fade" id="deleteTemplateModal" tabIndex={-1} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete Event</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">Are you sure you want to delete this event?</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-close-custom" data-bs-dismiss="modal">Close</button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            if (deleteTitle) handleDeleteTemplate(deleteTitle);
                                            const modalEl = document.getElementById("deleteTemplateModal");
                                            const modalInstance = bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
                                            modalInstance.hide();
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

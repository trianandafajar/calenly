"use client"
declare const bootstrap: any;


import { useEffect, useState } from "react"
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
    useDroppable
} from "@dnd-kit/core"

import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import dummyDataKanban from "@/data/dummyKanban.json"
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';


type ColumnType = "todo" | "progress" | "review" | "done"

function SortableItem({
    task,
    onDeleteTask,
    onEditTask,
}: {
    task: any;
    onDeleteTask: (id: string) => void;
    onEditTask: (id: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 150ms ease",
        opacity: isDragging ? 0.6 : 1,
    };

    // function formatDistanceToNow(arg0: Date, arg1: { addSuffix: boolean; locale: any; }): import("react").ReactNode {
    //     throw new Error("Function not implemented.");
    // }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`card mb-3 draggable-item ${isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
        >
            <div
                {...attributes}
                {...listeners}
                className="card-body"
            >
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-warning">
                        <svg className="me-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5" fill="#FFCF6D" />
                        </svg>
                        {task.label}
                    </span>

                    <div className="dropdown">
                        <div
                            className="btn-link"
                            data-bs-toggle="dropdown"
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="3.5" cy="11.5" r="2.5" transform="rotate(-90 3.5 11.5)" fill="#717579" />
                                <circle cx="11.5" cy="11.5" r="2.5" transform="rotate(-90 11.5 11.5)" fill="#717579" />
                                <circle cx="19.5" cy="11.5" r="2.5" transform="rotate(-90 19.5 11.5)" fill="#717579" />
                            </svg>
                        </div>

                        <div className="dropdown-menu dropdown-menu-end">
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onEditTask(task.id);
                                }}
                            >
                                Edit
                            </a>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDeleteTask(task.id);
                                }}
                            >
                                Delete
                            </a>
                        </div>
                    </div>
                </div>

                <h5 className="mb-0">{task.title}</h5>
                <div className="progress default-progress my-4">
                    <div className="progress-bar bg-design progress-animated" style={{ width: "45%", height: "7px" }} role="progressbar">
                        <span className="sr-only">45% Complete</span>
                    </div>
                </div>
                <div className="row justify-content-between align-items-center kanban-user">
                    <ul className="users col-6">
                        <li><img src="/dashboard/images/avatar/1.png" alt="" /></li>
                        <li><img src="/dashboard/images/avatar/5.png" alt="" /></li>
                        <li><img src="/dashboard/images/avatar/3.png" alt="" /></li>
                    </ul>
                    <div className="col-6 d-flex justify-content-end">
                        <span className="fs-14"><i className="far fa-clock me-2"></i>Due {""}
                            {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true, locale: enUS })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Column({
    columnId,
    title,
    items,
    onAddTask,
    onDeleteTask,
    onEditTask
}: {
    columnId: ColumnType
    title: string
    items: any[]
    onAddTask: (status: ColumnType) => void
    onDeleteTask: (id: string) => void
    onEditTask: (id: string) => void
}) {
    const { setNodeRef } = useDroppable({
        id: columnId,
    })

    return (
        <div className="col-xl-3 col-md-6 px-0">
            <div className="kanbanPreview-bx">
                <div
                    ref={setNodeRef}
                    className="draggable-zone dropzoneContainer"
                    style={{ minHeight: "200px" }}
                >
                    <div className="sub-card align-items-center d-flex justify-content-between mb-4">
                        <div>
                            <h4 className="mb-0">
                                {title} (<span>{items.length}</span>)
                            </h4>
                        </div>
                        <div className="plus-bx">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onAddTask(columnId)
                                }}
                            ><i className="fas fa-plus"></i></a>
                        </div>
                    </div>

                    <SortableContext
                        items={items.map(item => item.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.map((item) => (
                            <SortableItem
                                key={item.id}
                                task={item}
                                onDeleteTask={onDeleteTask}
                                onEditTask={onEditTask}
                            />
                        ))}
                    </SortableContext>

                </div>
            </div>
        </div>
    )
}

export default function Page() {

    const [kanbanTasks, setKanbanTasks] = useState<any[]>([])

    useEffect(() => {
        const stored = localStorage.getItem("kanbanTasks")

        if (stored) {
            setKanbanTasks(JSON.parse(stored))
        } else {
            setKanbanTasks(dummyDataKanban)
            localStorage.setItem("kanbanTasks", JSON.stringify(dummyDataKanban))
        }
    }, [])

    const todoTasks = kanbanTasks.filter(k => k.status === "todo")
    const progressTasks = kanbanTasks.filter(k => k.status === "progress")
    const inReviewTasks = kanbanTasks.filter(k => k.status === "review")
    const doneTasks = kanbanTasks.filter(k => k.status === "done")

    const [activeTask, setActiveTask] = useState<any | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeTask = kanbanTasks.find(t => t.id === activeId);
        if (!activeTask) return;

        const isOverColumn = ["todo", "progress", "review", "done"].includes(overId);

        let newStatus: ColumnType;

        if (isOverColumn) {
            newStatus = overId as ColumnType;
        } else {
            const overTask = kanbanTasks.find(t => t.id === overId);
            if (!overTask) return;
            newStatus = overTask.status;
        }

        let updatedTasks = kanbanTasks.map(task =>
            task.id === activeId
                ? { ...task, status: newStatus }
                : task
        );

        const sameColumnTasks = updatedTasks.filter(t => t.status === newStatus);

        const oldIndex = sameColumnTasks.findIndex(t => t.id === activeId);
        const overIndex = isOverColumn
            ? sameColumnTasks.length - 1
            : sameColumnTasks.findIndex(t => t.id === overId);

        if (oldIndex !== overIndex) {
            const reordered = arrayMove(sameColumnTasks, oldIndex, overIndex);

            updatedTasks = [
                ...updatedTasks.filter(t => t.status !== newStatus),
                ...reordered,
            ];
        }

        setKanbanTasks(updatedTasks);
    };



    useEffect(() => {
        if (kanbanTasks.length > 0) {
            localStorage.setItem("kanbanTasks", JSON.stringify(kanbanTasks))
        }
    }, [kanbanTasks])

    // add kanban
    const [selectedStatus, setSelectedStatus] = useState<ColumnType>("todo")
    const [title, setTitle] = useState("")
    const [label, setLabel] = useState("")
    const [dueDate, setDueDate] = useState("")

    const handleOpenModal = (status: ColumnType) => {
        setSelectedStatus(status)

        const modalEl = document.getElementById("exampleModal")
        if (modalEl) {
            const modalInstance =
                bootstrap.Modal.getInstance(modalEl) ||
                new bootstrap.Modal(modalEl)

            modalInstance.show()
        }
    }

    function handleAddTask(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
            id: "K-" + String(Date.now()).slice(-9),
            title,
            label: label.toUpperCase(),
            dueDate,
            status: selectedStatus,
            progress: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setKanbanTasks(prev => [...prev, payload]);

        setTitle("");
        setLabel("");
        setDueDate("");

        const modalEl = document.getElementById("exampleModal");
        if (modalEl) {
            const modalInstance =
                bootstrap.Modal.getInstance(modalEl) ||
                new bootstrap.Modal(modalEl);
            modalInstance.hide();
        }
    }

    // edit
    const [editTask, setEditTask] = useState<any>(null);
    const handleOpenModalEdit = (id: string) => {
        const task = kanbanTasks.find(p => p.id === id);

        if (task) {
            setEditTask(task)
            setTitle(task.title);
            setLabel(task.label);
            setDueDate(task.dueDate);
        }

        const modalEl = document.getElementById("editModal")
        if (modalEl) {
            const modalInstance =
                bootstrap.Modal.getInstance(modalEl) ||
                new bootstrap.Modal(modalEl)

            modalInstance.show()
        }
    }

    function handleSaveEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!editTask) return;

        const updatedTask = {
            ...editTask,
            title,
            label,
            dueDate,
            updatedAt: new Date().toISOString()
        };

        const updateTask = kanbanTasks.map(p => p.id === editTask.id ? updatedTask : p);
        setKanbanTasks(updateTask);
        localStorage.setItem("kanbanTasks", JSON.stringify(updateTask));

        setEditTask(null);
        setTitle("");
        setLabel("");
        setDueDate("");

        const modalEl = document.getElementById("editModal");
        if (modalEl && typeof bootstrap !== "undefined") {
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();
        }
    }

    // delete
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleOpenModalDelete = (id: string) => {
        setDeleteId(id)

        const modalEl = document.getElementById("basicModal")
        if (modalEl) {
            const modalInstance =
                bootstrap.Modal.getInstance(modalEl) ||
                new bootstrap.Modal(modalEl)

            modalInstance.show()
        }
    }

    const handleDeleteContact = (id: string) => {
        const updated = kanbanTasks.filter(c => c.id !== id);
        setKanbanTasks(updated);
        localStorage.setItem("kanbanTasks", JSON.stringify(updated));
        setDeleteId(null);
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row kanban-bx px-3">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={(e) => {
                            const task = kanbanTasks.find(t => t.id === e.active.id)
                            setActiveTask(task || null)
                        }}
                        onDragEnd={(e) => {
                            handleDragEnd(e)
                            setActiveTask(null)
                        }}
                    >
                        <Column
                            columnId="todo"
                            title="To-Do List"
                            items={todoTasks}
                            onAddTask={handleOpenModal}
                            onDeleteTask={handleOpenModalDelete}
                            onEditTask={handleOpenModalEdit}
                        />
                        <Column
                            columnId="progress"
                            title="On Progress"
                            items={progressTasks}
                            onAddTask={handleOpenModal}
                            onDeleteTask={handleOpenModalDelete}
                            onEditTask={handleOpenModalEdit}
                        />
                        <Column
                            columnId="review"
                            title="In Review"
                            items={inReviewTasks}
                            onAddTask={handleOpenModal}
                            onDeleteTask={handleOpenModalDelete}
                            onEditTask={handleOpenModalEdit}
                        />
                        <Column
                            columnId="done"
                            title="Done"
                            items={doneTasks}
                            onAddTask={handleOpenModal}
                            onDeleteTask={handleOpenModalDelete}
                            onEditTask={handleOpenModalEdit}
                        />

                        <DragOverlay>
                            {activeTask ? (
                                <div className="card p-3 shadow">
                                    {activeTask.title}
                                </div>
                            ) : null}
                        </DragOverlay>

                    </DndContext>
                </div>
            </div>

            {/* modal add */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New Taks</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleAddTask}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput2" className="form-label">Label</label>
                                            <input value={label} onChange={(e) => setLabel(e.target.value)} type="text" className="form-control" id="exampleFormControlInput2" placeholder="Label" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput3" className="form-label">Due Date</label>
                                            <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" className="form-control" id="exampleFormControlInput3" placeholder="Occupation Name" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

            {/* modal edit */}
            <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editModalLabel">Edit Task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSaveEdit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput2" className="form-label">Label</label>
                                            <input value={label} onChange={(e) => setLabel(e.target.value)} type="text" className="form-control" id="exampleFormControlInput2" placeholder="Label" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput3" className="form-label">Due Date</label>
                                            <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" className="form-control" id="exampleFormControlInput3" placeholder="Occupation Name" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

            {/* modal delete */}
            <div className="modal fade" id="basicModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">Are you sure you want to delete this taks?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                    if (deleteId) handleDeleteContact(deleteId);
                                    const modalEl = document.getElementById("basicModal");
                                    const modalInstance = bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
                                    modalInstance.hide();
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>I
        </>
    )
}

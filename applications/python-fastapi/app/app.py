from fastapi import FastAPI
from sqlmodel import Session
from db import engine
from models import Todo
app = FastAPI()


@app.get("/")
def hello_world():
    return {"message": "OK"}

@app.post("/api/v1/add-todo")
def add_todo(todo: Todo):
    print('Adding todo', todo)

    with Session(engine) as session:
        session.add(todo)
        session.commit()

    return {"message": "OK"}


@app.get("/api/v1/get-all-todos")
def get_all_todos():
    with Session(engine) as session:
        todos = session.query(Todo).all()

    return todos
from enum import Enum
from typing import List
from uuid import UUID, uuid4
from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from models import Gender, Role, User, UserUpdateRequest

app = FastAPI()

db: List[User] = [
    User(
        id=UUID("6a053b13-6696-4e8f-8d4d-b3d9fa08c3d5"),
        first_name="Kriss",
        last_name="De Valnor",
        gender=Gender.female,
        roles=[Role.admin]
        ),
    User(
        id=UUID("df0bbe71-7dc6-40d1-a458-b355bcda2af7"),
        first_name="Rosa",
        last_name="Diaz",
        gender=Gender.female,
        roles=[Role.host_family]
        ) 
]

@app.get("/")
async def root():
    return {"おはよう": "ごさいます"}

@app.get("/api/v1/users")
async def fetch_users():
    return db

@app.post("/api/v1/users")
async def register_user(user: User):
    db.append(user)
    return {"id": user.id}

@app.delete("/api/v1/users/{user_id}")
async def delete_user(user_id: UUID):
    for user in db:
        if user.id == user_id:
            db.remove(user)
            return
    raise HTTPException(
        status_code=404,
        detail=f"user with id: {user_id} does not exists"
    )

@app.put("/api/v1/users/{user_id}")
async def update_user(user_update: UserUpdateRequest, user_id: UUID):
    for user in db:
        if user.id == user_id:
            if user_update.first_name is not None:
                user.first_name = user_update.first_name
            if user_update.last_name is not None:
                user.last_name = user_update.last_name
            if user_update.middle_name is not None:
                user.middle_name = user_update.middle_name
            if user_update.roles is not None:
                user.roles = user_update.roles
            return
    raise HTTPException(
        status_code=404,
        detail=f"user with id: {user_id} does not exists"
    )





# class ModelName(str, Enum):
#     alexnet = "alexnet"
#     resnet = "resnet"
#     lenet = "lenet"

# @app.get("/")
# async def root():
#     return {"message": "Hello World"}

# @app.get("/items/{item_id}")
# async def read_item(item_id: int):
#     return {"item_id": item_id}

# @app.get("/models/{model_name}")
# async def get_model(model_name: ModelName):
#     if model_name is ModelName.alexnet:
#         return {"model_name": model_name, "message": "Deep Learning FTW!"}

#     if model_name.value == "lenet":
#         return {"model_name": model_name, "message": "LeCNN all the images"}

#     return {"model_name": model_name, "message": "Have some residuals"}

# @app.get("/files/{file_path:path}")
# async def read_file(file_path: str):
#     return {"file_path": "index.html"}

# fake_items_db = [{"item_name": "Foo"},
#                  {"item_name": "Bar"},
#                  {"item_name": "Baz"},
#                  {"item_name": "Fool"},
#                  {"item_name": "Bart"},
#                  {"item_name": "Bazy"},
#                  {"item_name": "Floor"},
#                  {"item_name": "Bear"},
#                  {"item_name": "Baez"},
#                  {"item_name": "Biaz"},
#                  {"item_name": "Briz"}]

# @app.get("/items/")
# async def read_item(skip: int = 0, limit: int = 8):
#     return fake_items_db[skip : skip + limit]

# @app.get("/items/{item_id}")
# async def read_item(item_id: str, q: str | None = None, short: bool = False):
#     item = {"item_id": item_id}
#     if q:
#         item.update({"q": q})
#     if not short:
#         item.update(
#             {"description": "This is an amazing item that has a long description"}
#         )
#     return item

# @app.get("/users/{user_id}/items/{item_id}")
# async def read_user_item(
#     user_id: int, item_id: str, q: str | None = None, short: bool = False
# ):
#     item = {"item_id": item_id, "owner_id": user_id}
#     if q:
#         item.update({"q": q})
#     if not short:
#         item.update(
#             {"description": "This is an amazing item that has a long description"}
#         )
#     return item

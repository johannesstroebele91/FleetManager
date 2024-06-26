import json
import os
import random as rand
import threading
from random import randrange, random

import bottle
from bottle import response
from faker import Faker

# initialize instance of Faker class to create fake data for drivers
fake = Faker()


# giver class with constructor and update location function
class Driver:
    def __init__(self):
        self.driverName = fake.name()
        self.driverCityOrigin = fake.city()
        self.driverLanguage = ['German', 'English', 'French', 'Spanish', 'Dutch', 'Chinese'][randrange(6)]
        self.driverPhone = fake.phone_number()
        self.driverInfo = fake.catch_phrase()
        self.licensePlate = fake.license_plate()
        self.kmDriven = int(random() * 100000)
        self.goalState = ['On time', 'Delayed', 'Maintenance', 'Delayed', 'Idle'][randrange(5)]
        self.goalCompletionPercent = int(rand.randint(1, 101))
        self.location = [float(fake.latitude()), float(fake.longitude())]

    def update_location(self):
        self.location = [float(fake.latitude()), float(fake.longitude())]


# generating 10 drivers based on the Driver class
drivers = list()
for i in range(10):
    drivers.append(Driver())

# write drivers into json file
file = open('drivers.get.json', 'w+')
file.write("[]")
file.close()


def updatejson(driver):
    try:
        o = json.loads(open("drivers.get.json", "r").read())
    except:
        o = []
    d = {
        "driverName": driver.driverName,
        "driverCityOrigin": driver.driverCityOrigin,
        "driverLanguage": driver.driverLanguage,
        "driverPhone": driver.driverPhone,
        'driverInfo': driver.driverInfo,
        "licensePlate": driver.licensePlate,
        "kmDriven": driver.kmDriven,
        "goalState": driver.goalState,
        "goalCompletionPercent": driver.goalCompletionPercent,
        "location": [float(driver.location[0]), float(driver.location[1])]
    }
    o.append(d)
    file = open("./drivers.get.json", "w")
    file.write(json.dumps(o))
    file.close()


for driver in drivers:
    updatejson(driver)


# Randomly update the location of the drivers every 5 seconds
def updatedrivers():
    os.remove("drivers.get.json")
    file = open('drivers.get.json', 'w+')
    file.write("[]")
    file.close()

    threading.Timer(5.0, updatedrivers).start()  # called every minute

    for driver in drivers:
        driver.update_location()

    for driver in drivers:
        updatejson(driver)


updatedrivers()


# the decorator
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers[
            'Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors


app = bottle.app()


@app.route('/drivers', method=['OPTIONS', 'GET'])
# allows to indicate any other origins (domain, scheme, or port)
# than its own from which a browser should permit loading of resources
@enable_cors
def lvambience():
    response.headers['Content-type'] = 'application/json'
    return open("./drivers.get.json", "r").read()


file.close()

app.run(host='localhost', port=8080, debug=True)

import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "react-query";

import Page from "../../site/Page.js";
import { Text } from "../../utils/Text.js";
import { postEvent } from "../../query/query.js";
import { Button, InputField, Textarea } from "../../utils/Form.js";
import { useUser } from "../../site/UserContext.js";
import { Error } from "../../utils/Notification.js";
import { CloseButton } from "../../utils/Form.js";

export function CreateEventPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ifc, setIfc] = useState("");
  const [units, setUnits] = useState([]);
  const fileInputRef = useRef(null);

  const mutation = useMutation(postEvent);
  const { selectedGroup } = useUser();

  useEffect(() => {
    if (mutation.isSuccess) {
      setName("");
      setDescription("");
      setUnits([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  }, [mutation.isSuccess]);

  const addUnit = (type) => {
    setUnits([
      ...units,
      {
        id: units.length,
        type: type,
        name: "",
        date: getCurrentDate(),
        departure: null,
        arrival: null,
        flights: [],
      },
    ]);
  };

  const updateUnit = (id, updatedUnit) => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) => (unit.id === id ? updatedUnit : unit))
    );
  };

  const removeUnit = (id) => {
    setUnits((prevUnits) => prevUnits.filter((unit) => unit.id !== id));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, "0"); // Pad single digits with a leading zero
    return `${year}-${month}-${day}`;
  };

  const onCreateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    //TODO: Do some file checks here
    formData.append("thumbnail", fileInputRef.current.files[0]);
    var data = {
      group: selectedGroup.id,
      name: name,
      description: description,
      ifc_link: "https://chatgpt.com/c/b11710c0-b06a-4370-bec4-de74e0e8cb14",
      units: units,
    };
    formData.append("data", JSON.stringify(data));
    console.log(data);
    mutation.mutate(formData);
  };

  return (
    <Page>
      {mutation.isError ? <Error>{mutation.error.message}</Error> : null}

      {mutation.isSuccess ? <Text>Event Created!</Text> : null}

      <div class="pb-2 px-3 flex justify-between items-center">
        <Text style="font-medium text-2xl">Create Event</Text>
        <Button onClick={onCreateEvent} type="submit" style="m-2">
          Publish Event
        </Button>
      </div>
      <div class="mx-4 grid grid-cols-3">
        <form class="col-span-2">
          <div class="p-1 rounded-lg bg-gray-100 dark:bg-midnight2">
            <InputField
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Title"
              style="text-lg font-semibold"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description..."
              style="text-sm"
            />
            <InputField type="file" ref={fileInputRef} />
          </div>

          {units.map((unit) => (
            <div class="mt-4 rounded-lg bg-gray-100 dark:bg-midnight2">
              <UnitInput
                key={unit.id}
                unit={unit}
                updateUnit={updateUnit}
                removeUnit={removeUnit}
              />
            </div>
          ))}
        </form>
        <div class="ml-4">
          <div className="px-3 pb-4 rounded-lg bg-gray-100 dark:bg-midnight2">
            <Text style="py-3 text-lg font-semibold">Add Event Unit</Text>
            <div className="flex flex-col space-y-2">
              <Button onClick={() => addUnit(1)}>Add Group Flight</Button>
              <Button onClick={() => addUnit(2)}>Add Fly-in</Button>
              <Button onClick={() => addUnit(3)}>Add Fly-out</Button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

const UNIT_TYPES = {
  1: "Group Flight",
  2: "Fly-in",
  3: "Fly-out",
};

export function UnitInput({ unit, updateUnit, removeUnit }) {
  const [unitData, setUnitData] = useState(unit);

  useEffect(() => {
    updateUnit(unitData.id, unitData);
  }, [unitData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name == "departure" || name == "arrival" ? value.toUpperCase() : value;

    setUnitData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  return (
    <div class="p-2">
      <div class="flex justify-between items-center">
        <Text style="px-1 font-semibold text-lg">
          {UNIT_TYPES[unitData.type]}
        </Text>
        <CloseButton
          style="pr-3 pt-2"
          onClick={() => removeUnit(unitData.id)}
        />
      </div>

      <InputField
        type="text"
        name="name"
        placeholder="Unit Name"
        value={unitData.name}
        onChange={handleInputChange}
      />
      <InputField
        type="date"
        name="date"
        placeholder="Unit Date"
        value={unitData.date}
        onChange={handleInputChange}
      />
      {unitData.type === 1 && (
        <>
          <InputField
            type="text"
            name="departure"
            placeholder="Departure ICAO"
            value={unitData.departure}
            onChange={handleInputChange}
            maxLength={4}
          />
          <InputField
            type="text"
            name="arrival"
            placeholder="Arrival ICAO"
            value={unitData.arrival}
            onChange={handleInputChange}
            maxLength={4}
          />
        </>
      )}
      {unitData.type === 2 && (
        <>
          <InputField
            type="text"
            name="arrival"
            placeholder="Arrival ICAO"
            value={unitData.arrival}
            onChange={handleInputChange}
            maxLength={4}
          />
        </>
      )}
      {unitData.type === 3 && (
        <>
          <InputField
            type="text"
            name="departure"
            placeholder="Departure ICAO"
            value={unitData.departure}
            onChange={handleInputChange}
            maxLength={4}
          />
        </>
      )}
    </div>
  );
}

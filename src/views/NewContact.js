import React, { useState } from "react";

const NewContact = () => {
  const [newContactName, setNewContactName] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  const [newContactDescription, setNewContactDescription] = useState("");
  const [newContactCategory, setNewContactCategory] = useState("");

  const handleContactName = (e) => {
    setNewContactName(e.target.value);
  };

  const handleContactEmail = (e) => {
    setNewContactEmail(e.target.value);
  };

  const handleContactDescription = (e) => {
    setNewContactDescription(e.target.value);
  };

  const handleContactCategory = (e) => {
    setNewContactCategory(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    fetch(`${URL}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newContactName,
        email: newContactEmail,
        description: newContactDescription,
        category: parseInt(newContactCategory),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <h3 className="mb3">Add new contact</h3>
      <form className="mb3 flex flexColumn">
        <div className="justifyBetween">
          <label className="me1">Name: </label>
          <input
            className="widthName"
            type="text"
            required
            onChange={handleContactName}
          />
        </div>
        <div>
          <label className="me1">Email: </label>
          <input
            className="widthEmail"
            type="email"
            required
            onChange={handleContactEmail}
          />
        </div>
        <div>
          <label className="me1">Description: </label>
          <input
            className="widthDescription"
            type="description"
            required
            onChange={handleContactDescription}
          />
        </div>
        <div>
          <label className="me1">Category: </label>
          <input
            className="widthCategory mb1"
            type="text"
            required
            onChange={handleContactCategory}
          />
          <button
            className="submitButton homeButton mt2"
            type="submit"
            onClick={handleClick}
          >
            Save contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewContact;

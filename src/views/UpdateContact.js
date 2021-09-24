import React, { useState } from "react";

const UpdateContact = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [contactCategory, setContactCategory] = useState("");

  const handleContactName = (e) => {
    setContactName(e.target.value);
  };

  const handleContactEmail = (e) => {
    setContactEmail(e.target.value);
  };

  const handleContactDescription = (e) => {
    setContactDescription(e.target.value);
  };

  const handleContactCategory = (e) => {
    setContactCategory(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    fetch(`${URL}/contacts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: contactEmail,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <h3 className="mb3">Update existing contact</h3>
      <form className="mb3 flex flexColumn">
        <div className="justifyBetween mb3">
          <p className="mb1">
            Enter the email of the contact you want to update:
          </p>
          <div>
            <input
              className="widthEmail"
              type="email"
              required
              onChange={handleContactEmail}
            />
          </div>
        </div>
        <p className="mb1">Which information would you like to update?</p>
        <div>
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
            Update contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContact;

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
// Context
import { UserContext } from "../App";
// Component
import NewContact from "./NewContact";
import UpdateContact from "./UpdateContact";
// URL
import { API_URL, API_URL_DEV } from "../config";

const Home = () => {
  const { canLogin } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [isNewClicked, setIsNewClicked] = useState(false);
  const [isUpdateClicked, setisUpdateClicked] = useState(false);
  const [isDeleteClicked, setisDeleteClicked] = useState(false);

  const getContacts = () => {
    let URL;
    if (process.env.NODE_ENV === "development") {
      URL = API_URL_DEV;
    } else {
      URL = API_URL;
    }

    fetch(`${URL}/contacts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setContacts();
      });
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    getContacts();
  }, [contacts]);

  const handleNewContact = () => {
    setIsNewClicked(true);
    setisUpdateClicked(false);
    setisDeleteClicked(false);
  };

  const handleUpdateContact = () => {
    setisUpdateClicked(true);
    setIsNewClicked(false);
    setisDeleteClicked(false);
  };

  const handleDeleteContact = () => {
    setisDeleteClicked(true);
    setIsNewClicked(false);
    setisUpdateClicked(false);
  };

  return (
    <div className="regularPadding">
      <div className="mb3">
        <button
          style={
            isNewClicked
              ? {
                  backgroundColor: "rgba(110, 123, 251, 1)",
                  color: "white",
                }
              : { backgroundColor: "white" }
          }
          className="tab"
          onClick={handleNewContact}
        >
          New Contact
        </button>
        <button
          style={
            isUpdateClicked
              ? {
                  backgroundColor: "rgba(110, 123, 251, 1)",
                  color: "white",
                }
              : { backgroundColor: "white" }
          }
          className="tab"
          onClick={handleUpdateContact}
        >
          Update Contact
        </button>
        <button
          style={
            isDeleteClicked
              ? {
                  backgroundColor: "rgba(110, 123, 251, 1)",
                  color: "white",
                }
              : { backgroundColor: "white" }
          }
          className="tab"
          onClick={handleDeleteContact}
        >
          Delete Contact
        </button>
      </div>
      <div>{isNewClicked && <NewContact />}</div>
      <div>{isUpdateClicked && <UpdateContact />}</div>
      {/* <div>{isDeleteClicked && <DeleteContact />}</div> */}

      {canLogin ? (
        <div>
          {contacts ? (
            contacts.map((contact) => {
              return (
                <div>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                  <p>{contact.description}</p>
                </div>
              );
            })
          ) : (
            <p className="mb3">No contacts yet</p>
          )}
        </div>
      ) : (
        <div>
          <p>Sorry, you must be logged in to access this page.</p>
          <p>
            <Link to="/">Create a new account</Link>
          </p>
          <p>
            <Link to="/login">Or login here</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;

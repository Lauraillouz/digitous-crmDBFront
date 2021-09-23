import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
// Context
import { UserContext } from "../App";
// URL
import { API_URL, API_URL_DEV } from "../config";

const Home = () => {
  const { canLogin } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  const [newContactDescription, setNewContactDescription] = useState("");
  const [newContactCategory, setNewContactCategory] = useState("");

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
            <div>
              <p>No contacts yet</p>
              <h3>Add new contact</h3>
              <form>
                <div>
                  <label>Name</label>
                  <input type="text" required onChange={handleContactName} />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" required onChange={handleContactEmail} />
                </div>
                <div>
                  <label>Description</label>
                  <input
                    type="description"
                    required
                    onChange={handleContactDescription}
                  />
                </div>
                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    required
                    onChange={handleContactCategory}
                  />
                </div>
                <button type="submit" onClick={handleClick}>
                  Save contact
                </button>
              </form>
            </div>
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

import { useSelector, useDispatch } from 'react-redux';

import { addContact, deleteContact } from '../redux/contacts/contacts-slice';
import { setFilter } from '../redux/filter/filter-slice';

import {
  getAllContacts,
  getFilteredContacts,
} from '../redux/contacts/contacts-selectors';
import { getFilter } from '../redux/filter/filter-selectors';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import css from './ContactForm/contact-form.module.css';

export const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const allContacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = allContacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`Contact ${name} - is already in contacts`);
      return false;
    }
    dispatch(addContact({ name, number }));
  };

  const handleRemoveContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  const isContacts = Boolean(filteredContacts.length);

  return (
    <>
      <div className={css.wrapper}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={handleAddContact} />
      </div>
      <div className={css.wrapper}>
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} handleChange={handleFilter} />
        {isContacts && (
          <ContactList
            removeContact={handleRemoveContact}
            contacts={filteredContacts}
          />
        )}
        {!isContacts && <p className={css.message}>No contacts in list</p>}
      </div>
    </>
  );
};

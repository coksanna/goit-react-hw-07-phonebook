import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchAllContacts,
  fetchAddContact,
  fetchDeleteContact,
} from '.././redux/contacts/contacts-operations';
import { setFilter } from '../redux/filter/filter-slice';

import { getFilteredContacts } from '../redux/contacts/contacts-selectors';
import { getFilter } from '../redux/filter/filter-selectors';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import css from './ContactForm/contact-form.module.css';

export const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    dispatch(fetchAddContact({ name, number }));
  };

  const handleRemoveContact = id => {
    dispatch(fetchDeleteContact(id));
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
